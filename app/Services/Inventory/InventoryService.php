<?php

declare(strict_types=1);

namespace App\Services\Inventory;

use App\Models\InventoryMovement;
use App\Models\Order;
use App\Models\ProductVariant;

class InventoryService
{
    /**
     * Reserve inventory for an order placement.
     */
    public function reserve(ProductVariant $variant, int $quantity, Order $order): void
    {
        $variant->decrement('stock_count', $quantity);

        InventoryMovement::query()->create([
            'product_variant_id' => $variant->id,
            'order_id' => $order->id,
            'quantity_change' => -$quantity,
            'reason' => 'reservation',
        ]);
    }

    /**
     * Release reserved inventory (e.g. on order cancellation or payment failure).
     */
    public function release(ProductVariant $variant, int $quantity, Order $order): void
    {
        $variant->increment('stock_count', $quantity);

        InventoryMovement::query()->create([
            'product_variant_id' => $variant->id,
            'order_id' => $order->id,
            'quantity_change' => $quantity,
            'reason' => 'release',
        ]);
    }

    /**
     * Record a manual restock or inventory adjustment.
     */
    public function adjustStock(ProductVariant $variant, int $quantityChange, string $reason, ?Order $order = null): void
    {
        if ($quantityChange > 0) {
            $variant->increment('stock_count', $quantityChange);
        } elseif ($quantityChange < 0) {
            $variant->decrement('stock_count', abs($quantityChange));
        }

        InventoryMovement::query()->create([
            'product_variant_id' => $variant->id,
            'order_id' => $order?->id,
            'quantity_change' => $quantityChange,
            'reason' => $reason,
        ]);
    }
}
