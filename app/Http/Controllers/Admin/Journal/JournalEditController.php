<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use App\Models\JournalPost;
use Inertia\Inertia;
use Inertia\Response;

class JournalEditController extends Controller
{
    /**
     * Show the editor to modify an existing journal post.
     */
    public function __invoke(JournalPost $post): Response
    {
        return Inertia::render('admin/journal/Editor', [
            'post' => [
                'id' => $post->id,
                'title' => $post->title,
                'slug' => $post->slug,
                'category' => $post->category,
                'read_time' => $post->read_time,
                'excerpt' => $post->excerpt,
                'body' => $post->body,
                'featured_image' => $post->featured_image,
                'is_featured' => (bool) $post->is_featured,
                'published_at' => $post->published_at?->format('Y-m-d'),
            ],
        ]);
    }
}
