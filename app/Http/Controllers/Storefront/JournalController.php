<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Resources\Catalog\JournalPostResource;
use App\Models\JournalPost;
use App\Services\Catalog\CatalogService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JournalController extends Controller
{
    /**
     * Display the editorial journal articles directory.
     */
    public function index(Request $request, CatalogService $catalog): Response
    {
        $category = $request->input('category');
        $data = $catalog->getJournalData($category ? (string) $category : null);

        return Inertia::render('Journal', [
            'featuredPost' => $data['featuredPost'] ? new JournalPostResource($data['featuredPost']) : null,
            'posts' => JournalPostResource::collection($data['posts']),
            'categories' => $data['categories'],
            'selectedCategory' => $category,
        ]);
    }

    /**
     * Display a single editorial journal article.
     */
    public function show(JournalPost $post, CatalogService $catalog): Response
    {
        abort_unless($post->published_at !== null && $post->published_at->isPast(), 404);

        $relatedPosts = $catalog->getRelatedArticles($post);

        return Inertia::render('JournalDetail', [
            'post' => new JournalPostResource($post),
            'relatedPosts' => JournalPostResource::collection($relatedPosts),
        ]);
    }
}
