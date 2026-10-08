<?php

use App\Models\Cart;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Support\Facades\RateLimiter;
use Laravel\Fortify\Features;

test('login screen can be rendered', function () {
    $response = $this->get(route('login'));

    $response->assertOk();
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create();

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users with two factor enabled are redirected to two factor challenge', function () {
    $this->skipUnlessFortifyHas(Features::twoFactorAuthentication());

    Features::twoFactorAuthentication([
        'confirm' => true,
        'confirmPassword' => true,
    ]);

    $user = User::factory()->withTwoFactor()->create();

    $response = $this->post(route('login'), [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('two-factor.login'));
    $response->assertSessionHas('login.id', $user->id);
    $this->assertGuest();
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create();

    $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create();

    $response = $this->actingAs($user)->post(route('logout'));

    $response->assertRedirect(route('home'));

    $this->assertGuest();
});

test('users are rate limited', function () {
    $user = User::factory()->create();

    RateLimiter::increment(md5('login'.implode('|', [$user->email, '127.0.0.1'])), amount: 5);

    $response = $this->post(route('login.store'), [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $response->assertTooManyRequests();
});

test('guest cart items are merged into user cart on login', function () {
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

    $guestSessionId = 'guest-test-session-id';
    $guestCart = Cart::create(['session_id' => $guestSessionId]);
    $guestCart->items()->create([
        'product_variant_id' => $variant->id,
        'quantity' => 2,
    ]);

    $user = User::factory()->create();

    $response = $this->withSession(['guest_cart_session_id' => $guestSessionId])
        ->post(route('login.store'), [
            'email' => $user->email,
            'password' => 'password',
        ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));

    $userCart = $user->fresh()->cart;
    expect($userCart)->not->toBeNull();
    expect($userCart->items)->toHaveCount(1);
    expect($userCart->items->first()->product_variant_id)->toBe($variant->id);
    expect($userCart->items->first()->quantity)->toBe(2);
});
