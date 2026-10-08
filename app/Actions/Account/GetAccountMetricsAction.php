<?php

declare(strict_types=1);

namespace App\Actions\Account;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Models\Order;
use App\Models\User;
use Illuminate\Support\Collection;

class GetAccountMetricsAction
{
    /**
     * Calculate summary metrics for customer account.
     *
     * @param  Collection<int, Order>  $orders
     * @return array{totalOrders: int, pendingOrders: int, deliveredOrders: int, lifetimeSpend: float}
     */
    public function execute(User $user, Collection $orders): array
    {
        return [
            'totalOrders' => $orders->count(),
            'pendingOrders' => $orders->whereIn('status', [OrderStatus::Pending, OrderStatus::Processing, OrderStatus::Confirmed])->count(),
            'deliveredOrders' => $orders->where('status', OrderStatus::Delivered)->count(),
            'lifetimeSpend' => (float) $orders->where('payment_status', PaymentStatus::Paid)->sum('total'),
        ];
    }
}
