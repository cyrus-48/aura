<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Category;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Inertia\Inertia;
use Inertia\Response;

class CategoryIndexController extends Controller
{
    /**
     * Display category tree and organization hierarchy.
     */
    public function __invoke(): Response
    {
        $categories = Category::query()
            ->whereNull('parent_id')
            ->withCount('products')
            ->with([
                'children' => fn ($q) => $q->withCount('products')->orderBy('name'),
            ])
            ->orderBy('name')
            ->get()
            ->map(fn (Category $cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'description' => $cat->description ?? '',
                'image' => $cat->image,
                'is_active' => $cat->is_active,
                'products_count' => $cat->products_count,
                'children' => $cat->children->map(fn (Category $child) => [
                    'id' => $child->id,
                    'parent_id' => $child->parent_id,
                    'name' => $child->name,
                    'slug' => $child->slug,
                    'description' => $child->description ?? '',
                    'image' => $child->image,
                    'is_active' => $child->is_active,
                    'products_count' => $child->products_count,
                ]),
            ]);

        $parentOptions = Category::query()->orderBy('name')->get(['id', 'name']);

        return Inertia::render('admin/categories/Index', [
            'categories' => $categories,
            'parent_options' => $parentOptions,
        ]);
    }
}
