<?php

declare(strict_types=1);

namespace App\Services\Payment;

use App\Enums\OrderStatus;
use App\Enums\PaymentMethod;
use App\Enums\PaymentStatus;
use App\Events\PaymentConfirmed;
use App\Models\Order;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;
use Paysasa\Payments\Facades\Payment;
use Throwable;

class PaymentService
{
    /**
     * Initiate payment for an order through the configured Paysasa gateway driver.
     *
     * @param  array<string, mixed>  $paymentData
     * @return array{
     *     success: bool,
     *     status: string,
     *     reference: string,
     *     message: string,
     *     redirectUrl: ?string
     * }
     */
    public function initiatePayment(Order $order, PaymentMethod $method, array $paymentData = []): array
    {
        $reference = 'PAY-'.Str::upper(Str::random(10));

        $order->update([
            'payment_method' => $method,
            'payment_reference' => $reference,
        ]);

        if ($method === PaymentMethod::Cod) {
            return [
                'success' => true,
                'status' => 'pending',
                'reference' => $reference,
                'message' => 'Cash on delivery selected. Payment will be collected upon delivery.',
                'redirectUrl' => null,
            ];
        }

        return $this->processGatewayCharge($order, $method, $reference, $paymentData);
    }

    /**
     * Process charge through the Paysasa unified gateway driver.
     *
     * @param  array<string, mixed>  $paymentData
     * @return array{
     *     success: bool,
     *     status: string,
     *     reference: string,
     *     message: string,
     *     redirectUrl: ?string
     * }
     */
    private function processGatewayCharge(Order $order, PaymentMethod $method, string $reference, array $paymentData): array
    {
        $driver = $method->value;
        $phone = $this->normalizePhone(
            $paymentData['mpesa_phone']
            ?? $paymentData['airtel_phone']
            ?? $paymentData['phone']
            ?? $order->phone
        );

        try {
            $builder = Payment::driver($driver)
                ->amount((float) $order->total)
                ->currency('KES')
                ->reference($reference)
                ->description("Aura & Oak Order #{$order->order_number}")
                ->metadata([
                    'order_id' => $order->id,
                    'order_number' => $order->order_number,
                    'payment_method' => $method->value,
                ]);

            if (! empty($phone)) {
                $builder->phone($phone);
            }

            if (! empty($paymentData['card_token'])) {
                $builder->cardToken((string) $paymentData['card_token']);
            }

            $response = $builder->charge();

            if ($response->successful()) {
                $providerRef = $response->providerReference() ?? $reference;
                $order->update([
                    'payment_status' => PaymentStatus::Paid,
                    'payment_reference' => $providerRef,
                ]);

                if ($order->canTransitionTo(OrderStatus::Confirmed)) {
                    $order->transitionTo(OrderStatus::Confirmed);
                }

                PaymentConfirmed::dispatch($order);

                return [
                    'success' => true,
                    'status' => 'paid',
                    'reference' => $providerRef,
                    'message' => $response->message ?? 'Payment processed and verified successfully.',
                    'redirectUrl' => null,
                ];
            }

            if ($response->pending()) {
                $order->update([
                    'payment_status' => PaymentStatus::Pending,
                ]);

                return [
                    'success' => true,
                    'status' => 'pending',
                    'reference' => $reference,
                    'message' => $response->message ?? "Payment prompt initiated for {$method->label()}.",
                    'redirectUrl' => $response->metadata['redirect_url'] ?? null,
                ];
            }

            $order->update([
                'payment_status' => PaymentStatus::Failed,
            ]);

            return [
                'success' => false,
                'status' => 'failed',
                'reference' => $reference,
                'message' => $response->message ?? 'Payment was declined or failed by provider.',
                'redirectUrl' => null,
            ];
        } catch (Throwable $e) {
            Log::error("Paysasa charge exception for Order #{$order->order_number} [{$driver}]: {$e->getMessage()}", [
                'exception' => $e,
            ]);

            return [
                'success' => false,
                'status' => 'failed',
                'reference' => $reference,
                'message' => 'Payment gateway communication failure. Please retry.',
                'redirectUrl' => null,
            ];
        }
    }

    /**
     * Process an incoming webhook callback idempotently.
     *
     * @param  array<string, mixed>  $payload
     */
    public function handleWebhook(string $driver, array $payload, ?string $signature = null): bool
    {
        Log::info("Payment webhook received for driver [{$driver}]", $payload);

        $reference = (string) (
            $payload['reference']
            ?? $payload['transaction_id']
            ?? $payload['BillRefNumber']
            ?? $payload['data']['reference']
            ?? ''
        );

        if (empty($reference)) {
            return false;
        }

        /** @var Order|null $order */
        $order = Order::query()->where('payment_reference', $reference)->first();

        if ($order === null) {
            Log::warning("Order not found for payment reference: {$reference}");

            return false;
        }

        // Idempotency: If already paid or confirmed, return true without double processing
        if ($order->payment_status === PaymentStatus::Paid) {
            return true;
        }

        $isSuccess = (bool) (
            ($payload['success'] ?? false)
            || (($payload['status'] ?? '') === 'completed')
            || (($payload['status'] ?? '') === 'successful')
            || (($payload['ResultCode'] ?? -1) === 0)
        );

        if ($isSuccess) {
            $order->update([
                'payment_status' => PaymentStatus::Paid,
            ]);

            if ($order->status === OrderStatus::Pending) {
                $order->transitionTo(OrderStatus::Confirmed);
            }

            PaymentConfirmed::dispatch($order);

            return true;
        }

        $order->update([
            'payment_status' => PaymentStatus::Failed,
        ]);

        return true;
    }

    /**
     * Initiate a refund through Paysasa for an order.
     *
     * @return array{success: bool, message: string}
     */
    public function initiateRefund(Order $order, ?float $amount = null, ?string $reason = null): array
    {
        $driver = $order->payment_method?->value ?? 'mpesa';
        $refundAmount = $amount ?? (float) $order->total;

        try {
            $response = Payment::driver($driver)
                ->amount($refundAmount)
                ->refund(
                    transactionId: (string) $order->payment_reference,
                    reason: $reason ?? 'Storefront return authorization'
                );

            if ($response->successful()) {
                $order->update([
                    'payment_status' => PaymentStatus::Refunded,
                ]);

                if ($order->canTransitionTo(OrderStatus::Refunded)) {
                    $order->transitionTo(OrderStatus::Refunded);
                }

                return [
                    'success' => true,
                    'message' => $response->message ?? 'Refund processed successfully.',
                ];
            }

            return [
                'success' => false,
                'message' => $response->message ?? 'Refund declined by provider.',
            ];
        } catch (Throwable $e) {
            Log::error("Paysasa refund error for order #{$order->order_number}: {$e->getMessage()}");

            return [
                'success' => false,
                'message' => $e->getMessage(),
            ];
        }
    }

    /**
     * Normalize Kenyan phone number for mobile money gateways.
     */
    private function normalizePhone(?string $phone): ?string
    {
        if (empty($phone)) {
            return null;
        }

        $cleaned = preg_replace('/\D/', '', $phone) ?? '';

        if (str_starts_with($cleaned, '07') || str_starts_with($cleaned, '01')) {
            return '254'.substr($cleaned, 1);
        }

        if (str_starts_with($cleaned, '254')) {
            return $cleaned;
        }

        return $cleaned;
    }
}
