<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Content;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use App\Models\JournalPost;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaLibraryController extends Controller
{
    /**
     * Display media library gallery with aggregated assets from products, collections, and journal.
     */
    public function index(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $media = collect();

        // 1. Product Images
        foreach (Product::all() as $product) {
            if ($product->primary_image) {
                $media->push([
                    'id' => 'prod-pri-'.$product->id,
                    'title' => $product->name.' (Primary)',
                    'url' => $product->primary_image,
                    'type' => 'Product',
                    'size' => '850 KB',
                    'created_at' => $product->created_at?->format('M d, Y') ?? '',
                ]);
            }
            if (is_array($product->images)) {
                foreach ($product->images as $idx => $img) {
                    $media->push([
                        'id' => 'prod-gal-'.$product->id.'-'.$idx,
                        'title' => $product->name.' Gallery #'.($idx + 1),
                        'url' => $img,
                        'type' => 'Product',
                        'size' => '920 KB',
                        'created_at' => $product->created_at?->format('M d, Y') ?? '',
                    ]);
                }
            }
        }

        // 2. Collection Images
        foreach (Collection::whereNotNull('hero_image')->get() as $col) {
            $media->push([
                'id' => 'col-'.$col->id,
                'title' => $col->name.' (Hero Banner)',
                'url' => $col->hero_image,
                'type' => 'Collection',
                'size' => '1.2 MB',
                'created_at' => $col->created_at?->format('M d, Y') ?? '',
            ]);
        }

        // 3. Journal Images
        foreach (JournalPost::whereNotNull('featured_image')->get() as $jp) {
            $media->push([
                'id' => 'journal-'.$jp->id,
                'title' => $jp->title.' (Cover)',
                'url' => $jp->featured_image,
                'type' => 'Journal',
                'size' => '1.4 MB',
                'created_at' => $jp->created_at?->format('M d, Y') ?? '',
            ]);
        }

        if ($search !== '') {
            $media = $media->filter(fn ($item) => str_contains(strtolower((string) $item['title']), strtolower($search)) || str_contains(strtolower((string) $item['type']), strtolower($search)));
        }

        return Inertia::render('admin/media/Index', [
            'media' => $media->values(),
            'filters' => [
                'search' => $search,
            ],
            'stats' => [
                'total_assets' => $media->count(),
                'product_assets' => $media->where('type', 'Product')->count(),
                'editorial_assets' => $media->whereIn('type', ['Collection', 'Journal'])->count(),
            ],
        ]);
    }
}
