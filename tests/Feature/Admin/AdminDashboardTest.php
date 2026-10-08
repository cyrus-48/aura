<?php

declare(strict_types=1);

use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

test('guests are redirected to the login page from the admin dashboard', function (): void {
    $response = $this->get(route('admin.dashboard'));

    $response->assertRedirect(route('login'));
});

test('regular customers receive a 403 forbidden error when attempting to visit admin panel', function (): void {
    $customer = User::factory()->create();

    $response = $this->actingAs($customer)->get(route('admin.dashboard'));

    $response->assertForbidden();
});

test('administrators can access the admin dashboard with full operational data', function (): void {
    $admin = User::factory()->admin()->create();

    $response = $this->actingAs($admin)->get(route('admin.dashboard'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/Dashboard')
            ->has('dashboard.metrics')
            ->has('dashboard.recent_orders')
            ->has('dashboard.low_stock_items')
            ->has('dashboard.revenue_chart')
            ->has('dashboard.top_products')
            ->has('dashboard.sidebar_counts')
        );
});

test('managers can access the admin dashboard', function (): void {
    $manager = User::factory()->manager()->create();

    $response = $this->actingAs($manager)->get(route('admin.dashboard'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/Dashboard'));
});

test('support staff can access the admin dashboard', function (): void {
    $support = User::factory()->support()->create();

    $response = $this->actingAs($support)->get(route('admin.dashboard'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page->component('admin/Dashboard'));
});
