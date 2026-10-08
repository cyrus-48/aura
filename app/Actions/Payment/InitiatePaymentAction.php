<?php

declare(strict_types=1);

namespace App\Actions\Payment;

use App\Enums\PaymentMethod;
use App\Models\Order;
use App\Services\Payment\PaymentService;

readonly class PaymentResult
{
    public function __construct(
        public bool $success,
        public string $status,
        public string $reference,
        public string $message,
        public ?string $redirectUrl = null
    ) {}
}

class InitiatePaymentAction
{
    public function __construct(
        private readonly PaymentService $paymentService
    ) {}

    /**
     * Initiate payment for the order through the specified driver.
     * Adheres to Rule 2.
     *
     * @param  array<string, mixed>  $paymentData
     */
    public function execute(Order $order, PaymentMethod $method, array $paymentData = []): PaymentResult
    {
        $res = $this->paymentService->initiatePayment($order, $method, $paymentData);

        return new PaymentResult(
            success: $res['success'],
            status: $res['status'],
            reference: $res['reference'],
            message: $res['message'],
            redirectUrl: $res['redirectUrl'] ?? null
        );
    }
}
