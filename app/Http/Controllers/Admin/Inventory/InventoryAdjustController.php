<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Inventory;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\ProductVariant;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryAdjustController extends Controller
{
    /**
     * Adjust inventory stock levels and log the movement.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'product_variant_id' => ['required', 'integer', 'exists:product_variants,id'],
            'adjustment_type' => ['required', 'string', 'in:add,subtract,set'],
            'quantity' => ['required', 'integer', 'min:0'],
            'reason' => ['required', 'string', 'max:255'],
        ]);

        /** @var ProductVariant $variant */
        $variant = ProductVariant::findOrFail($validated['product_variant_id']);

        DB::transaction(function () use ($variant, $validated): void {
            $current = $variant->stock_count;
            $qty = (int) $validated['quantity'];

            $newStock = match ($validated['adjustment_type']) {
                'add' => $current + $qty,
                'subtract' => max(0, $current - $qty),
                'set' => max(0, $qty),
            };

            $diff = $newStock - $current;

            $variant->update(['stock_count' => $newStock]);

            InventoryMovement::create([
                'product_variant_id' => $variant->id,
                'quantity_change' => $diff,
                'reason' => $validated['reason'],
            ]);
        });

        return redirect()->route('admin.inventory.index')
            ->with('success', "Stock updated for SKU '{$variant->sku}'.");
    }
}
