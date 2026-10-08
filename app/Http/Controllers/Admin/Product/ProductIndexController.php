<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Enums\ProductStatus;
use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProductIndexController extends Controller
{
    /**
     * Display a listing of catalog products.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $category = $request->string('category')->trim()->toString();
        $status = $request->string('status')->trim()->toString();
        $stock = $request->string('stock')->trim()->toString();
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc') === 'asc' ? 'asc' : 'desc';
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = Product::query()->with(['category', 'variants']);

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('slug', 'like', "%{$search}%")
                    ->orWhereHas('variants', fn (Builder $vq) => $vq->where('sku', 'like', "%{$search}%"));
            });
        }

        if ($category !== '') {
            $query->whereHas('category', fn (Builder $cq) => $cq->where('slug', $category)->orWhere('id', $category));
        }

        if ($status !== '' && ProductStatus::tryFrom($status) !== null) {
            $query->where('status', $status);
        }

        if ($stock === 'in_stock') {
            $query->whereHas('variants', fn (Builder $vq) => $vq->where('stock_count', '>', 5));
        } elseif ($stock === 'low_stock') {
            $query->whereHas('variants', fn (Builder $vq) => $vq->where('stock_count', '>', 0)->where('stock_count', '<=', 5));
        } elseif ($stock === 'out_of_stock') {
            $query->whereDoesntHave('variants', fn (Builder $vq) => $vq->where('stock_count', '>', 0));
        }

        $allowedSorts = ['name', 'base_price', 'created_at'];
        $sortColumn = in_array($sort, $allowedSorts, true) ? $sort : 'created_at';
        $query->orderBy($sortColumn, $direction);

        $paginator = $query->paginate($perPage)->withQueryString();

        $paginator->through(fn (Product $p) => [
            'id' => $p->id,
            'name' => $p->name,
            'slug' => $p->slug,
            'sku' => $p->variants->first()?->sku ?? 'No SKU',
            'category_id' => $p->category_id,
            'category_name' => $p->category?->name ?? 'Uncategorized',
            'primary_image' => $p->primary_image,
            'price' => (float) $p->base_price,
            'formatted_price' => '$'.number_format((float) $p->base_price, 2),
            'stock_count' => (int) $p->variants->sum('stock_count'),
            'status' => $p->status?->value ?? 'active',
            'status_label' => $p->status?->label() ?? 'Active',
            'status_color' => $p->status?->color() ?? 'bg-green-50 text-green-700 border-green-200',
            'created_at' => $p->created_at?->format('M d, Y') ?? '',
        ]);

        return Inertia::render('admin/products/Index', [
            'products' => $paginator,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name', 'slug']),
            'filters' => [
                'search' => $search,
                'category' => $category,
                'status' => $status,
                'stock' => $stock,
                'sort' => $sortColumn,
                'direction' => $direction,
                'per_page' => $perPage,
            ],
            'counts' => [
                'total' => Product::count(),
                'active' => Product::where('status', ProductStatus::Active)->count(),
                'draft' => Product::where('status', ProductStatus::Draft)->count(),
                'archived' => Product::where('status', ProductStatus::Archived)->count(),
            ],
        ]);
    }
}
