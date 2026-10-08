<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Resources\Catalog\ProductCardResource;
use App\Http\Resources\Catalog\ProductDetailResource;
use App\Models\Product;
use App\Services\Catalog\CatalogService;
use Inertia\Inertia;
use Inertia\Response;

class ProductController extends Controller
{
    /**
     * Display a single product detail page.
     */
    public function show(Product $product, CatalogService $catalog): Response
    {
        abort_unless($product->is_active, 404);

        $product->loadMissing(['category', 'variants.product']);
        $relatedProducts = $catalog->getRelatedProducts($product);

        return Inertia::render('ProductDetail', [
            'product' => new ProductDetailResource($product),
            'relatedProducts' => ProductCardResource::collection($relatedProducts),
        ]);
    }
}
