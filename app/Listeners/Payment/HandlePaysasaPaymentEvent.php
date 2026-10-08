<?php

declare(strict_types=1);

namespace App\Listeners\Payment;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Events\PaymentConfirmed;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Paysasa\Payments\Events\PaymentFailed;
use Paysasa\Payments\Events\PaymentRefunded;
use Paysasa\Payments\Events\PaymentSuccessful;

class HandlePaysasaPaymentEvent
{
    /**
     * Handle payment successful event from Paysasa.
     */
    public function handleSuccessful(PaymentSuccessful $event): void
    {
        $reference = $event->payment->reference;

        if (empty($reference)) {
            return;
        }

        /** @var Order|null $order */
        $order = Order::query()->where('payment_reference', $reference)->first();

        if ($order === null) {
            Log::warning("Order not found for Paysasa reference: {$reference}");

            return;
        }

        if ($order->payment_status === PaymentStatus::Paid) {
            return;
        }

        $order->update([
            'payment_status' => PaymentStatus::Paid,
            'payment_reference' => $event->payment->provider_reference ?? $reference,
        ]);

        if ($order->canTransitionTo(OrderStatus::Confirmed)) {
            $order->transitionTo(OrderStatus::Confirmed);
        }

        PaymentConfirmed::dispatch($order);

        Log::channel('orders')->info("Order #{$order->order_number} confirmed via Paysasa event.");
    }

    /**
     * Handle payment failed event from Paysasa.
     */
    public function handleFailed(PaymentFailed $event): void
    {
        $reference = $event->payment->reference;

        if (empty($reference)) {
            return;
        }

        /** @var Order|null $order */
        $order = Order::query()->where('payment_reference', $reference)->first();

        if ($order !== null) {
            $order->update(['payment_status' => PaymentStatus::Failed]);
            Log::channel('orders')->warning("Order #{$order->order_number} marked failed via Paysasa event.");
        }
    }

    /**
     * Handle payment refunded event from Paysasa.
     */
    public function handleRefunded(PaymentRefunded $event): void
    {
        $reference = $event->payment->reference;

        if (empty($reference)) {
            return;
        }

        /** @var Order|null $order */
        $order = Order::query()->where('payment_reference', $reference)->first();

        if ($order !== null) {
            $order->update(['payment_status' => PaymentStatus::Refunded]);
            if ($order->canTransitionTo(OrderStatus::Refunded)) {
                $order->transitionTo(OrderStatus::Refunded);
            }
            Log::channel('orders')->info("Order #{$order->order_number} marked refunded via Paysasa event.");
        }
    }

    /**
     * Register listeners for subscriber.
     *
     * @return array<string, string>
     */
    public function subscribe(): array
    {
        return [
            PaymentSuccessful::class => 'handleSuccessful',
            PaymentFailed::class => 'handleFailed',
            PaymentRefunded::class => 'handleRefunded',
        ];
    }
}
