<?php

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Laravel\Fortify\Features;

beforeEach(function () {
    $this->skipUnlessFortifyHas(Features::registration());
});

test('registration screen can be rendered', function () {
    $response = $this->get(route('register'));

    $response->assertOk();
});

test('new users can register', function () {
    $response = $this->post(route('register.store'), [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('guest cart items are merged into user cart on registration', function () {
    $category = Category::create([
        'name' => 'Ceramics',
        'slug' => 'ceramics',
        'is_active' => true,
    ]);

    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Stoneware Mug',
        'slug' => 'stoneware-mug',
        'base_price' => 32.00,
        'is_active' => true,
    ]);

    $variant = ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'MUG-OAT',
        'color' => 'Oatmeal',
        'color_hex' => '#D8CEBE',
        'size' => 'Standard',
        'stock_count' => 10,
        'price_adjustment' => 0.00,
    ]);

    $guestSessionId = 'guest-register-session-id';
    $guestCart = Cart::create(['session_id' => $guestSessionId]);
    $guestCart->items()->create([
        'product_variant_id' => $variant->id,
        'quantity' => 3,
    ]);

    $response = $this->withSession(['guest_cart_session_id' => $guestSessionId])
        ->post(route('register.store'), [
            'name' => 'Curator Guest',
            'email' => 'curator@example.com',
            'password' => 'password',
            'password_confirmation' => 'password',
        ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $user = User::where('email', 'curator@example.com')->firstOrFail();
    $userCart = $user->cart;
    expect($userCart)->not->toBeNull();
    expect($userCart->items)->toHaveCount(1);
    expect($userCart->items->first()->product_variant_id)->toBe($variant->id);
    expect($userCart->items->first()->quantity)->toBe(3);
});
