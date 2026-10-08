<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Resources\Catalog\CategoryResource;
use App\Http\Resources\Catalog\CollectionResource;
use App\Http\Resources\Catalog\JournalPostResource;
use App\Http\Resources\Catalog\ProductCardResource;
use App\Services\Catalog\CatalogService;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    /**
     * Display the Aura & Oak storefront homepage.
     */
    public function __invoke(CatalogService $catalog): Response
    {
        $data = $catalog->getHomeData();

        return Inertia::render('Home', [
            'categories' => CategoryResource::collection($data['categories']),
            'newArrivals' => ProductCardResource::collection($data['newArrivals']),
            'heroProduct' => $data['heroProduct'] ? new ProductCardResource($data['heroProduct']) : null,
            'featuredCollections' => CollectionResource::collection($data['featuredCollections']),
            'featuredArticle' => $data['featuredArticle'] ? new JournalPostResource($data['featuredArticle']) : null,
        ]);
    }
}
