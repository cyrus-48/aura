<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderNote;
use Inertia\Inertia;
use Inertia\Response;

class OrderDetailController extends Controller
{
    /**
     * Display comprehensive operational order details and event timeline.
     */
    public function __invoke(Order $order): Response
    {
        $order->loadMissing([
            'items.variant.product',
            'shippingAddress',
            'billingAddress',
            'user.orders',
            'notesHistory.user',
        ]);

        $user = $order->user;
        $orderCount = $user ? $user->orders->count() : 1;
        $lifetimeValue = $user ? (float) $user->orders->sum('total') : (float) $order->total;

        $items = $order->items->map(fn ($item) => [
            'id' => $item->id,
            'product_name' => $item->product_name,
            'variant_name' => $item->variant_name,
            'sku' => $item->sku,
            'unit_price' => (float) $item->unit_price,
            'quantity' => $item->quantity,
            'total_price' => (float) $item->total_price,
            'image' => $item->variant?->product?->primary_image,
        ]);

        $allowedTransitions = array_map(fn ($st) => [
            'value' => $st->value,
            'label' => $st->label(),
        ], $order->status->allowedTransitions());

        $notes = $order->notesHistory->map(fn (OrderNote $n) => [
            'id' => $n->id,
            'author_name' => $n->user?->name ?? 'Staff Operator',
            'note' => $n->note,
            'created_at' => $n->created_at?->format('M d, Y H:i') ?? '',
        ]);

        return Inertia::render('admin/orders/Detail', [
            'order' => [
                'id' => $order->id,
                'order_number' => $order->order_number,
                'email' => $order->email,
                'phone' => $order->phone ?? 'Not provided',
                'status' => $order->status->value,
                'status_label' => $order->status->label(),
                'status_color' => $order->status->badgeClasses(),
                'payment_status' => $order->payment_status->value,
                'payment_status_label' => $order->payment_status->label(),
                'payment_status_color' => $order->payment_status->badgeClasses(),
                'payment_method' => $order->payment_method->label(),
                'payment_reference' => $order->payment_reference ?? 'N/A',
                'shipping_method' => $order->shipping_method->label(),
                'subtotal' => (float) $order->subtotal,
                'shipping_cost' => (float) $order->shipping_cost,
                'tax_amount' => (float) $order->tax_amount,
                'discount_amount' => (float) $order->discount_amount,
                'total' => (float) $order->total,
                'created_at' => $order->created_at?->format('M d, Y H:i') ?? '',
                'shipping_address' => $order->shippingAddress ? [
                    'name' => $order->shippingAddress->fullName(),
                    'line1' => $order->shippingAddress->address_line_1,
                    'city' => $order->shippingAddress->city,
                    'postal_code' => $order->shippingAddress->postal_code,
                    'country' => $order->shippingAddress->country,
                ] : null,
                'billing_address' => $order->billingAddress ? [
                    'name' => $order->billingAddress->fullName(),
                    'line1' => $order->billingAddress->address_line_1,
                    'city' => $order->billingAddress->city,
                    'postal_code' => $order->billingAddress->postal_code,
                    'country' => $order->billingAddress->country,
                ] : null,
                'items' => $items,
                'notes' => $notes,
            ],
            'customer' => [
                'name' => $order->shippingAddress?->full_name ?? ($user?->name ?? 'Guest Client'),
                'email' => $order->email,
                'phone' => $order->phone ?? 'Not provided',
                'order_count' => $orderCount,
                'lifetime_value' => '$'.number_format($lifetimeValue, 2),
            ],
            'allowed_transitions' => $allowedTransitions,
        ]);
    }
}
