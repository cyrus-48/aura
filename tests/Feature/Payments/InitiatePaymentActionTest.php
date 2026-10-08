<?php

declare(strict_types=1);

namespace Tests\Feature\Payments;

use App\Actions\Payment\InitiatePaymentAction;
use App\Actions\Payment\PaymentResult;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\User;
use App\Services\Payment\PaymentService;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

use Paysasa\Payments\DTOs\PaymentResponse;
use Paysasa\Payments\Enums\PaymentProvider;
use Paysasa\Payments\Facades\Payment;

test('initiates mpesa payment and returns typed PaymentResult object', function (): void {
    $fake = Payment::fake();
    $fake->queueResponse(PaymentResponse::makePending(
        provider: PaymentProvider::Mpesa,
        transactionId: 'TX-TEST-001',
        message: 'STK Push sent to 254711223344. Please enter your M-Pesa PIN.'
    ));

    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-PAY-001',
        'user_id' => $user->id,
        'email' => $user->email,
        'phone' => '+254711223344',
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 200.00,
        'total' => 200.00,
    ]);

    $action = new InitiatePaymentAction(new PaymentService);
    $result = $action->execute($order, PaymentMethod::Mpesa, ['phone' => '+254711223344']);

    expect($result)->toBeInstanceOf(PaymentResult::class)
        ->and($result->success)->toBeTrue()
        ->and($result->status)->toBe('pending')
        ->and($result->reference)->not->toBeEmpty()
        ->and($result->message)->toContain('STK Push sent');

    Payment::assertChargedOn('mpesa');
    Payment::assertCharged(fn ($req) => $req->amount === 200.0);
});

test('initiates cash on delivery and marks reference', function (): void {
    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-PAY-002',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Cod,
        'subtotal' => 150.00,
        'total' => 150.00,
    ]);

    $action = new InitiatePaymentAction(new PaymentService);
    $result = $action->execute($order, PaymentMethod::Cod);

    expect($result)->toBeInstanceOf(PaymentResult::class)
        ->and($result->success)->toBeTrue()
        ->and($result->status)->toBe('pending')
        ->and($result->message)->toContain('Cash on delivery selected');
});
