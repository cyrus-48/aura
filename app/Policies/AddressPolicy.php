<?php

declare(strict_types=1);

namespace App\Policies;

use App\Models\Address;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class AddressPolicy
{
    /**
     * Admin bypass for all address abilities.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view the address.
     */
    public function view(User $user, Address $address): Response
    {
        return $user->id === $address->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to view this address.');
    }

    /**
     * Determine whether the user can update the address.
     */
    public function update(User $user, Address $address): Response
    {
        return $user->id === $address->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to update this address.');
    }

    /**
     * Determine whether the user can delete the address.
     */
    public function delete(User $user, Address $address): Response
    {
        return $user->id === $address->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to delete this address.');
    }
}
