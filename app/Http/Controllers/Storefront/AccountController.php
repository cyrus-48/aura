<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Actions\Account\GetAccountMetricsAction;
use App\Actions\Order\CancelOrderAction;
use App\Http\Controllers\Controller;
use App\Http\Resources\Account\UserProfileResource;
use App\Http\Resources\Order\AddressResource;
use App\Http\Resources\Order\OrderResource;
use App\Models\Order;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AccountController extends Controller
{
    /**
     * Display the authenticated customer account dashboard.
     */
    public function index(Request $request, GetAccountMetricsAction $getMetrics): Response
    {
        /** @var User $user */
        $user = $request->user();

        $orders = $user->orders()->with(['items.variant.product', 'shippingAddress'])->latest('id')->get();
        $addresses = $user->addresses()->latest('id')->get();

        return Inertia::render('Account', [
            'user' => new UserProfileResource($user),
            'metrics' => $getMetrics->execute($user, $orders),
            'orders' => OrderResource::collection($orders),
            'addresses' => AddressResource::collection($addresses),
        ]);
    }

    /**
     * Cancel an existing customer order.
     */
    public function cancelOrder(Request $request, Order $order, CancelOrderAction $cancelOrder): RedirectResponse
    {
        $this->authorize('cancel', $order);

        $cancelOrder->execute($order, (string) $request->input('reason', 'Cancelled by customer'));

        return back()->with('success', 'Order #'.$order->order_number.' has been cancelled.');
    }
}
