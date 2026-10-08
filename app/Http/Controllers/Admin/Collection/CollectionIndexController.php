<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Collection;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Inertia\Inertia;
use Inertia\Response;

class CollectionIndexController extends Controller
{
    /**
     * Display a listing of collections.
     */
    public function __invoke(): Response
    {
        $collections = Collection::query()
            ->withCount('products')
            ->orderBy('name')
            ->get()
            ->map(fn (Collection $c) => [
                'id' => $c->id,
                'name' => $c->name,
                'slug' => $c->slug,
                'description' => $c->description ?? '',
                'hero_image' => $c->hero_image,
                'is_active' => $c->is_active,
                'products_count' => $c->products_count,
            ]);

        return Inertia::render('admin/collections/Index', [
            'collections' => $collections,
        ]);
    }
}
