<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use App\Models\JournalPost;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class JournalIndexController extends Controller
{
    /**
     * Display a listing of journal editorial articles.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $status = $request->string('status')->trim()->toString();
        $category = $request->string('category')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = JournalPost::query();

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('title', 'like', "%{$search}%")
                    ->orWhere('excerpt', 'like', "%{$search}%");
            });
        }

        if ($status === 'published') {
            $query->whereNotNull('published_at')->where('published_at', '<=', now());
        } elseif ($status === 'draft') {
            $query->where(fn ($q) => $q->whereNull('published_at')->orWhere('published_at', '>', now()));
        }

        if ($category !== '') {
            $query->where('category', $category);
        }

        $paginator = $query->latest('id')->paginate($perPage)->withQueryString();

        $paginator->through(fn (JournalPost $p) => [
            'id' => $p->id,
            'title' => $p->title,
            'slug' => $p->slug,
            'category' => $p->category,
            'read_time' => $p->read_time ?? '4 min read',
            'is_featured' => $p->is_featured,
            'featured_image' => $p->featured_image,
            'is_published' => $p->published_at !== null && $p->published_at->isPast(),
            'published_at' => $p->published_at?->format('M d, Y') ?? 'Draft',
            'created_at' => $p->created_at?->format('M d, Y') ?? '',
        ]);

        return Inertia::render('admin/journal/Index', [
            'posts' => $paginator,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'category' => $category,
                'per_page' => $perPage,
            ],
            'categories' => JournalPost::distinct()->whereNotNull('category')->pluck('category'),
            'stats' => [
                'total' => JournalPost::count(),
                'published' => JournalPost::whereNotNull('published_at')->where('published_at', '<=', now())->count(),
                'featured' => JournalPost::where('is_featured', true)->count(),
            ],
        ]);
    }
}
