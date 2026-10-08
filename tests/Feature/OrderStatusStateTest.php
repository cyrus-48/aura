<?php

declare(strict_types=1);

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Exceptions\InvalidStatusTransitionException;
use App\Models\Order;
use App\Models\User;

test('order transitions through allowed states according to the state machine', function () {
    $user = User::factory()->create();

    $order = Order::create([
        'order_number' => 'AO-TEST-001',
        'user_id' => $user->id,
        'email' => 'test@aura.test',
        'status' => OrderStatus::Pending,
        'subtotal' => 100.00,
        'total' => 100.00,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
    ]);

    expect($order->status)->toBe(OrderStatus::Pending);

    // Pending -> Confirmed
    $order->transitionTo(OrderStatus::Confirmed);
    expect($order->fresh()->status)->toBe(OrderStatus::Confirmed);

    // Confirmed -> Processing
    $order->transitionTo(OrderStatus::Processing);
    expect($order->fresh()->status)->toBe(OrderStatus::Processing);

    // Processing -> Shipped
    $order->transitionTo(OrderStatus::Shipped);
    expect($order->fresh()->status)->toBe(OrderStatus::Shipped);

    // Shipped -> Delivered
    $order->transitionTo(OrderStatus::Delivered);
    expect($order->fresh()->status)->toBe(OrderStatus::Delivered);

    // Delivered -> Refunded
    $order->transitionTo(OrderStatus::Refunded);
    expect($order->fresh()->status)->toBe(OrderStatus::Refunded);
});

test('order rejects invalid status transitions with exception', function () {
    $user = User::factory()->create();

    $order = Order::create([
        'order_number' => 'AO-TEST-002',
        'user_id' => $user->id,
        'email' => 'test@aura.test',
        'status' => OrderStatus::Pending,
        'subtotal' => 100.00,
        'total' => 100.00,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
    ]);

    // Pending cannot jump straight to Shipped
    expect(fn () => $order->transitionTo(OrderStatus::Shipped))
        ->toThrow(InvalidStatusTransitionException::class);
});
