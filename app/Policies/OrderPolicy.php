<?php

declare(strict_types=1);

namespace App\Policies;

use App\Enums\OrderStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class OrderPolicy
{
    /**
     * Admin bypass for all order abilities.
     */
    public function before(User $user, string $ability): ?bool
    {
        if ($user->isAdmin()) {
            return true;
        }

        return null;
    }

    /**
     * Determine whether the user can view the order.
     */
    public function view(User $user, Order $order): Response
    {
        return $user->id === $order->user_id
            ? Response::allow()
            : Response::deny('You do not have permission to view this order.');
    }

    /**
     * Determine whether the user can cancel the order.
     */
    public function cancel(User $user, Order $order): Response
    {
        if ($user->id !== $order->user_id) {
            return Response::deny('You do not have permission to cancel this order.');
        }

        return $order->status->canTransitionTo(OrderStatus::Cancelled)
            ? Response::allow()
            : Response::deny('This order cannot be cancelled in its current state.');
    }
}
