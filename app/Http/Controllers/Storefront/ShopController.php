<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Storefront\ShopFilterRequest;
use App\Http\Resources\Catalog\CategoryResource;
use App\Http\Resources\Catalog\ProductCardResource;
use App\Services\Catalog\CatalogService;
use Inertia\Inertia;
use Inertia\Response;

class ShopController extends Controller
{
    /**
     * Display the filtered Atelier shop catalog.
     */
    public function __invoke(ShopFilterRequest $request, CatalogService $catalog): Response
    {
        $products = $catalog->filterProducts($request->filters());
        $facets = $catalog->getFilterFacets();

        return Inertia::render('Shop', [
            'products' => ProductCardResource::collection($products),
            'categories' => CategoryResource::collection($facets['categories']),
            'materials' => $facets['materials'],
            'priceRange' => $facets['priceRange'],
            'totalActiveCount' => $facets['totalActiveCount'],
            'filters' => $request->filters(),
        ]);
    }
}
