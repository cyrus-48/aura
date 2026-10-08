<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Discount;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DiscountIndexController extends Controller
{
    /**
     * Display a listing of discount codes and promotions.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $status = $request->string('status')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = Discount::query();

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('code', 'like', "%{$search}%")
                    ->orWhere('description', 'like', "%{$search}%");
            });
        }

        if ($status === 'active') {
            $query->where('is_active', true)
                ->where(fn ($q) => $q->whereNull('expires_at')->orWhere('expires_at', '>', now()));
        } elseif ($status === 'expired') {
            $query->where(fn ($q) => $q->where('is_active', false)->orWhere('expires_at', '<=', now()));
        }

        $paginator = $query->latest('id')->paginate($perPage)->withQueryString();

        $paginator->through(fn (Discount $d) => [
            'id' => $d->id,
            'code' => $d->code,
            'type' => $d->type->value,
            'type_label' => $d->type->label(),
            'type_color' => $d->type->badgeClasses(),
            'value' => (float) $d->value,
            'formatted_value' => $d->formattedValue(),
            'min_order_amount' => $d->min_order_amount ? (float) $d->min_order_amount : null,
            'max_uses' => $d->max_uses,
            'uses_count' => $d->uses_count,
            'is_active' => $d->is_active,
            'is_valid' => $d->isValid(),
            'starts_at' => $d->starts_at?->format('Y-m-d') ?? null,
            'expires_at' => $d->expires_at?->format('Y-m-d') ?? null,
            'description' => $d->description,
            'created_at' => $d->created_at?->format('M d, Y') ?? '',
        ]);

        return Inertia::render('admin/discounts/Index', [
            'discounts' => $paginator,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'per_page' => $perPage,
            ],
            'stats' => [
                'total' => Discount::count(),
                'active' => Discount::where('is_active', true)->count(),
                'total_redemptions' => (int) Discount::sum('uses_count'),
            ],
        ]);
    }
}
