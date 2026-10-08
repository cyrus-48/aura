<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Collection;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class CollectionEditController extends Controller
{
    /**
     * Show form for editing an existing collection.
     */
    public function __invoke(Collection $collection): Response
    {
        $collection->loadMissing(['products']);

        $products = Product::query()
            ->with('variants')
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'base_price', 'primary_image'])
            ->map(fn (Product $p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => '$'.number_format((float) $p->base_price, 2),
                'primary_image' => $p->primary_image,
            ]);

        return Inertia::render('admin/collections/Editor', [
            'collection' => [
                'id' => $collection->id,
                'name' => $collection->name,
                'slug' => $collection->slug,
                'description' => $collection->description ?? '',
                'hero_image' => $collection->hero_image ?? '',
                'is_active' => $collection->is_active,
                'product_ids' => $collection->products->pluck('id')->all(),
            ],
            'available_products' => $products,
        ]);
    }
}
