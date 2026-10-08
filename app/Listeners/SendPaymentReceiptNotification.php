<?php

declare(strict_types=1);

namespace App\Listeners;

use App\Events\PaymentConfirmed;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Support\Facades\Log;

class SendPaymentReceiptNotification implements ShouldQueue
{
    use InteractsWithQueue;

    public string $queue = 'emails';

    /**
     * Handle the event.
     */
    public function handle(PaymentConfirmed $event): void
    {
        Log::channel('payments')->info("Payment receipt notification queued for order #{$event->order->order_number}");
    }
}
