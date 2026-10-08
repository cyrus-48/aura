<?php

declare(strict_types=1);

namespace Tests\Feature\Policies;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\User;
use App\Policies\OrderPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can view their own order', function (): void {
    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-POLICY-001',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 150.00,
        'total' => 150.00,
    ]);

    $policy = new OrderPolicy;
    expect($policy->view($user, $order)->allowed())->toBeTrue();
});

test('user cannot view another users order', function (): void {
    $owner = User::factory()->create();
    $other = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-POLICY-002',
        'user_id' => $owner->id,
        'email' => $owner->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 150.00,
        'total' => 150.00,
    ]);

    $policy = new OrderPolicy;
    expect($policy->view($other, $order)->allowed())->toBeFalse();
});

test('admin can bypass order policy via before method', function (): void {
    $admin = User::factory()->admin()->create();
    $policy = new OrderPolicy;

    expect($policy->before($admin, 'view'))->toBeTrue()
        ->and($policy->before($admin, 'cancel'))->toBeTrue();
});

test('user can cancel their pending order', function (): void {
    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-POLICY-003',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 150.00,
        'total' => 150.00,
    ]);

    $policy = new OrderPolicy;
    expect($policy->cancel($user, $order)->allowed())->toBeTrue();
});

test('user cannot cancel order once shipped', function (): void {
    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-POLICY-004',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Shipped,
        'payment_status' => PaymentStatus::Paid,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 150.00,
        'total' => 150.00,
    ]);

    $policy = new OrderPolicy;
    expect($policy->cancel($user, $order)->allowed())->toBeFalse();
});
