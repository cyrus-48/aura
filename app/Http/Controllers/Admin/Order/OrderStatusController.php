<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Order;

use App\Enums\OrderStatus;
use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderNote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class OrderStatusController extends Controller
{
    /**
     * Update order fulfillment status.
     */
    public function __invoke(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::enum(OrderStatus::class)],
        ]);

        $newStatus = OrderStatus::from((string) $validated['status']);
        $oldLabel = $order->status->label();

        $order->update(['status' => $newStatus]);

        OrderNote::create([
            'order_id' => $order->id,
            'user_id' => $request->user()?->id,
            'note' => "Status changed from {$oldLabel} to {$newStatus->label()}.",
        ]);

        return redirect()->back()
            ->with('success', "Order #{$order->order_number} status updated to {$newStatus->label()}.");
    }
}
