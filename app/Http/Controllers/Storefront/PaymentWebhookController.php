<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Actions\Payment\VerifyPaymentWebhookAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PaymentWebhookController extends Controller
{
    /**
     * Handle incoming payment gateway callback/webhook.
     */
    public function __invoke(string $driver, Request $request, VerifyPaymentWebhookAction $action): JsonResponse
    {
        $signature = $request->header('X-Signature') ?? $request->header('Stripe-Signature');

        $action->execute($driver, $request->all(), $signature);

        return response()->json(['status' => 'received']);
    }
}
