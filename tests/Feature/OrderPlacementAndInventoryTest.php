<?php

declare(strict_types=1);

use App\Actions\Order\PlaceOrderAction;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Events\OrderPlaced;
use App\Exceptions\InsufficientStockException;
use App\Models\Cart;
use App\Models\Category;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\Cart\CartService;
use App\Services\Inventory\InventoryService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->category = Category::create([
        'name' => 'Lighting',
        'slug' => 'lighting',
        'is_active' => true,
    ]);

    $this->product = Product::create([
        'category_id' => $this->category->id,
        'name' => 'The Solstice Ceramic Pendant',
        'slug' => 'the-solstice-ceramic-pendant',
        'base_price' => 340.00,
        'is_active' => true,
    ]);

    $this->variant = ProductVariant::create([
        'product_id' => $this->product->id,
        'sku' => 'SCP-TERRA-MD',
        'color' => 'Terracotta',
        'color_hex' => '#C4704F',
        'size' => 'Medium',
        'stock_count' => 10,
        'price_adjustment' => 0.00,
    ]);

    $this->inventoryService = new InventoryService;
    $this->placeOrderAction = new PlaceOrderAction($this->inventoryService);
    $this->cartService = new CartService;
});

test('places order with atomic inventory reservation and snapshots', function (): void {
    Event::fake([OrderPlaced::class]);

    $user = User::factory()->create();
    $cart = Cart::create(['user_id' => $user->id]);
    $this->cartService->addItem($cart, $this->variant->id, 2);

    $checkoutData = [
        'first_name' => 'Eleanor',
        'last_name' => 'Vance',
        'email' => 'eleanor@example.com',
        'phone' => '+254712345678',
        'address_line_1' => '12 Riverside Drive',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'shipping_method' => 'standard',
        'payment_method' => 'mpesa',
    ];

    $order = $this->placeOrderAction->execute($cart, $checkoutData, $user);

    expect($order)->not->toBeNull()
        ->and($order->status)->toBe(OrderStatus::Pending)
        ->and($order->payment_status)->toBe(PaymentStatus::Pending)
        ->and($order->payment_method)->toBe(PaymentMethod::Mpesa)
        ->and((float) $order->subtotal)->toBe(680.00)
        ->and((float) $order->shipping_cost)->toBe(0.00) // free shipping for subtotal >= 99
        ->and((float) $order->tax_amount)->toBe(round(680.00 * 0.16, 2))
        ->and($order->items()->count())->toBe(1);

    // Verify inventory reservation
    $this->variant->refresh();
    expect($this->variant->stock_count)->toBe(8);

    // Verify inventory movement audit trail
    $movement = InventoryMovement::where('order_id', $order->id)->first();
    expect($movement)->not->toBeNull()
        ->and($movement->quantity_change)->toBe(-2)
        ->and($movement->reason)->toBe('reservation');

    // Verify cart was emptied
    expect($cart->items()->count())->toBe(0);

    Event::assertDispatched(OrderPlaced::class);
});

test('fails order placement and preserves stock when quantity exceeds available stock', function (): void {
    $cart = Cart::create(['session_id' => 'guest-order-fail']);
    $this->cartService->addItem($cart, $this->variant->id, 2);

    // Reduce stock behind the scenes
    $this->variant->update(['stock_count' => 1]);

    $checkoutData = [
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => 'jane@example.com',
        'phone' => '+254700000000',
        'address_line_1' => '45 Kimathi Street',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'shipping_method' => 'standard',
        'payment_method' => 'stripe',
    ];

    expect(fn () => $this->placeOrderAction->execute($cart, $checkoutData))
        ->toThrow(InsufficientStockException::class);

    $this->variant->refresh();
    expect($this->variant->stock_count)->toBe(1);
});
