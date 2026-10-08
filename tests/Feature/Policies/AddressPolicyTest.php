<?php

declare(strict_types=1);

namespace Tests\Feature\Policies;

use App\Models\Address;
use App\Models\User;
use App\Policies\AddressPolicy;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('user can view, update, and delete their own address', function (): void {
    $user = User::factory()->create();
    $address = Address::create([
        'user_id' => $user->id,
        'type' => 'shipping',
        'first_name' => 'Kariuki',
        'last_name' => 'Wanjiku',
        'email' => $user->email,
        'phone' => '+254711223344',
        'address_line_1' => '44 Muthaiga Rd',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
    ]);

    $policy = new AddressPolicy;

    expect($policy->view($user, $address)->allowed())->toBeTrue()
        ->and($policy->update($user, $address)->allowed())->toBeTrue()
        ->and($policy->delete($user, $address)->allowed())->toBeTrue();
});

test('user cannot view or modify someone elses address', function (): void {
    $owner = User::factory()->create();
    $stranger = User::factory()->create();
    $address = Address::create([
        'user_id' => $owner->id,
        'type' => 'shipping',
        'first_name' => 'Kariuki',
        'last_name' => 'Wanjiku',
        'email' => $owner->email,
        'phone' => '+254711223344',
        'address_line_1' => '44 Muthaiga Rd',
        'city' => 'Nairobi',
        'postal_code' => '00100',
        'country' => 'Kenya',
    ]);

    $policy = new AddressPolicy;

    expect($policy->view($stranger, $address)->allowed())->toBeFalse()
        ->and($policy->update($stranger, $address)->allowed())->toBeFalse()
        ->and($policy->delete($stranger, $address)->allowed())->toBeFalse();
});

test('admin can bypass address policy via before method', function (): void {
    $admin = User::factory()->admin()->create();
    $policy = new AddressPolicy;

    expect($policy->before($admin, 'view'))->toBeTrue()
        ->and($policy->before($admin, 'update'))->toBeTrue()
        ->and($policy->before($admin, 'delete'))->toBeTrue();
});
