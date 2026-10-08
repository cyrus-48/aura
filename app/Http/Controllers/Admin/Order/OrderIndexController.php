<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Order;

use App\Enums\OrderStatus;
use App\Enums\PaymentStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class OrderIndexController extends Controller
{
    /**
     * Display a listing of orders with filters and statuses.
     */
    public function __invoke(Request $request): Response
    {
        $search = $request->string('search')->trim()->toString();
        $status = $request->string('status')->trim()->toString();
        $paymentStatus = $request->string('payment_status')->trim()->toString();
        $perPage = min(max($request->integer('per_page', 10), 5), 100);

        $query = Order::query()->with(['shippingAddress', 'items']);

        if ($search !== '') {
            $query->where(function (Builder $q) use ($search): void {
                $q->where('order_number', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")
                    ->orWhere('phone', 'like', "%{$search}%")
                    ->orWhereHas('shippingAddress', fn (Builder $aq) => $aq->where('first_name', 'like', "%{$search}%")->orWhere('last_name', 'like', "%{$search}%"));
            });
        }

        if ($status !== '' && OrderStatus::tryFrom($status) !== null) {
            $query->where('status', $status);
        }

        if ($paymentStatus !== '' && PaymentStatus::tryFrom($paymentStatus) !== null) {
            $query->where('payment_status', $paymentStatus);
        }

        $paginator = $query->latest('id')->paginate($perPage)->withQueryString();

        $paginator->through(fn (Order $order) => [
            'id' => $order->id,
            'order_number' => $order->order_number,
            'customer_name' => $order->shippingAddress?->full_name ?? 'Guest Client',
            'customer_email' => $order->email,
            'items_count' => $order->items->sum('quantity'),
            'total' => (float) $order->total,
            'formatted_total' => '$'.number_format((float) $order->total, 2),
            'payment_method' => $order->payment_method->label(),
            'payment_status' => $order->payment_status->value,
            'payment_status_label' => $order->payment_status->label(),
            'payment_status_color' => $order->payment_status->badgeClasses(),
            'status' => $order->status->value,
            'status_label' => $order->status->label(),
            'status_color' => $order->status->badgeClasses(),
            'created_at' => $order->created_at?->format('M d, Y') ?? '',
        ]);

        return Inertia::render('admin/orders/Index', [
            'orders' => $paginator,
            'filters' => [
                'search' => $search,
                'status' => $status,
                'payment_status' => $paymentStatus,
                'per_page' => $perPage,
            ],
            'counts' => [
                'total' => Order::count(),
                'pending' => Order::where('status', OrderStatus::Pending)->count(),
                'processing' => Order::where('status', OrderStatus::Processing)->count(),
            ],
        ]);
    }
}
