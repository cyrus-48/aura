<?php

declare(strict_types=1);

use App\Enums\DiscountType;
use App\Enums\UserRole;
use App\Models\Discount;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;
use Paysasa\Payments\Enums\PaymentCategory;
use Paysasa\Payments\Enums\PaymentProvider;
use Paysasa\Payments\Enums\PaymentStatus;
use Paysasa\Payments\Models\Payment;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
    $this->customer = User::factory()->create([
        'role' => UserRole::Customer,
    ]);

    $this->discount = Discount::create([
        'code' => 'WELCOME15',
        'type' => DiscountType::Percentage,
        'value' => 15.00,
        'min_order_amount' => 50.00,
        'max_uses' => 100,
        'uses_count' => 5,
        'is_active' => true,
        'description' => 'Welcome promo code',
    ]);
});

test('non-staff users cannot access discounts or payments management', function (): void {
    $this->actingAs($this->customer)->get(route('admin.discounts.index'))->assertForbidden();
    $this->actingAs($this->customer)->get(route('admin.payments.index'))->assertForbidden();
});

test('administrators can view discounts listing', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.discounts.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/discounts/Index')
            ->has('discounts.data', 1)
            ->where('discounts.data.0.code', 'WELCOME15')
            ->has('stats.total')
            ->has('stats.active')
        );
});

test('administrators can create a new discount coupon code', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.discounts.store'), [
        'code' => 'autumn25',
        'type' => 'percentage',
        'value' => 25.00,
        'min_order_amount' => 100.00,
        'max_uses' => 50,
        'is_active' => true,
        'description' => 'Autumn seasonal sale',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('discounts', [
        'code' => 'AUTUMN25',
        'value' => 25.00,
    ]);
});

test('administrators can update an existing discount', function (): void {
    $response = $this->actingAs($this->admin)->put(route('admin.discounts.update', $this->discount), [
        'code' => 'WELCOME20',
        'type' => 'percentage',
        'value' => 20.00,
        'is_active' => true,
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('discounts', [
        'id' => $this->discount->id,
        'code' => 'WELCOME20',
        'value' => 20.00,
    ]);
});

test('administrators can delete a discount', function (): void {
    $response = $this->actingAs($this->admin)->delete(route('admin.discounts.destroy', $this->discount));

    $response->assertRedirect();
    $this->assertDatabaseMissing('discounts', [
        'id' => $this->discount->id,
    ]);
});

test('administrators can view payments ledger', function (): void {
    Payment::create([
        'reference' => 'AO-PAY-1001',
        'provider' => PaymentProvider::Mpesa,
        'category' => PaymentCategory::MobileMoney,
        'status' => PaymentStatus::Successful,
        'amount_minor' => 15000,
        'currency' => 'KES',
        'provider_reference' => 'NLJ235123',
        'receipt_number' => 'NLJ235123',
        'customer_name' => 'Kipchoge Keino',
        'customer_email' => 'kipchoge@example.com',
    ]);

    $response = $this->actingAs($this->admin)->get(route('admin.payments.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/payments/Index')
            ->has('payments.data')
            ->has('stats.total_volume')
            ->has('stats.successful_count')
        );
});
