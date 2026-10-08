<?php

declare(strict_types=1);

use App\Exceptions\InsufficientStockException;
use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use App\Services\Cart\CartService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->category = Category::create([
        'name' => 'Living Room',
        'slug' => 'living-room',
        'is_active' => true,
    ]);

    $this->product = Product::create([
        'category_id' => $this->category->id,
        'name' => 'The Willow Lounge Chair',
        'slug' => 'the-willow-lounge-chair',
        'base_price' => 1250.00,
        'is_active' => true,
    ]);

    $this->variant = ProductVariant::create([
        'product_id' => $this->product->id,
        'sku' => 'WLC-SAGE-STD',
        'color' => 'Sage',
        'color_hex' => '#8A9A8E',
        'size' => 'Standard',
        'stock_count' => 5,
        'price_adjustment' => 0.00,
    ]);

    $this->cartService = new CartService;
});

test('can add variant to cart within available stock', function (): void {
    $cart = Cart::create(['session_id' => 'test-session-1']);

    $item = $this->cartService->addItem($cart, $this->variant->id, 2);

    expect($item->quantity)->toBe(2)
        ->and($cart->items()->count())->toBe(1)
        ->and($cart->totalItems())->toBe(2)
        ->and($cart->subtotal())->toBe(2500.00);
});

test('throws insufficient stock exception when requested quantity exceeds stock', function (): void {
    $cart = Cart::create(['session_id' => 'test-session-2']);

    $this->cartService->addItem($cart, $this->variant->id, 10);
})->throws(InsufficientStockException::class);

test('updates item quantity and deletes when quantity is zero', function (): void {
    $cart = Cart::create(['session_id' => 'test-session-3']);
    $item = $this->cartService->addItem($cart, $this->variant->id, 2);

    $updated = $this->cartService->updateItemQuantity($item, 4);
    expect($updated->quantity)->toBe(4);

    $this->cartService->updateItemQuantity($item, 0);
    expect($cart->items()->count())->toBe(0);
});

test('merges guest session cart into customer user cart', function (): void {
    $user = User::factory()->create();
    $guestCart = Cart::create(['session_id' => 'guest-session-4']);
    $this->cartService->addItem($guestCart, $this->variant->id, 2);

    $this->cartService->mergeGuestCartIntoUserCart($user, 'guest-session-4');

    $userCart = Cart::where('user_id', $user->id)->first();
    expect($userCart)->not->toBeNull()
        ->and($userCart->items()->count())->toBe(1)
        ->and($userCart->items()->first()->quantity)->toBe(2)
        ->and(Cart::where('session_id', 'guest-session-4')->exists())->toBeFalse();
});
