<?php

declare(strict_types=1);

namespace App\Actions\Order;

use App\Enums\OrderStatus;
use App\Events\OrderCancelled;
use App\Exceptions\InvalidStatusTransitionException;
use App\Models\Order;
use App\Models\ProductVariant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;

class CancelOrderAction
{
    /**
     * Cancel an active order, restore inventory, and dispatch cancellation event.
     * Adheres to Rule 2, Rule 3, Rule 4, Rule 11, Rule 12.
     *
     * @throws InvalidStatusTransitionException
     */
    public function execute(Order $order, ?string $reason = null): Order
    {
        if (! $order->status->canTransitionTo(OrderStatus::Cancelled)) {
            throw InvalidStatusTransitionException::fromTo(
                $order->status,
                OrderStatus::Cancelled
            );
        }

        DB::transaction(function () use ($order, $reason): void {
            $order->loadMissing('items');

            // Restore variant stock using lockForUpdate (Rule 11)
            foreach ($order->items as $item) {
                if ($item->product_variant_id) {
                    $variant = ProductVariant::query()->lockForUpdate()->find($item->product_variant_id);
                    if ($variant) {
                        $variant->increment('stock_count', $item->quantity);
                    }
                }
            }

            $order->status = OrderStatus::Cancelled;
            if ($reason) {
                $order->notes = trim(($order->notes ? $order->notes."\n" : '')."Cancellation reason: {$reason}");
            }
            $order->save();
        });

        // Fire event after transaction commits (Rule 11 & 12)
        OrderCancelled::dispatch($order);

        Log::channel('orders')->info("Order #{$order->order_number} successfully cancelled");

        return $order->fresh(['items.variant', 'shippingAddress']);
    }
}
