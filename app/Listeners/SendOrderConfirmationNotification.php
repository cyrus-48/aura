<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\OrderPlaced;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendOrderConfirmationNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public string $queue = 'emails';

    /**
     * Handle the event.
     */
    public function handle(OrderPlaced $event): void
    {
        Log::channel('orders')->info("Order confirmation queued for order #{$event->order->order_number} to {$event->order->email}");
    }
}
