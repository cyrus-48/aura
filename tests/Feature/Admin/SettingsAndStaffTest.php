<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\StoreSetting;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
    $this->customer = User::factory()->create([
        'role' => UserRole::Customer,
    ]);
});

test('non-staff users cannot access settings or staff management', function (): void {
    $this->actingAs($this->customer)->get(route('admin.settings.index'))->assertForbidden();
    $this->actingAs($this->customer)->get(route('admin.staff.index'))->assertForbidden();
});

test('administrators can view store settings page', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.settings.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/settings/Index')
            ->has('settings.store_name')
            ->has('settings.currency')
        );
});

test('administrators can update store settings', function (): void {
    $response = $this->actingAs($this->admin)->put(route('admin.settings.update'), [
        'store_name' => 'Aura & Oak Flagship',
        'support_email' => 'care@auraandoak.com',
        'contact_phone' => '+254 711 000 111',
        'currency' => 'USD',
        'tax_rate' => 18.0,
        'free_shipping_threshold' => 200.00,
        'flat_shipping_rate' => 20.00,
        'low_stock_threshold' => 10,
        'notifications_enabled' => true,
    ]);

    $response->assertRedirect();
    expect(StoreSetting::get('store_name'))->toBe('Aura & Oak Flagship')
        ->and(StoreSetting::get('tax_rate'))->toBe('18');
});

test('administrators can view staff members list', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.staff.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/staff/Index')
            ->has('staff')
        );
});

test('administrators can add new staff member', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.staff.store'), [
        'name' => 'Ken Ochieng',
        'email' => 'ken.ochieng@auraandoak.com',
        'role' => UserRole::Manager->value,
        'password' => 'SecurePass2026!',
    ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('users', [
        'email' => 'ken.ochieng@auraandoak.com',
        'role' => UserRole::Manager->value,
    ]);
});

test('administrators cannot delete their own account', function (): void {
    $response = $this->actingAs($this->admin)->delete(route('admin.staff.destroy', $this->admin));

    $response->assertRedirect();
    $this->assertDatabaseHas('users', [
        'id' => $this->admin->id,
    ]);
});

test('administrators can remove another staff member', function (): void {
    $staff = User::factory()->create([
        'role' => UserRole::Support,
    ]);

    $response = $this->actingAs($this->admin)->delete(route('admin.staff.destroy', $staff));

    $response->assertRedirect();
    $this->assertDatabaseMissing('users', [
        'id' => $staff->id,
    ]);
});
