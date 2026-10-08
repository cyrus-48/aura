<?php

declare(strict_types=1);

use App\Models\Address;
use App\Models\Order;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('unauthenticated user is redirected to login from /account', function (): void {
    $response = $this->get(route('account.index'));

    $response->assertRedirect('/login');
});

test('authenticated user can view account dashboard with orders and addresses', function (): void {
    $user = User::factory()->create();

    $address = Address::create([
        'user_id' => $user->id,
        'type' => 'shipping',
        'first_name' => 'Jane',
        'last_name' => 'Doe',
        'email' => $user->email,
        'phone' => '+254700112233',
        'address_line_1' => '10 Parklands Ave',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
    ]);

    Order::create([
        'order_number' => 'AO-ACCT-TEST-1',
        'user_id' => $user->id,
        'email' => $user->email,
        'phone' => '+254700112233',
        'shipping_address_id' => $address->id,
        'subtotal' => 150.00,
        'shipping_cost' => 0.00,
        'tax_amount' => 24.00,
        'discount_amount' => 0.00,
        'total' => 174.00,
        'shipping_method' => 'standard',
    ]);

    $response = $this->actingAs($user)->get(route('account.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Account')
            ->has('user', fn ($pageUser) => $pageUser
                ->where('id', $user->id)
                ->where('email', $user->email)
                ->etc()
            )
            ->has('metrics', fn ($pageMetrics) => $pageMetrics
                ->where('totalOrders', 1)
                ->etc()
            )
            ->has('orders', 1)
            ->has('addresses', 1)
        );
});
