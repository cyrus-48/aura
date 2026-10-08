<?php

declare(strict_types=1);

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Events\PaymentConfirmed;
use App\Models\Address;
use App\Models\Order;
use App\Services\Payment\PaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->address = Address::create([
        'type' => 'shipping',
        'first_name' => 'Amara',
        'last_name' => 'Kariuki',
        'email' => 'amara@example.com',
        'phone' => '+254711223344',
        'address_line_1' => '88 Westlands Rd',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
    ]);

    $this->order = Order::create([
        'order_number' => 'AO-20261006-TEST1',
        'email' => 'amara@example.com',
        'phone' => '+254711223344',
        'shipping_address_id' => $this->address->id,
        'billing_address_id' => $this->address->id,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'payment_reference' => 'PAY-TEST-REF-99',
        'subtotal' => 200.00,
        'shipping_cost' => 0.00,
        'tax_amount' => 32.00,
        'discount_amount' => 0.00,
        'total' => 232.00,
        'shipping_method' => 'standard',
    ]);

    $this->paymentService = new PaymentService;
});

test('marks order as paid and confirmed when successful payment webhook arrives', function (): void {
    Event::fake([PaymentConfirmed::class]);

    $payload = [
        'reference' => 'PAY-TEST-REF-99',
        'ResultCode' => 0,
        'status' => 'completed',
    ];

    $response = $this->postJson(route('webhooks.payments', ['driver' => 'mpesa']), $payload);

    $response->assertOk()
        ->assertJson(['status' => 'received']);

    $this->order->refresh();
    expect($this->order->payment_status)->toBe(PaymentStatus::Paid)
        ->and($this->order->status)->toBe(OrderStatus::Confirmed);

    Event::assertDispatched(PaymentConfirmed::class);
});

test('handles webhook idempotency when duplicate success webhook arrives', function (): void {
    Event::fake([PaymentConfirmed::class]);

    // Already paid
    $this->order->update([
        'payment_status' => PaymentStatus::Paid,
        'status' => OrderStatus::Confirmed,
    ]);

    $payload = [
        'reference' => 'PAY-TEST-REF-99',
        'ResultCode' => 0,
    ];

    $response = $this->postJson(route('webhooks.payments', ['driver' => 'mpesa']), $payload);

    $response->assertOk();
    // Subsequent calls do not re-dispatch confirmation
    Event::assertNotDispatched(PaymentConfirmed::class);
});
