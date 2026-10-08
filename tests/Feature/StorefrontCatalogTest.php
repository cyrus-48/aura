<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;

test('home page renders successfully with catalog data', function () {
    $response = $this->get('/');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Home')
            ->has('categories')
            ->has('newArrivals')
            ->has('featuredCollections')
        );
});

test('shop page renders successfully with paginated products and categories', function () {
    $response = $this->get('/shop');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Shop')
            ->has('products')
            ->has('categories')
            ->has('filters')
        );
});

test('shop page filters by search keyword and category', function () {
    $category = Category::create([
        'name' => 'Organic Linens',
        'slug' => 'organic-linens',
        'is_active' => true,
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Artisanal Kimono Robe',
        'slug' => 'artisanal-kimono-robe',
        'base_price' => 120.00,
        'is_active' => true,
    ]);

    ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'ROBE-S',
        'color' => 'Sage',
        'size' => 'S',
        'stock_count' => 10,
    ]);

    // Filter by category
    $catResponse = $this->get('/shop?category=organic-linens');
    $catResponse->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Shop')
            ->where('products.data.0.slug', 'artisanal-kimono-robe')
        );

    // Filter by search keyword
    $searchResponse = $this->get('/shop?search=Kimono');
    $searchResponse->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Shop')
            ->where('products.data.0.name', 'Artisanal Kimono Robe')
        );
});

test('collections page renders successfully', function () {
    $response = $this->get('/collections');

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Collections')
            ->has('collections')
        );
});

test('product detail page renders product data with variants without lazy loading violation', function () {
    $category = Category::create([
        'name' => 'Ceramics',
        'slug' => 'ceramics',
        'is_active' => true,
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Pleated Linen Maxi Dress',
        'slug' => 'pleated-linen-maxi-dress',
        'base_price' => 190.00,
        'is_active' => true,
    ]);

    ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'PLM-OAT-S',
        'color' => 'Oatmeal',
        'size' => 'S',
        'stock_count' => 12,
        'price_adjustment' => 0.00,
    ]);

    $response = $this->get("/products/{$product->slug}");

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('ProductDetail')
            ->where('product.slug', 'pleated-linen-maxi-dress')
            ->where('product.variants.0.sku', 'PLM-OAT-S')
            ->has('relatedProducts')
        );

    $missingResponse = $this->get('/products/completely-non-existent-product-slug');
    $missingResponse->assertNotFound();
});
