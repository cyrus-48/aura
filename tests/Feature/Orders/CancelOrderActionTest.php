<?php

declare(strict_types=1);

namespace Tests\Feature\Orders;

use App\Actions\Order\CancelOrderAction;
use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Events\OrderCancelled;
use App\Exceptions\InvalidStatusTransitionException;
use App\Models\Category;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;

uses(RefreshDatabase::class);

test('cancels pending order, restores variant inventory, and dispatches event', function (): void {
    Event::fake([OrderCancelled::class]);

    $category = Category::create(['name' => 'Ceramics', 'slug' => 'ceramics', 'is_active' => true]);
    $product = Product::create([
        'category_id' => $category->id,
        'name' => 'Artisan Vase',
        'slug' => 'artisan-vase',
        'base_price' => 120.00,
        'is_active' => true,
    ]);

    $variant = ProductVariant::create([
        'product_id' => $product->id,
        'sku' => 'VASE-01',
        'name' => 'Standard',
        'price' => 120.00,
        'stock_count' => 5,
        'is_active' => true,
    ]);

    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-CANCEL-001',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 240.00,
        'total' => 240.00,
    ]);

    OrderItem::create([
        'order_id' => $order->id,
        'product_variant_id' => $variant->id,
        'product_name' => 'Artisan Vase',
        'quantity' => 2,
        'unit_price' => 120.00,
        'total_price' => 240.00,
    ]);

    $action = new CancelOrderAction;
    $updatedOrder = $action->execute($order, 'Customer changed mind');

    expect($updatedOrder->status)->toBe(OrderStatus::Cancelled)
        ->and($variant->fresh()->stock_count)->toBe(7);

    Event::assertDispatched(OrderCancelled::class);
});

test('throws domain exception when attempting to cancel shipped order', function (): void {
    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-CANCEL-002',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Shipped,
        'payment_status' => PaymentStatus::Paid,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 100.00,
        'total' => 100.00,
    ]);

    $action = new CancelOrderAction;

    expect(fn () => $action->execute($order))
        ->toThrow(InvalidStatusTransitionException::class);
});

test('customer can cancel order through account route', function (): void {
    Event::fake([OrderCancelled::class]);

    $user = User::factory()->create();
    $order = Order::create([
        'order_number' => 'AO-CANCEL-003',
        'user_id' => $user->id,
        'email' => $user->email,
        'status' => OrderStatus::Pending,
        'payment_status' => PaymentStatus::Pending,
        'payment_method' => PaymentMethod::Mpesa,
        'subtotal' => 100.00,
        'total' => 100.00,
    ]);

    $response = $this->actingAs($user)->post(route('account.orders.cancel', ['order' => $order->order_number]), [
        'reason' => 'Changed my mind',
    ]);

    $response->assertRedirect();
    expect($order->fresh()->status)->toBe(OrderStatus::Cancelled);
    Event::assertDispatched(OrderCancelled::class);
});
