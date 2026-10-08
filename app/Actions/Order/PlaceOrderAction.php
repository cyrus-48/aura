<?php

declare(strict_types=1);

namespace App\Actions\Order;

use App\Enums\AddressType;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\ShippingMethod;
use App\Events\OrderPlaced;
use App\Exceptions\CartEmptyException;
use App\Exceptions\InsufficientStockException;
use App\Models\Address;
use App\Models\Cart;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\Inventory\InventoryService;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class PlaceOrderAction
{
    public function __construct(
        private readonly InventoryService $inventory
    ) {}

    /**
     * Execute atomic order placement with inventory reservation and row-level locking.
     * Adheres to Rules 2, 3, 4, 11, 12, and 17.
     *
     * @param  array<string, mixed>  $data
     *
     * @throws InsufficientStockException|CartEmptyException
     */
    public function execute(Cart $cart, array $data, ?User $user = null): Order
    {
        $cart->loadMissing(['items.variant.product']);

        if ($cart->items->isEmpty()) {
            throw CartEmptyException::make();
        }

        $order = DB::transaction(function () use ($cart, $data, $user): Order {
            // Lock all variants to prevent race conditions & overselling
            $variantIds = $cart->items->pluck('product_variant_id')->all();
            $lockedVariants = ProductVariant::query()
                ->whereIn('id', $variantIds)
                ->lockForUpdate()
                ->with('product')
                ->get()
                ->keyBy('id');

            // Verify stock availability
            foreach ($cart->items as $item) {
                /** @var ProductVariant|null $variant */
                $variant = $lockedVariants->get($item->product_variant_id);

                if ($variant === null || $variant->stock_count < $item->quantity) {
                    throw InsufficientStockException::for($variant ?? $item->variant, $item->quantity);
                }
            }

            // Calculate financials based on configuration
            $subtotal = (float) $cart->items->sum(fn ($item) => $item->totalPrice());

            $shippingMethod = ShippingMethod::tryFrom((string) ($data['shipping_method'] ?? ''))
                ?? ShippingMethod::Standard;
            $shippingCost = $shippingMethod->calculateCost($subtotal);

            $country = (string) ($data['country'] ?? 'Kenya');
            $isKenyan = strcasecmp($country, 'Kenya') === 0 || strcasecmp($country, 'KE') === 0;
            $taxRate = (float) config('aura.tax_rate', 0.16);
            $taxAmount = $isKenyan ? round($subtotal * $taxRate, 2) : 0.00;
            $total = round($subtotal + $shippingCost + $taxAmount, 2);

            // Persist shipping address
            $shippingAddress = Address::query()->create([
                'user_id' => $user?->id,
                'type' => AddressType::Shipping,
                'first_name' => $data['first_name'],
                'last_name' => $data['last_name'],
                'email' => $data['email'],
                'phone' => $data['phone'],
                'address_line_1' => $data['address_line_1'],
                'address_line_2' => $data['address_line_2'] ?? null,
                'city' => $data['city'],
                'state' => $data['state'] ?? null,
                'postal_code' => $data['postal_code'],
                'country' => $country,
                'is_default' => false,
            ]);

            $orderNumber = 'AO-'.date('Ymd').'-'.strtoupper(Str::random(5));

            /** @var Order $order */
            $order = Order::query()->create([
                'order_number' => $orderNumber,
                'user_id' => $user?->id,
                'email' => $data['email'],
                'phone' => $data['phone'],
                'shipping_address_id' => $shippingAddress->id,
                'billing_address_id' => $shippingAddress->id,
                'status' => OrderStatus::Pending,
                'subtotal' => $subtotal,
                'shipping_cost' => $shippingCost,
                'tax_amount' => $taxAmount,
                'discount_amount' => 0.00,
                'total' => $total,
                'shipping_method' => $shippingMethod,
                'payment_status' => PaymentStatus::Pending,
                'payment_method' => PaymentMethod::from((string) $data['payment_method']),
                'notes' => $data['notes'] ?? null,
            ]);

            // Create order item snapshots and reserve inventory
            foreach ($cart->items as $item) {
                /** @var ProductVariant $variant */
                $variant = $lockedVariants->get($item->product_variant_id);

                OrderItem::query()->create([
                    'order_id' => $order->id,
                    'product_variant_id' => $variant->id,
                    'product_name' => $variant->product->name,
                    'variant_name' => trim("{$variant->color} / {$variant->size}"),
                    'sku' => $variant->sku,
                    'unit_price' => $variant->finalPrice(),
                    'quantity' => $item->quantity,
                    'total_price' => round($variant->finalPrice() * $item->quantity, 2),
                ]);

                $this->inventory->reserve($variant, $item->quantity, $order);
            }

            // Clear cart
            $cart->items()->delete();

            return $order;
        });

        // Fire event AFTER transaction commits (Rule 12)
        OrderPlaced::dispatch($order);

        return $order;
    }
}
