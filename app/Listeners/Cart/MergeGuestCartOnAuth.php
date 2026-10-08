<?php

declare(strict_types=1);

namespace App\Listeners\Cart;

use App\Models\User;
use App\Services\Cart\CartService;
use Illuminate\Auth\Events\Login;
use Illuminate\Auth\Events\Registered;

class MergeGuestCartOnAuth
{
    /**
     * Create the event listener.
     */
    public function __construct(
        private readonly CartService $cartService,
    ) {}

    /**
     * Handle the event.
     */
    public function handle(object $event): void
    {
        if (! ($event instanceof Login || $event instanceof Registered)) {
            return;
        }

        $session = request()->hasSession() ? request()->session() : null;
        if ($session === null) {
            return;
        }

        $guestSessionId = $session->pull('guest_cart_session_id');

        if (! is_string($guestSessionId) || empty($guestSessionId)) {
            return;
        }

        $user = $event->user;

        if ($user instanceof User) {
            $this->cartService->mergeGuestCartIntoUserCart($user, $guestSessionId);
        }
    }
}
