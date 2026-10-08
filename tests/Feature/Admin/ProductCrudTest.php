<?php

declare(strict_types=1);

use App\Enums\ProductStatus;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
});

test('unauthenticated users cannot view products index', function (): void {
    $response = $this->get(route('admin.products.index'));

    $response->assertRedirect(route('login'));
});

test('non-staff customers receive 403 when accessing products list', function (): void {
    $customer = User::factory()->create();

    $response = $this->actingAs($customer)->get(route('admin.products.index'));

    $response->assertForbidden();
});

test('administrators can view products index with filters and counts', function (): void {
    $category = Category::create([
        'name' => 'Linen Tops',
        'slug' => 'linen-tops',
    ]);

    $product = Product::create([
        'name' => 'Classic Linen Shirt',
        'slug' => 'classic-linen-shirt',
        'category_id' => $category->id,
        'base_price' => 120.00,
        'status' => ProductStatus::Active,
        'is_active' => true,
    ]);

    ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'CLS-001',
        'color' => 'Sage',
        'size' => 'M',
        'stock_count' => 12,
        'price_adjustment' => 0,
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.products.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/Index')
            ->has('products.data')
            ->has('categories')
            ->has('counts')
            ->has('filters')
        );
});

test('administrators can filter products by search query', function (): void {
    Product::create([
        'name' => 'Oatmeal Wool Trousers',
        'slug' => 'oatmeal-wool-trousers',
        'base_price' => 195.00,
        'status' => ProductStatus::Active,
    ]);

    Product::create([
        'name' => 'Silk Scarf',
        'slug' => 'silk-scarf',
        'base_price' => 65.00,
        'status' => ProductStatus::Active,
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.products.index', ['search' => 'Wool']));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/Index')
            ->where('products.data.0.name', 'Oatmeal Wool Trousers')
            ->has('products.data', 1)
        );
});

test('administrators can view the product create page', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.products.create'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/products/Editor')
            ->where('product', null)
            ->has('categories')
            ->has('collections')
        );
});

test('administrators can store a new product with variants', function (): void {
    $category = Category::create(['name' => 'Knitwear', 'slug' => 'knitwear']);

    $payload = [
        'name' => 'Ribbed Knit Cardigan',
        'slug' => 'ribbed-knit-cardigan',
        'category_id' => $category->id,
        'short_description' => 'Fine merino wool cardigan.',
        'full_description' => 'Handcrafted using sustainably sourced yarn.',
        'base_price' => 210.00,
        'compare_at_price' => 250.00,
        'primary_image' => 'https://example.com/cardigan.jpg',
        'gallery_images' => ['https://example.com/cardigan.jpg', 'https://example.com/cardigan-2.jpg'],
        'status' => 'active',
        'variants' => [
            [
                'sku' => 'RKC-NAT-S',
                'color' => 'Natural',
                'size' => 'S',
                'stock_count' => 8,
                'price_adjustment' => 0.00,
            ],
            [
                'sku' => 'RKC-NAT-M',
                'color' => 'Natural',
                'size' => 'M',
                'stock_count' => 14,
                'price_adjustment' => 0.00,
            ],
        ],
    ];

    $response = $this->actingAs($this->admin)->post(route('admin.products.store'), $payload);

    $product = Product::where('slug', 'ribbed-knit-cardigan')->first();
    expect($product)->not->toBeNull();
    expect($product->status)->toBe(ProductStatus::Active);
    expect($product->variants()->count())->toBe(2);

    $response->assertRedirect(route('admin.products.edit', $product));
});

test('administrators can update an existing product and synchronize variants', function (): void {
    $product = Product::create([
        'name' => 'Linen Trench Coat',
        'slug' => 'linen-trench-coat',
        'base_price' => 320.00,
        'status' => ProductStatus::Draft,
    ]);

    $existingVariant = ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'LTC-01',
        'color' => 'Sand',
        'size' => 'One Size',
        'stock_count' => 5,
        'price_adjustment' => 0.00,
    ]);

    $updatePayload = [
        'name' => 'Refined Linen Trench Coat',
        'slug' => 'linen-trench-coat',
        'base_price' => 340.00,
        'status' => 'active',
        'variants' => [
            [
                'id' => $existingVariant->id,
                'sku' => 'LTC-01',
                'color' => 'Sand Beige',
                'size' => 'One Size',
                'stock_count' => 12,
                'price_adjustment' => 0.00,
            ],
            [
                'sku' => 'LTC-02',
                'color' => 'Moss Green',
                'size' => 'One Size',
                'stock_count' => 7,
                'price_adjustment' => 20.00,
            ],
        ],
    ];

    $response = $this->actingAs($this->admin)->put(route('admin.products.update', $product), $updatePayload);

    $product->refresh();
    expect($product->name)->toBe('Refined Linen Trench Coat');
    expect((float) $product->base_price)->toBe(340.00);
    expect($product->status)->toBe(ProductStatus::Active);
    expect($product->variants()->count())->toBe(2);

    $response->assertRedirect(route('admin.products.edit', $product));
});

test('administrators can duplicate a product as draft', function (): void {
    $product = Product::create([
        'name' => 'Atelier Silk Dress',
        'slug' => 'atelier-silk-dress',
        'base_price' => 280.00,
        'status' => ProductStatus::Active,
    ]);

    ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'ASD-01',
        'color' => 'Onyx',
        'size' => 'S',
        'stock_count' => 3,
        'price_adjustment' => 0,
    ]);

    $response = $this->actingAs($this->admin)->post(route('admin.products.duplicate', $product));

    $duplicate = Product::where('slug', 'atelier-silk-dress-copy')->first();
    expect($duplicate)->not->toBeNull();
    expect($duplicate->status)->toBe(ProductStatus::Draft);
    expect($duplicate->variants()->count())->toBe(1);

    $response->assertRedirect(route('admin.products.edit', $duplicate));
});

test('administrators can delete a product', function (): void {
    $product = Product::create([
        'name' => 'Temporary Sample',
        'slug' => 'temporary-sample',
        'base_price' => 50.00,
        'status' => ProductStatus::Draft,
    ]);

    $response = $this->actingAs($this->admin)->delete(route('admin.products.destroy', $product));

    expect(Product::find($product->id))->toBeNull();
    expect(Product::withTrashed()->find($product->id))->not->toBeNull();

    $response->assertRedirect(route('admin.products.index'));
});

test('administrators can perform bulk status changes', function (): void {
    $p1 = Product::create(['name' => 'P1', 'slug' => 'p1', 'base_price' => 10, 'status' => ProductStatus::Draft]);
    $p2 = Product::create(['name' => 'P2', 'slug' => 'p2', 'base_price' => 20, 'status' => ProductStatus::Draft]);

    $response = $this->actingAs($this->admin)->post(route('admin.products.bulk'), [
        'action' => 'status',
        'ids' => [$p1->id, $p2->id],
        'payload' => ['status' => 'active'],
    ]);

    $p1->refresh();
    $p2->refresh();
    expect($p1->status)->toBe(ProductStatus::Active);
    expect($p2->status)->toBe(ProductStatus::Active);

    $response->assertRedirect(route('admin.products.index'));
});
