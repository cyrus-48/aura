<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\ProductVariant;
use Illuminate\Http\JsonResponse;

class InventoryMovementsController extends Controller
{
    /**
     * Retrieve audit movements history for a variant.
     */
    public function __invoke(ProductVariant $variant): JsonResponse
    {
        $movements = InventoryMovement::query()
            ->where('product_variant_id', $variant->id)
            ->latest('id')
            ->limit(20)
            ->get()
            ->map(fn (InventoryMovement $m) => [
                'id' => $m->id,
                'quantity_change' => $m->quantity_change,
                'reason' => $m->reason,
                'order_number' => $m->order?->order_number,
                'created_at' => $m->created_at?->format('M d, Y H:i') ?? '',
            ]);

        return response()->json([
            'sku' => $variant->sku,
            'color' => $variant->color,
            'size' => $variant->size,
            'movements' => $movements,
        ]);
    }
}
