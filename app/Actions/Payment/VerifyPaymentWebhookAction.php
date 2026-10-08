<?php

declare(strict_types=1);

namespace App\Actions\Payment;

use App\Jobs\ProcessPaymentWebhookJob;
use App\Models\WebhookLog;
use Illuminate\Support\Facades\Log;

class VerifyPaymentWebhookAction
{
    /**
     * Ingest, log, verify, and dispatch the webhook payload to a queued job.
     * Adheres to Rule 14.
     *
     * @param  array<string, mixed>  $payload
     */
    public function execute(string $driver, array $payload, ?string $signature = null): bool
    {
        // Extract reference
        $reference = (string) (
            $payload['reference']
            ?? $payload['transaction_id']
            ?? $payload['BillRefNumber']
            ?? $payload['data']['reference']
            ?? ''
        );

        // Idempotency check: if reference already processed, ignore
        if (! empty($reference)) {
            $alreadyProcessed = WebhookLog::query()
                ->where('provider', $driver)
                ->where('reference', $reference)
                ->where('status', 'processed')
                ->exists();

            if ($alreadyProcessed) {
                Log::channel('webhooks')->info("Duplicate webhook received and ignored for reference [{$reference}]");

                return true;
            }
        }

        // Store raw payload in webhook_logs
        $log = WebhookLog::query()->create([
            'provider' => $driver,
            'reference' => ! empty($reference) ? $reference : null,
            'payload' => $payload,
            'status' => 'pending',
        ]);

        // Dispatch processing to queued job (Rule 14)
        ProcessPaymentWebhookJob::dispatch($log->id);

        Log::channel('webhooks')->info("Webhook logged and queued for provider [{$driver}], log #{$log->id}");

        return true;
    }
}
