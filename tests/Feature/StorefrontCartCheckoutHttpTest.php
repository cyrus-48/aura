<?php

declare(strict_types=1);

use App\Enums\PaymentMethod;
use App\Models\Category;
use App\Models\Order;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Paysasa\Payments\Facades\Payment;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->category = Category::create([
        'name' => 'Textiles',
        'slug' => 'textiles',
        'is_active' => true,
    ]);

    $this->product = Product::create([
        'category_id' => $this->category->id,
        'name' => 'Organic Linen Duvet Set',
        'slug' => 'organic-linen-duvet-set',
        'base_price' => 280.00,
        'is_active' => true,
    ]);

    $this->variant = ProductVariant::create([
        'product_id' => $this->product->id,
        'sku' => 'LDS-FLAX-QN',
        'color' => 'Flax',
        'color_hex' => '#D8CEBE',
        'size' => 'Queen',
        'stock_count' => 15,
        'price_adjustment' => 0.00,
    ]);
});

test('can view cart page and returns 200', function (): void {
    $response = $this->get(route('cart.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page->component('Cart'));
});

test('can add item to cart via POST /cart', function (): void {
    $response = $this->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 2,
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();
});

test('can add item to cart using variant_id parameter from vue product detail', function (): void {
    $response = $this->post(route('cart.store'), [
        'product_id' => $this->product->id,
        'variant_id' => $this->variant->id,
        'quantity' => 1,
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();
});

test('can quick-add product to cart using product_id parameter', function (): void {
    $response = $this->post(route('cart.store'), [
        'product_id' => $this->product->id,
        'quantity' => 1,
    ]);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();
});

test('checkout redirects to cart when cart is empty', function (): void {
    $response = $this->get(route('checkout.index'));

    $response->assertRedirect(route('cart.index'));
});

test('authenticated customer can complete checkout and redirects to confirmation', function (): void {
    $user = User::factory()->create();

    // 1. Add item to cart for authenticated user
    $this->actingAs($user)->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 1,
    ]);

    // 2. Submit checkout
    $checkoutPayload = [
        'first_name' => 'Lillian',
        'last_name' => 'Hayes',
        'email' => 'lillian@example.com',
        'phone' => '+254722112233',
        'address_line_1' => '7 Argwings Kodhek Rd',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'shipping_method' => 'standard',
        'payment_method' => 'mpesa',
    ];

    $response = $this->actingAs($user)->post(route('checkout.store'), $checkoutPayload);

    $response->assertSessionHasNoErrors();
    $response->assertRedirect();

    $this->assertDatabaseHas('orders', [
        'user_id' => $user->id,
        'email' => 'lillian@example.com',
        'phone' => '+254722112233',
    ]);
});

test('customer can submit checkout with nested vue form structure and card payment', function (): void {
    Payment::fake();
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 1,
    ]);

    $nestedPayload = [
        'email' => 'artisan@auraandoak.com',
        'phone' => '+254711998877',
        'shippingMethod' => 'express',
        'paymentMethod' => 'card',
        'cardNumber' => '4242424242424242',
        'cardExpiry' => '12/28',
        'cardCvc' => '123',
        'shippingAddress' => [
            'firstName' => 'Amani',
            'lastName' => 'Mwangi',
            'addressLine1' => '45 Karen Rd',
            'addressLine2' => 'Villa 3',
            'city' => 'Nairobi',
            'state' => 'Nairobi',
            'postalCode' => '00502',
            'country' => 'Kenya',
        ],
        'notes' => 'Please ring the gate bell.',
    ];

    $response = $this->actingAs($user)->post(route('checkout.store'), $nestedPayload);

    $response->assertSessionHasNoErrors();
    $order = Order::where('email', 'artisan@auraandoak.com')->first();
    expect($order)->not->toBeNull();

    $response->assertRedirect(route('orders.confirmation', ['order' => $order->order_number]));
});

test('customer can complete checkout with cash on delivery', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 1,
    ]);

    $codPayload = [
        'first_name' => 'Kip',
        'last_name' => 'Rono',
        'email' => 'kip@example.com',
        'phone' => '+254700112233',
        'address_line_1' => '10 Highlands Way',
        'city' => 'Eldoret',
        'postal_code' => '30100',
        'country' => 'Kenya',
        'shipping_method' => 'standard',
        'payment_method' => 'cod',
    ];

    $response = $this->actingAs($user)->post(route('checkout.store'), $codPayload);

    $response->assertSessionHasNoErrors();
    $order = Order::where('email', 'kip@example.com')->first();
    expect($order)->not->toBeNull()
        ->and($order->payment_method)->toBe(PaymentMethod::Cod);

    $response->assertRedirect(route('orders.confirmation', ['order' => $order->order_number]));
});

test('order confirmation displays receipt for placed order', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 1,
    ]);

    $checkoutPayload = [
        'first_name' => 'Wanjiru',
        'last_name' => 'Kariuki',
        'email' => 'wanjiru@example.com',
        'phone' => '+254712000111',
        'address_line_1' => '22 Riverside Dr',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'shipping_method' => 'standard',
        'payment_method' => 'mpesa',
    ];

    $this->actingAs($user)->post(route('checkout.store'), $checkoutPayload);

    $order = Order::where('email', 'wanjiru@example.com')->firstOrFail();

    $response = $this->get(route('orders.confirmation', ['order' => $order->order_number]));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('OrderConfirmation')
            ->has('order')
            ->where('order.orderNumber', $order->order_number)
            ->where('order.email', 'wanjiru@example.com')
        );
});

test('visiting shop page with items in cart shares cart state without lazy loading violation', function (): void {
    $user = User::factory()->create();

    $this->actingAs($user)->post(route('cart.store'), [
        'product_variant_id' => $this->variant->id,
        'quantity' => 2,
    ]);

    $response = $this->actingAs($user)->get(route('shop'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Shop')
            ->where('cart.totalItems', 2)
            ->where('cart.subtotal', 560)
        );
});
