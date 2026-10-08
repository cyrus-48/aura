<?php

declare(strict_types=1);

namespace App\Services\Catalog;

use App\Models\Category;
use App\Models\Collection as CuratedCollection;
use App\Models\JournalPost;
use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection as EloquentCollection;
use Illuminate\Support\Collection;

class CatalogService
{
    /**
     * Retrieve curated data for the storefront home page.
     *
     * @return array{
     *     categories: EloquentCollection<int, Category>,
     *     newArrivals: EloquentCollection<int, Product>,
     *     heroProduct: ?Product,
     *     featuredCollections: EloquentCollection<int, CuratedCollection>,
     *     featuredArticle: ?JournalPost
     * }
     */
    public function getHomeData(): array
    {
        $categories = Category::query()
            ->active()
            ->withCount('products')
            ->orderBy('name')
            ->get();

        $newArrivals = Product::query()
            ->active()
            ->with(['category', 'variants'])
            ->latest('id')
            ->take(8)
            ->get();

        $heroProduct = Product::query()
            ->active()
            ->where('badge', 'Trending Now')
            ->first() ?? Product::query()->active()->first();

        $featuredCollections = CuratedCollection::query()
            ->active()
            ->withCount('products')
            ->take(3)
            ->get();

        $featuredArticle = JournalPost::query()
            ->published()
            ->featured()
            ->latest('published_at')
            ->first() ?? JournalPost::query()->published()->latest('published_at')->first();

        return [
            'categories' => $categories,
            'newArrivals' => $newArrivals,
            'heroProduct' => $heroProduct,
            'featuredCollections' => $featuredCollections,
            'featuredArticle' => $featuredArticle,
        ];
    }

    /**
     * Filter and paginate products according to criteria.
     *
     * @param  array<string, mixed>  $filters
     * @return LengthAwarePaginator<Product>
     */
    public function filterProducts(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $query = Product::query()
            ->active()
            ->with(['category', 'variants']);

        if (! empty($filters['search'])) {
            $search = (string) $filters['search'];
            $query->where(function (Builder $q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('short_description', 'like', "%{$search}%")
                    ->orWhere('materials', 'like', "%{$search}%");
            });
        }

        if (! empty($filters['category'])) {
            $categorySlug = (string) $filters['category'];
            $query->whereHas('category', function (Builder $q) use ($categorySlug): void {
                $q->where('slug', $categorySlug);
            });
        }

        if (! empty($filters['collection'])) {
            $collectionSlug = (string) $filters['collection'];
            $query->whereHas('collections', function (Builder $q) use ($collectionSlug): void {
                $q->where('slug', $collectionSlug);
            });
        }

        if (! empty($filters['badge'])) {
            $badge = (string) $filters['badge'];
            if ($badge === 'new') {
                $query->where('badge', 'New Arrival');
            } else {
                $query->where('badge', 'like', "%{$badge}%");
            }
        }

        if (! empty($filters['material'])) {
            $material = (string) $filters['material'];
            $query->where('materials', 'like', "%{$material}%");
        }

        if (! empty($filters['color'])) {
            $color = (string) $filters['color'];
            $query->whereHas('variants', function (Builder $q) use ($color): void {
                $q->where('color', $color);
            });
        }

        if (! empty($filters['size'])) {
            $size = (string) $filters['size'];
            $query->whereHas('variants', function (Builder $q) use ($size): void {
                $q->where('size', $size);
            });
        }

        if (isset($filters['min_price']) && is_numeric($filters['min_price'])) {
            $query->where('base_price', '>=', (float) $filters['min_price']);
        }

        if (isset($filters['max_price']) && is_numeric($filters['max_price'])) {
            $query->where('base_price', '<=', (float) $filters['max_price']);
        }

        $sort = (string) ($filters['sort'] ?? 'newest');
        match ($sort) {
            'price_asc' => $query->orderBy('base_price', 'asc')->orderByDesc('id'),
            'price_desc' => $query->orderBy('base_price', 'desc')->orderByDesc('id'),
            'rating' => $query->orderBy('rating', 'desc')->orderByDesc('id'),
            default => $query->latest('id'),
        };

        return $query->paginate($perPage)->withQueryString();
    }

