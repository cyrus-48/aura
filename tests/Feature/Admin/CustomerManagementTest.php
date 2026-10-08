<?php

declare(strict_types=1);

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Enums\UserRole;
use App\Models\Address;
use App\Models\CustomerNote;
use App\Models\Order;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
    $this->customer = User::factory()->create([
        'name' => 'Amara Vance',
        'email' => 'amara.vance@example.com',
        'role' => UserRole::Customer,
    ]);

    $this->address = Address::create([
        'user_id' => $this->customer->id,
        'first_name' => 'Amara',
        'last_name' => 'Vance',
        'address_line_1' => '24 Atelier Way',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'is_default' => true,
    ]);

    $this->order = Order::create([
        'order_number' => 'AO-2026-888',
        'user_id' => $this->customer->id,
        'email' => $this->customer->email,
        'shipping_address_id' => $this->address->id,
        'status' => OrderStatus::Processing,
        'subtotal' => 240.00,
        'shipping_cost' => 0.00,
        'tax_amount' => 38.40,
        'total' => 278.40,
        'payment_status' => PaymentStatus::Paid,
        'payment_method' => PaymentMethod::Stripe,
    ]);
});

test('non-staff users cannot access customer management', function (): void {
    $response = $this->actingAs($this->customer)->get(route('admin.customers.index'));
    $response->assertForbidden();
});

test('administrators can list customers with metrics and filters', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.customers.index', ['search' => 'Amara']));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/customers/Index')
            ->has('customers.data', 1)
            ->where('customers.data.0.name', 'Amara Vance')
            ->has('stats.total_customers')
            ->has('stats.total_revenue')
        );
});

test('administrators can view customer detail page with orders and addresses', function (): void {
    CustomerNote::create([
        'customer_id' => $this->customer->id,
        'author_id' => $this->admin->id,
        'note' => 'Prefers expedited gift packaging for linen orders.',
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.customers.show', $this->customer));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/customers/Detail')
            ->where('customer.id', $this->customer->id)
            ->where('customer.name', 'Amara Vance')
            ->has('orders', 1)
            ->has('addresses', 1)
            ->has('notes', 1)
            ->where('notes.0.note', 'Prefers expedited gift packaging for linen orders.')
        );
});

test('staff can create an internal note on a customer', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.customers.notes.store', $this->customer), [
        'note' => 'Customer confirmed sizing preference over phone inquiry.',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('customer_notes', [
        'customer_id' => $this->customer->id,
        'author_id' => $this->admin->id,
        'note' => 'Customer confirmed sizing preference over phone inquiry.',
    ]);
});

test('creating customer note fails with empty content', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.customers.notes.store', $this->customer), [
        'note' => '',
    ]);

    $response->assertSessionHasErrors('note');
});
