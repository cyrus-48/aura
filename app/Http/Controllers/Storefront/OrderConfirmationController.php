<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Resources\Order\OrderResource;
use App\Models\Order;
use Inertia\Inertia;
use Inertia\Response;

class OrderConfirmationController extends Controller
{
    /**
     * Display the order confirmation page.
     */
    public function show(Order $order): Response
    {
        $order->loadMissing(['items.variant.product', 'shippingAddress']);

        return Inertia::render('OrderConfirmation', [
            'order' => new OrderResource($order),
        ]);
    }
}
