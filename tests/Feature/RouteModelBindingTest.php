<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->category = Category::create([
        'name' => 'Decor',
        'slug' => 'decor',
        'is_active' => true,
    ]);

    $this->activeProduct = Product::create([
        'category_id' => $this->category->id,
        'name' => 'Active Product',
        'slug' => 'active-product',
        'base_price' => 50.00,
        'is_active' => true,
    ]);

    $this->inactiveProduct = Product::create([
        'category_id' => $this->category->id,
        'name' => 'Inactive Product',
        'slug' => 'inactive-product',
        'base_price' => 50.00,
        'is_active' => false,
    ]);

    $this->activeCollection = Collection::create([
        'name' => 'Active Collection',
        'slug' => 'active-collection',
        'is_active' => true,
    ]);

    $this->inactiveCollection = Collection::create([
        'name' => 'Inactive Collection',
        'slug' => 'inactive-collection',
        'is_active' => false,
    ]);
});

test('resolves active product via slug and returns 200', function (): void {
    $response = $this->get(route('products.show', $this->activeProduct));
    $response->assertOk();
});

test('returns 404 for inactive product', function (): void {
    $response = $this->get(route('products.show', $this->inactiveProduct));
    $response->assertNotFound();
});

test('resolves active collection via slug and returns 200', function (): void {
    $response = $this->get(route('collections.show', $this->activeCollection));
    $response->assertOk();
});

test('returns 404 for inactive collection', function (): void {
    $response = $this->get(route('collections.show', $this->inactiveCollection));
    $response->assertNotFound();
});
