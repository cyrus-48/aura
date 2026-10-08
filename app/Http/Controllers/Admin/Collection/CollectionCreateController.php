<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Collection;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class CollectionCreateController extends Controller
{
    /**
     * Show form for creating a new collection.
     */
    public function __invoke(): Response
    {
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
            'collection' => null,
            'available_products' => $products,
        ]);
    }
}
