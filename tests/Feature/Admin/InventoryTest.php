<?php

declare(strict_types=1);

use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();

    $this->product = Product::create([
        'name' => 'Cashmere Throw',
        'slug' => 'cashmere-throw',
        'base_price' => 180,
    ]);

    $this->variant = ProductVariant::create([
        'product_id' => $this->product->id,
        'sku' => 'CT-01',
        'color' => 'Oatmeal',
        'size' => 'Standard',
        'stock_count' => 20,
        'price_adjustment' => 0,
    ]);
});

test('administrators can view inventory page with variants and calculations', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.inventory.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/inventory/Index')
            ->has('variants.data')
            ->has('categories')
            ->has('low_stock_count')
        );
});

test('administrators can add stock via inventory adjustment', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.inventory.adjust'), [
        'product_variant_id' => $this->variant->id,
        'adjustment_type' => 'add',
        'quantity' => 15,
        'reason' => 'Warehouse restock delivery',
    ]);

    $response->assertRedirect(route('admin.inventory.index'));

    $this->variant->refresh();
    expect($this->variant->stock_count)->toBe(35);

    $movement = InventoryMovement::where('product_variant_id', $this->variant->id)->first();
    expect($movement)->not->toBeNull();
    expect($movement->quantity_change)->toBe(15);
    expect($movement->reason)->toBe('Warehouse restock delivery');
});

test('administrators can subtract stock via inventory adjustment', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.inventory.adjust'), [
        'product_variant_id' => $this->variant->id,
        'adjustment_type' => 'subtract',
        'quantity' => 4,
        'reason' => 'Damaged in storage write-off',
    ]);

    $response->assertRedirect(route('admin.inventory.index'));

    $this->variant->refresh();
    expect($this->variant->stock_count)->toBe(16);
});

test('administrators can set exact stock count', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.inventory.adjust'), [
        'product_variant_id' => $this->variant->id,
        'adjustment_type' => 'set',
        'quantity' => 50,
        'reason' => 'Physical cycle count',
    ]);

    $response->assertRedirect(route('admin.inventory.index'));

    $this->variant->refresh();
    expect($this->variant->stock_count)->toBe(50);
});

test('administrators can view inventory movements json history', function (): void {
    InventoryMovement::create([
        'product_variant_id' => $this->variant->id,
        'quantity_change' => 10,
        'reason' => 'Initial batch',
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.inventory.movements', $this->variant));

    $response->assertOk()
        ->assertJsonStructure([
            'sku',
            'color',
            'size',
            'movements' => [
                '*' => ['id', 'quantity_change', 'reason', 'created_at'],
            ],
        ]);
});
