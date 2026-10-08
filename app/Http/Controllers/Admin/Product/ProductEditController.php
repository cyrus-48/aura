<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class ProductEditController extends Controller
{
    /**
     * Show form for editing an existing product.
     */
    public function __invoke(Product $product): Response
    {
        $product->loadMissing(['category', 'collections', 'variants']);

        return Inertia::render('admin/products/Editor', [
            'product' => [
                'id' => $product->id,
                'name' => $product->name,
                'slug' => $product->slug,
                'category_id' => $product->category_id,
                'short_description' => $product->short_description ?? '',
                'full_description' => $product->full_description ?? '',
                'base_price' => (float) $product->base_price,
                'compare_at_price' => $product->compare_at_price !== null ? (float) $product->compare_at_price : null,
                'primary_image' => $product->primary_image,
                'gallery_images' => $product->gallery_images ?? [],
                'status' => $product->status?->value ?? 'active',
                'materials' => $product->materials ?? '',
                'care_instructions' => $product->care_instructions ?? '',
                'collection_ids' => $product->collections->pluck('id')->all(),
                'variants' => $product->variants->map(fn ($v) => [
                    'id' => $v->id,
                    'sku' => $v->sku,
                    'color' => $v->color,
                    'color_hex' => $v->color_hex ?? '#000000',
                    'size' => $v->size,
                    'stock_count' => (int) $v->stock_count,
                    'price_adjustment' => (float) $v->price_adjustment,
                ])->all(),
                'updated_at' => $product->updated_at?->format('H:i') ?? '',
            ],
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'collections' => Collection::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }
}
