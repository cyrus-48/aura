<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Order;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderNote;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class OrderNoteController extends Controller
{
    /**
     * Add an internal staff note to the order.
     */
    public function __invoke(Request $request, Order $order): RedirectResponse
    {
        $validated = $request->validate([
            'note' => ['required', 'string', 'max:2000'],
        ]);

        OrderNote::create([
            'order_id' => $order->id,
            'user_id' => $request->user()?->id,
            'note' => $validated['note'],
        ]);

        return redirect()->back()
            ->with('success', 'Internal note added to order.');
    }
}
