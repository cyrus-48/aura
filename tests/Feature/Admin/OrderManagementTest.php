<?php

declare(strict_types=1);

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Address;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\OrderNote;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();

    $this->address = Address::create([
        'user_id' => $this->admin->id,
        'first_name' => 'Sarah',
        'last_name' => 'Mwangi',
        'address_line_1' => 'Riverside Drive 42',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
        'phone' => '+254712345678',
    ]);

    $this->order = Order::create([
        'order_number' => 'AO-2026-901',
        'user_id' => $this->admin->id,
        'email' => 'sarah@example.com',
        'shipping_address_id' => $this->address->id,
        'status' => OrderStatus::Pending,
        'subtotal' => 160.00,
        'shipping_cost' => 10.00,
        'tax_amount' => 25.60,
        'total' => 195.60,
        'payment_status' => PaymentStatus::Paid,
        'payment_method' => PaymentMethod::Mpesa,
    ]);

    OrderItem::create([
        'order_id' => $this->order->id,
        'product_name' => 'Relaxed Linen Shirt',
        'variant_name' => 'Sage / M',
        'sku' => 'RLS-01',
        'unit_price' => 160.00,
        'quantity' => 1,
        'total_price' => 160.00,
    ]);
});

test('administrators can view orders list with counts', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.orders.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/orders/Index')
            ->has('orders.data')
            ->has('counts')
            ->has('filters')
        );
});

test('administrators can view order detail breakdown', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.orders.show', $this->order));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/orders/Detail')
            ->has('order.items', 1)
            ->has('order.shipping_address')
            ->has('customer')
            ->has('allowed_transitions')
        );
});

test('administrators can update order status and have it logged in timeline', function (): void {
    $response = $this->actingAs($this->admin)->patch(route('admin.orders.status', $this->order), [
        'status' => 'confirmed',
    ]);

    $response->assertRedirect();
    $this->order->refresh();
    expect($this->order->status)->toBe(OrderStatus::Confirmed);

    $note = OrderNote::where('order_id', $this->order->id)->first();
    expect($note)->not->toBeNull();
    expect($note->note)->toContain('Status changed from Pending to Confirmed');
});

test('administrators can append internal staff notes to an order', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.orders.notes.store', $this->order), [
        'note' => 'Spoke with client, requested gift packaging.',
    ]);

    $response->assertRedirect();

    $note = OrderNote::where('order_id', $this->order->id)
        ->where('note', 'Spoke with client, requested gift packaging.')
        ->first();

    expect($note)->not->toBeNull();
    expect($note->user_id)->toBe($this->admin->id);
});
