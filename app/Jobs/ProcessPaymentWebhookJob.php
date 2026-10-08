<?php

declare(strict_types=1);

namespace App\Jobs;

use App\Models\WebhookLog;
use App\Services\Payment\PaymentService;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Log;
use Throwable;

class ProcessPaymentWebhookJob implements ShouldQueue
{
    use Queueable;

    public int $tries = 3;

    public int $backoff = 10;

    public int $timeout = 60;

    public function __construct(
        public int $webhookLogId
    ) {
        $this->onQueue('webhooks');
    }

    /**
     * Execute the job.
     * Adheres to Rule 14 and Rule 15.
     */
    public function handle(PaymentService $paymentService): void
    {
        /** @var WebhookLog|null $log */
        $log = WebhookLog::query()->find($this->webhookLogId);

        if ($log === null || $log->status === 'processed') {
            return;
        }

        $success = $paymentService->handleWebhook(
            driver: $log->provider,
            payload: $log->payload
        );

        $log->update([
            'status' => $success ? 'processed' : 'failed',
            'processed_at' => now(),
        ]);

        Log::channel('webhooks')->info("Processed webhook #{$log->id} for provider [{$log->provider}] with status [{$log->status}]");
    }

    /**
     * Handle a job failure.
     * Adheres to Rule 15.
     */
    public function failed(Throwable $exception): void
    {
        Log::channel('webhooks')->error("Webhook processing job failed for log #{$this->webhookLogId}: {$exception->getMessage()}", [
            'webhook_log_id' => $this->webhookLogId,
            'exception' => $exception,
        ]);

        WebhookLog::query()->where('id', $this->webhookLogId)->update([
            'status' => 'failed',
        ]);
    }
}
