<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Collection;
use App\Models\JournalPost;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Services\Catalog\CatalogService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->category = Category::create([
        'name' => 'Ceramics',
        'slug' => 'ceramics',
        'is_active' => true,
    ]);

    $this->collection = Collection::create([
        'name' => 'Earthy Elements',
        'slug' => 'earthy-elements',
        'is_active' => true,
    ]);

    $this->product = Product::create([
        'category_id' => $this->category->id,
        'name' => 'Handcrafted Terracotta Vase',
        'slug' => 'handcrafted-terracotta-vase',
        'short_description' => 'Earthy organic vase with hand-spun clay.',
        'base_price' => 180.00,
        'rating' => 4.9,
        'badge' => 'Trending Now',
        'is_active' => true,
    ]);

    $this->product->collections()->attach($this->collection->id);

    $this->variant = ProductVariant::create([
        'product_id' => $this->product->id,
        'sku' => 'HTV-CLAY-MD',
        'color' => 'Clay',
        'color_hex' => '#B86F52',
        'size' => 'Medium',
        'stock_count' => 8,
    ]);

    $this->catalogService = new CatalogService;
});

test('getHomeData returns curated home structure with active entities', function (): void {
    JournalPost::create([
        'title' => 'Slow Living at Home',
        'slug' => 'slow-living-at-home',
        'excerpt' => 'An editorial on intentional living.',
        'body' => 'Full article content here.',
        'is_featured' => true,
        'published_at' => now(),
    ]);

    $data = $this->catalogService->getHomeData();

    expect($data)->toHaveKeys(['newArrivals', 'heroProduct', 'featuredCollections', 'featuredArticle'])
        ->and($data['heroProduct']->id)->toBe($this->product->id)
        ->and($data['featuredCollections']->count())->toBe(1)
        ->and($data['featuredArticle'])->not->toBeNull();
});

test('filterProducts filters by search, category, and price range', function (): void {
    $results = $this->catalogService->filterProducts([
        'search' => 'Terracotta',
        'category' => 'ceramics',
        'min_price' => 100,
        'max_price' => 200,
    ]);

    expect($results->total())->toBe(1)
        ->and($results->first()->id)->toBe($this->product->id);
});

test('filterProducts returns empty when criteria does not match', function (): void {
    $results = $this->catalogService->filterProducts([
        'search' => 'NonExistentProductXYZ',
    ]);

    expect($results->total())->toBe(0);
});

test('filterProducts filters by color and size variants', function (): void {
    $match = $this->catalogService->filterProducts([
        'color' => 'Clay',
        'size' => 'Medium',
    ]);
    expect($match->total())->toBe(1);

    $noMatch = $this->catalogService->filterProducts([
        'color' => 'NeonPink',
    ]);
    expect($noMatch->total())->toBe(0);
});

test('getRelatedProducts excludes self and targets category', function (): void {
    $anotherProduct = Product::create([
        'category_id' => $this->category->id,
        'name' => 'Ceramic Planter',
        'slug' => 'ceramic-planter',
        'base_price' => 95.00,
        'is_active' => true,
    ]);

    $related = $this->catalogService->getRelatedProducts($this->product);

    expect($related->count())->toBe(1)
        ->and($related->first()->id)->toBe($anotherProduct->id)
        ->and($related->pluck('id'))->not->toContain($this->product->id);
});