    /**
     * Retrieve facet aggregates for catalog filtering.
     *
     * @return array<string, mixed>
     */
    public function getFilterFacets(): array
    {
        $categories = Category::query()
            ->active()
            ->withCount(['products' => fn (Builder $q) => $q->active()])
            ->get();

        $availableColors = ProductVariant::query()
            ->select('color', 'color_hex')
            ->whereNotNull('color')
            ->distinct()
            ->get();

        $availableSizes = ProductVariant::query()
            ->whereNotNull('size')
            ->distinct()
            ->pluck('size');

        $totalActiveCount = Product::query()->active()->count();

        $materials = [
            'Linen',
            'Organic Cotton',
            'Virgin Wool',
            'Merino Wool',
            'Leather',
        ];

        return [
            'categories' => $categories,
            'materials' => $materials,
            'priceRange' => [
                'min' => 0,
                'max' => 500,
            ],
            'availableColors' => $availableColors,
            'availableSizes' => $availableSizes,
            'totalActiveCount' => $totalActiveCount,
        ];
    }

    /**
     * Retrieve related products for a given product.
     *
     * @return EloquentCollection<int, Product>
     */
    public function getRelatedProducts(Product $product, int $limit = 4): EloquentCollection
    {
        return Product::query()
            ->active()
            ->where('id', '!=', $product->id)
            ->when($product->category_id, fn (Builder $q) => $q->where('category_id', $product->category_id))
            ->with(['category', 'variants'])
            ->take($limit)
            ->get();
    }

    /**
     * Retrieve journal posts directory data.
     *
     * @return array{
     *     featuredPost: ?JournalPost,
     *     posts: LengthAwarePaginator<JournalPost>,
     *     categories: Collection<int, string>
     * }
     */
    public function getJournalData(?string $category = null, int $perPage = 9): array
    {
        $query = JournalPost::query()->published();

        if ($category !== null && $category !== '') {
            $query->where('category', $category);
        }

        $featured = JournalPost::query()
            ->published()
            ->featured()
            ->latest('published_at')
            ->first();

        $posts = $query
            ->when($featured, fn ($q) => $q->where('id', '!=', $featured->id))
            ->orderByDesc('published_at')
            ->orderByDesc('id')
            ->paginate($perPage)
            ->withQueryString();

        /** @var Collection<int, string> $categories */
        $categories = JournalPost::query()
            ->published()
            ->whereNotNull('category')
            ->distinct()
            ->pluck('category');

        return [
            'featuredPost' => $featured,
            'posts' => $posts,
            'categories' => $categories,
        ];
    }

    /**
     * Retrieve related articles for a given article.
     *
     * @return EloquentCollection<int, JournalPost>
     */
    public function getRelatedArticles(JournalPost $post, int $limit = 3): EloquentCollection
    {
        return JournalPost::query()
            ->published()
            ->where('id', '!=', $post->id)
            ->orderByDesc('published_at')
            ->take($limit)
            ->get();
    }

    /**
     * Retrieve active curated collections with preview products.
     *
     * @return EloquentCollection<int, CuratedCollection>
     */
    public function getCollections(): EloquentCollection
    {
        return CuratedCollection::query()
            ->active()
            ->with(['products' => fn ($q) => $q->active()->with('category')->take(4)])
            ->withCount(['products' => fn ($q) => $q->active()])
            ->get();
    }

    /**
     * Load products for an individual collection.
     */
    public function loadCollectionProducts(CuratedCollection $collection): CuratedCollection
    {
        return $collection->load(['products' => fn ($q) => $q->active()->with(['category', 'variants'])]);
    }
}
