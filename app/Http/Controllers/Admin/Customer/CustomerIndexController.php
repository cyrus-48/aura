<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Customer;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CustomerIndexController extends Controller
{
    /**
     * Display a paginated listing of customers with aggregated metrics.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = User::query()
            ->where('role', UserRole::Customer)
            ->withCount('orders')
            ->withSum('orders', 'total');

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        $paginator = $query->latest('id')->paginate($perPage)->withQueryString();

        $paginator->through(fn (User $user) => [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'orders_count' => (int) $user->orders_count,
            'total_spend' => (float) ($user->orders_sum_total ?? 0),
            'formatted_total_spend' => '$'.number_format((float) ($user->orders_sum_total ?? 0), 2),
            'is_verified' => $user->email_verified_at !== null,
            'created_at' => $user->created_at?->format('M d, Y') ?? '',
        ]);

        $totalCustomers = User::where('role', UserRole::Customer)->count();
        $totalRevenue = (float) User::where('role', UserRole::Customer)->withSum('orders', 'total')->get()->sum('orders_sum_total');
        $averageLtv = $totalCustomers > 0 ? $totalRevenue / $totalCustomers : 0.0;

        return Inertia::render('admin/customers/Index', [
            'customers' => $paginator,
            'filters' => [
                'search' => $search,
                'per_page' => $perPage,
            ],
            'stats' => [
                'total_customers' => $totalCustomers,
                'total_revenue' => '$'.number_format($totalRevenue, 2),
                'average_ltv' => '$'.number_format($averageLtv, 2),
            ],
        ]);
    }
}
