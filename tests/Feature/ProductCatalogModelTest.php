<?php

declare(strict_types=1);

use App\Models\Category;
use App\Models\Collection;
use App\Models\InventoryMovement;
use App\Models\Product;
use App\Models\ProductVariant;

test('product catalog relationships, pricing and inventory calculations work as expected', function () {
    $category = Category::create([
        'name' => 'Linen Tops',
        'slug' => 'linen-tops',
        'description' => 'Fine linen shirts',
    ]);

    $collection = Collection::create([
        'name' => 'Summer Capsule',
        'slug' => 'summer-capsule',
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Atelier Poplin Shirt',
        'slug' => 'atelier-poplin-shirt',
        'base_price' => 80.00,
        'compare_at_price' => 100.00,
        'is_active' => true,
    ]);

    $product->collections()->attach($collection->id, ['sort_order' => 1]);

    $variant = ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'POP-SHIRT-M',
        'color' => 'White',
        'size' => 'M',
        'price_adjustment' => 10.00,
        'stock_count' => 25,
    ]);

    InventoryMovement::create([
        'product_variant_id' => $variant->id,
        'quantity_change' => 25,
        'reason' => 'initial_seed',
    ]);

    expect($product->category->name)->toBe('Linen Tops')
        ->and($product->variants)->toHaveCount(1)
        ->and($product->collections)->toHaveCount(1)
        ->and($product->inStock())->toBeTrue()
        ->and($product->totalStock())->toBe(25)
        ->and($variant->finalPrice())->toBe(90.0)
        ->and($variant->isAvailable(10))->toBeTrue()
        ->and($variant->isAvailable(30))->toBeFalse()
        ->and($variant->inventoryMovements)->toHaveCount(1);
});
