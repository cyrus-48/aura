<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Inventory;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\OrderItem;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class InventoryIndexController extends Controller
{
    /**
     * Display a listing of variants and inventory counts.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $category = $request->string('category')->trim()->toString();
        $stock = $request->string('stock')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 15), 5), 100);

        $query = ProductVariant::query()
            ->with(['product.category', 'inventoryMovements' => fn ($mq) => $mq->latest()->limit(1)]);

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('sku', 'like', "%{$search}%")
                    ->orWhere('color', 'like', "%{$search}%")
                    ->orWhere('size', 'like', "%{$search}%")
                    ->orWhereHas('product', fn (Builder $pq) => $pq->where('name', 'like', "%{$search}%"));
            });
        }

        if ($category !== '') {
            $query->whereHas('product.category', fn (Builder $cq) => $cq->where('slug', $category)->orWhere('id', $category));
        }

        if ($stock === 'in_stock') {
            $query->where('stock_count', '>', 5);
        } elseif ($stock === 'low_stock') {
            $query->where('stock_count', '>', 0)->where('stock_count', '<=', 5);
        } elseif ($stock === 'out_of_stock') {
            $query->where('stock_count', '<=', 0);
        }

        $paginator = $query->orderBy('stock_count', 'asc')->paginate($perPage)->withQueryString();

        $variantIds = $paginator->getCollection()->pluck('id');
        $reservedCounts = OrderItem::query()
            ->whereIn('product_variant_id', $variantIds)
            ->whereHas('order', fn (Builder $oq) => $oq->whereIn('status', [
                OrderStatus::Pending,
                OrderStatus::Confirmed,
                OrderStatus::Processing,
            ]))
            ->groupBy('product_variant_id')
            ->selectRaw('product_variant_id, sum(quantity) as reserved')
            ->pluck('reserved', 'product_variant_id');

        $paginator->through(function (ProductVariant $v) use ($reservedCounts) {
            $reserved = (int) ($reservedCounts[$v->id] ?? 0);
            $onHand = (int) $v->stock_count;
            $available = max(0, $onHand - $reserved);
            $lastMovement = $v->inventoryMovements->first();

            return [
                'id' => $v->id,
                'product_id' => $v->product_id,
                'product_name' => $v->product?->name ?? 'Unknown Product',
                'category_name' => $v->product?->category?->name ?? 'Uncategorized',
                'primary_image' => $v->product?->primary_image,
                'variant_name' => "{$v->color} / {$v->size}",
                'color' => $v->color,
                'size' => $v->size,
                'sku' => $v->sku,
                'stock_on_hand' => $onHand,
                'reserved_stock' => $reserved,
                'available_stock' => $available,
                'last_movement' => $lastMovement ? $lastMovement->created_at?->format('M d, H:i') : 'No logs',
                'last_reason' => $lastMovement?->reason ?? '',
            ];
        });

        return Inertia::render('admin/inventory/Index', [
            'variants' => $paginator,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => [
                'search' => $search,
                'category' => $category,
                'stock' => $stock,
                'per_page' => $perPage,
            ],
            'low_stock_count' => ProductVariant::query()->where('stock_count', '<=', 5)->count(),
        ]);
    }
}
