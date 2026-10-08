<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Payment;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Paysasa\Payments\Models\Payment;

class PaymentIndexController extends Controller
{
    /**
     * Display a listing of payment transactions and gateway logs.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $status = $request->string('status')->trim()->toString();
        $provider = $request->string('provider')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = Payment::query();

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('reference', 'like', "%{$search}%")
                    ->orWhere('provider_reference', 'like', "%{$search}%")
                    ->orWhere('customer_name', 'like', "%{$search}%")
                    ->orWhere('customer_email', 'like', "%{$search}%")
                    ->orWhere('customer_phone', 'like', "%{$search}%");
            });
        }

        if ($status !== '') {
            $query->where('status', $status);
        }

        if ($provider !== '') {
            $query->where('provider', $provider);
        }

        $paginator = $query->latest('id')->paginate($perPage)->withQueryString();

        $paginator->through(fn (Payment $p) => [
            'id' => $p->id,
            'uuid' => $p->uuid,
            'reference' => $p->reference,
            'provider' => $p->provider?->value ?? (string) $p->provider,
            'provider_name' => $p->provider?->label() ?? strtoupper((string) $p->provider),
            'provider_reference' => $p->provider_reference ?? 'Pending',
            'receipt_number' => $p->receipt_number,
            'amount' => (float) ($p->amount_minor / 100),
            'formatted_amount' => '$'.number_format((float) ($p->amount_minor / 100), 2),
            'currency' => $p->currency,
            'status' => $p->status?->value ?? (string) $p->status,
            'customer_name' => $p->customer_name ?? 'Guest Client',
            'customer_email' => $p->customer_email,
            'customer_phone' => $p->customer_phone,
            'failure_reason' => $p->failure_reason,
            'metadata' => $p->metadata,
            'created_at' => $p->created_at?->format('M d, Y H:i') ?? '',
        ]);

        $totalCompletedMinor = Payment::whereIn('status', ['successful', 'completed'])->sum('amount_minor');
        $successfulCount = Payment::whereIn('status', ['successful', 'completed'])->count();
        $failedCount = Payment::where('status', 'failed')->count();

        return Inertia::render('admin/payments/Index', [
            'payments' => $paginator,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'provider' => $provider,
                'per_page' => $perPage,
            ],
            'stats' => [
                'total_volume' => '$'.number_format((float) ($totalCompletedMinor / 100), 2),
                'successful_count' => $successfulCount,
                'failed_count' => $failedCount,
            ],
        ]);
    }
}
