<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Resources\Catalog\CollectionResource;
use App\Models\Collection;
use App\Services\Catalog\CatalogService;
use Inertia\Inertia;
use Inertia\Response;

class CollectionController extends Controller
{
    /**
     * Display curated editorial collections.
     */
    public function index(CatalogService $catalog): Response
    {
        $collections = $catalog->getCollections();

        return Inertia::render('Collections', [
            'collections' => CollectionResource::collection($collections),
        ]);
    }

    /**
     * Display a single collection with its products.
     */
    public function show(Collection $collection, CatalogService $catalog): Response
    {
        abort_unless($collection->is_active, 404);

        $collection = $catalog->loadCollectionProducts($collection);

        return Inertia::render('Collections', [
            'selectedCollection' => new CollectionResource($collection),
        ]);
    }
}
