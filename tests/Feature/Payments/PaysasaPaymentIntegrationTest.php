<?php

declare(strict_types=1);

namespace Tests\Feature\Payments;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Events\PaymentConfirmed;
use App\Listeners\Payment\HandlePaysasaPaymentEvent;
use App\Models\Address;
use App\Models\Order;
use App\Services\Payment\PaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Paysasa\Payments\DTOs\PaymentResponse;
use Paysasa\Payments\Enums\PaymentProvider;
use Paysasa\Payments\Events\PaymentSuccessful;
use Paysasa\Payments\Facades\Payment;
use Paysasa\Payments\Models\Payment as PaysasaPayment;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->address = Address::create([
        'type' => 'shipping',
        'first_name' => 'Wanjiku',
        'last_name' => 'Ndung\'u',
        'email' => 'wanjiku@example.com',
        'phone' => '+254722334455',
        'address_line_1' => '12 Kilimani Rd',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
    ]);

    $this->order = Order::create([
        'order_number' => 'AO-PAYSASA-TEST-1',
        'email' => 'wanjiku@example.com',
        'phone' => '+254722334455',
        'shipping_address_id' => $this->address->id,
        'billing_address_id' => $this->address->id,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Stripe,
        'payment_reference' => 'PAY-PAYSASA-99',
        'subtotal' => 450.00,
        'shipping_cost' => 0.00,
        'tax_amount' => 72.00,
        'discount_amount' => 0.00,
        'total' => 522.00,
        'shipping_method' => 'standard',
    ]);

    $this->paymentService = new PaymentService;
});

test('processes synchronous stripe card charge through paysasa and confirms order', function (): void {
    Event::fake([PaymentConfirmed::class]);
    Payment::fake();

    $result = $this->paymentService->initiatePayment($this->order, PaymentMethod::Stripe, [
        'card_token' => 'tok_visa_fake_card_token',
    ]);

    expect($result['success'])->toBeTrue()
        ->and($result['status'])->toBe('paid');

    Payment::assertChargedOn('stripe');
    Payment::assertCharged(fn ($req) => $req->amount === 522.0);

    $this->order->refresh();
    expect($this->order->payment_status)->toBe(PaymentStatus::Paid)
        ->and($this->order->status)->toBe(OrderStatus::Confirmed);

    Event::assertDispatched(PaymentConfirmed::class);
});

test('processes airtel money charge through paysasa', function (): void {
    $fake = Payment::fake();
    $fake->queueResponse(PaymentResponse::makePending(
        provider: PaymentProvider::Airtel,
        transactionId: 'TX-AIRTEL-001',
        message: 'Prompt sent to 254722334455'
    ));

    $result = $this->paymentService->initiatePayment($this->order, PaymentMethod::Airtel, [
        'phone' => '0722334455',
    ]);

    expect($result['success'])->toBeTrue()
        ->and($result['status'])->toBe('pending');

    Payment::assertChargedOn('airtel');
});

test('handlePaysasaPaymentEvent confirms order upon PaymentSuccessful domain event', function (): void {
    Event::fake([PaymentConfirmed::class]);

    $paysasaPayment = PaysasaPayment::create([
        'provider' => 'mpesa',
        'category' => 'mobile_money',
        'status' => 'successful',
        'amount' => 522.0,
        'amount_minor' => 52200,
        'currency' => 'KES',
        'reference' => 'PAY-PAYSASA-99',
        'provider_reference' => 'MPESA-RCPT-12345',
    ]);

    $response = PaymentResponse::makeSuccessful(
        provider: PaymentProvider::Mpesa,
        transactionId: $paysasaPayment->uuid,
        providerReference: 'MPESA-RCPT-12345',
        amount: 522.0,
        currency: 'KES',
    );

    $listener = new HandlePaysasaPaymentEvent;
    $listener->handleSuccessful(new PaymentSuccessful($paysasaPayment, $response));

    $this->order->refresh();
    expect($this->order->payment_status)->toBe(PaymentStatus::Paid)
        ->and($this->order->status)->toBe(OrderStatus::Confirmed)
        ->and($this->order->payment_reference)->toBe('MPESA-RCPT-12345');

    Event::assertDispatched(PaymentConfirmed::class);
});

test('processes order refund through paysasa', function (): void {
    Payment::fake();

    $this->order->update([
        'payment_status' => PaymentStatus::Paid,
        'status' => OrderStatus::Delivered,
    ]);

    $result = $this->paymentService->initiateRefund($this->order, 522.0, 'Customer requested return');

    expect($result['success'])->toBeTrue();

    Payment::assertRefunded();

    $this->order->refresh();
    expect($this->order->payment_status)->toBe(PaymentStatus::Refunded)
        ->and($this->order->status)->toBe(OrderStatus::Refunded);
});
