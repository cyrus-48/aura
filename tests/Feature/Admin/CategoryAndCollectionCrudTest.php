<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Collection;
use App\Models\Product;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
});

test('administrators can view category tree hierarchy', function (): void {
    $parent = Category::create(['name' => 'Womenswear', 'slug' => 'womenswear']);
    Category::create(['name' => 'Dresses', 'slug' => 'dresses', 'parent_id' => $parent->id]);

    $response = $this->actingAs($this->admin)->get(route('admin.categories.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/categories/Index')
            ->has('categories')
            ->has('parent_options')
        );
});

test('administrators can create a new category', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.categories.store'), [
        'name' => 'Ceramics & Homeware',
        'slug' => 'ceramics-homeware',
        'description' => 'Handcrafted clay pottery.',
        'is_active' => true,
    ]);

    $response->assertRedirect(route('admin.categories.index'));
    expect(Category::where('slug', 'ceramics-homeware')->exists())->toBeTrue();
});

test('administrators can update a category', function (): void {
    $cat = Category::create(['name' => 'Old Name', 'slug' => 'old-name']);

    $response = $this->actingAs($this->admin)->put(route('admin.categories.update', $cat), [
        'name' => 'New Name',
        'slug' => 'old-name',
        'is_active' => false,
    ]);

    $response->assertRedirect(route('admin.categories.index'));
    $cat->refresh();
    expect($cat->name)->toBe('New Name');
    expect($cat->is_active)->toBeFalse();
});

test('administrators can delete a category', function (): void {
    $cat = Category::create(['name' => 'To Delete', 'slug' => 'to-delete']);

    $response = $this->actingAs($this->admin)->delete(route('admin.categories.destroy', $cat));

    $response->assertRedirect(route('admin.categories.index'));
    expect(Category::find($cat->id))->toBeNull();
});

test('administrators can view collections list', function (): void {
    Collection::create(['name' => 'Autumn Lookbook', 'slug' => 'autumn-lookbook']);

    $response = $this->actingAs($this->admin)->get(route('admin.collections.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/collections/Index')
            ->has('collections')
        );
});

test('administrators can create a collection and assign ordered products', function (): void {
    $p1 = Product::create(['name' => 'Product One', 'slug' => 'product-one', 'base_price' => 50]);
    $p2 = Product::create(['name' => 'Product Two', 'slug' => 'product-two', 'base_price' => 80]);

    $response = $this->actingAs($this->admin)->post(route('admin.collections.store'), [
        'name' => 'Summer Capsule',
        'slug' => 'summer-capsule',
        'description' => 'Lightweight breathable garments.',
        'hero_image' => 'https://example.com/hero.jpg',
        'is_active' => true,
        'product_ids' => [$p2->id, $p1->id],
    ]);

    $collection = Collection::where('slug', 'summer-capsule')->first();
    expect($collection)->not->toBeNull();
    expect($collection->products()->count())->toBe(2);

    $orderedIds = $collection->products->pluck('id')->all();
    expect($orderedIds)->toBe([$p2->id, $p1->id]);

    $response->assertRedirect(route('admin.collections.edit', $collection));
});

test('administrators can update a collection and its product sequence', function (): void {
    $collection = Collection::create(['name' => 'Winter Edit', 'slug' => 'winter-edit']);
    $p1 = Product::create(['name' => 'Coat', 'slug' => 'coat', 'base_price' => 150]);

    $response = $this->actingAs($this->admin)->put(route('admin.collections.update', $collection), [
        'name' => 'Winter Edit 2026',
        'slug' => 'winter-edit',
        'is_active' => true,
        'product_ids' => [$p1->id],
    ]);

    $response->assertRedirect(route('admin.collections.edit', $collection));
    $collection->refresh();
    expect($collection->name)->toBe('Winter Edit 2026');
    expect($collection->products()->count())->toBe(1);
});

test('administrators can delete a collection', function (): void {
    $collection = Collection::create(['name' => 'Old Collection', 'slug' => 'old-collection']);

    $response = $this->actingAs($this->admin)->delete(route('admin.collections.destroy', $collection));

    $response->assertRedirect(route('admin.collections.index'));
    expect(Collection::find($collection->id))->toBeNull();
});
