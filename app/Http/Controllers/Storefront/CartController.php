<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Exceptions\InsufficientStockException;
use App\Http\Controllers\Controller;
use App\Http\Requests\Cart\AddToCartRequest;
use App\Http\Requests\Cart\UpdateCartItemRequest;
use App\Http\Resources\Cart\CartResource;
use App\Models\CartItem;
use App\Services\Cart\CartService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CartController extends Controller
{
    /**
     * Display the shopping cart page.
     */
    public function index(Request $request, CartService $cartService): Response
    {
        $cart = $cartService->getOrCreateCart($request);
        $cart->load(['items.variant.product.category']);

        return Inertia::render('Cart', [
            'cart' => new CartResource($cart),
        ]);
    }

    /**
     * Add an item to the shopping cart.
     */
    public function store(AddToCartRequest $request, CartService $cartService): RedirectResponse
    {
        $cart = $cartService->getOrCreateCart($request);

        try {
            $cartService->addItem($cart, $request->variantId(), $request->quantity());

            return back()->with('success', 'Item added to your shopping bag.');
        } catch (InsufficientStockException $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }
    }

    /**
     * Update the quantity of a cart line item.
     */
    public function update(UpdateCartItemRequest $request, CartItem $item, CartService $cartService): RedirectResponse
    {
        $cart = $cartService->getOrCreateCart($request);
        abort_unless($item->cart_id === $cart->id, 403);

        try {
            $cartService->updateItemQuantity($item, $request->quantity());

            return back()->with('success', 'Cart updated.');
        } catch (InsufficientStockException $e) {
            return back()->withErrors(['stock' => $e->getMessage()]);
        }
    }

    /**
     * Remove an item from the shopping cart.
     */
    public function destroy(Request $request, CartItem $item, CartService $cartService): RedirectResponse
    {
        $cart = $cartService->getOrCreateCart($request);
        abort_unless($item->cart_id === $cart->id, 403);

        $cartService->removeItem($item);

        return back()->with('success', 'Item removed from bag.');
    }
}
