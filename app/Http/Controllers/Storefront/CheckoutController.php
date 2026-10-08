<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Actions\Order\PlaceOrderAction;
use App\Actions\Payment\InitiatePaymentAction;
use App\Enums\PaymentMethod;
use App\Exceptions\CartEmptyException;
use App\Exceptions\InsufficientStockException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Checkout\CheckoutRequest;
use App\Http\Resources\Cart\CartResource;
use App\Http\Resources\Order\AddressResource;
use App\Services\Cart\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CheckoutController extends Controller
{
    /**
     * Display the 3-step checkout form.
     */
    public function create(Request $request, CartService $cartService): Response|RedirectResponse
    {
        $cart = $cartService->getOrCreateCart($request);
        $cart->load(['items.variant.product']);

        if ($cart->items->isEmpty()) {
            return to_route('cart.index')->with('warning', 'Your shopping bag is empty.');
        }

        $user = $request->user();
        $defaultAddress = $user?->addresses()->where('is_default', true)->first()
            ?? $user?->addresses()->latest()->first();

        return Inertia::render('Checkout', [
            'cart' => new CartResource($cart),
            'defaultAddress' => $defaultAddress ? new AddressResource($defaultAddress) : null,
        ]);
    }

    /**
     * Place an order and initiate payment.
     */
    public function store(
        CheckoutRequest $request,
        CartService $cartService,
        PlaceOrderAction $placeOrder,
        InitiatePaymentAction $initiatePayment
    ): RedirectResponse {
        $cart = $cartService->getOrCreateCart($request);

        try {
            $order = $placeOrder->execute($cart, $request->validated(), $request->user());
            $method = PaymentMethod::from((string) $request->validated('payment_method'));
            $payment = $initiatePayment->execute($order, $method, $request->validated());

            return to_route('orders.confirmation', ['order' => $order->order_number])
                ->with('paymentMessage', $payment->message);
        } catch (CartEmptyException) {
            return to_route('cart.index')->withErrors(['cart' => 'Your shopping bag is empty.']);
        } catch (InsufficientStockException $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }
    }
}
