<?php

declare(strict_types=1);

namespace App\Services\Cart;

use App\Exceptions\InsufficientStockException;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\ProductVariant;
use App\Models\User;
use Illuminate\Http\Request;

class CartService
{
    /**
     * Resolve the active cart for either authenticated user or guest session.
     */
    public function getOrCreateCart(Request $request): Cart
    {
        $user = $request->user();

        if ($user !== null) {
            /** @var Cart $cart */
            $cart = Cart::firstOrCreate(['user_id' => $user->id]);
            $cart->loadMissing(['items.variant.product']);

            return $cart;
        }

        $sessionId = $request->session()->getId();
        if (empty($sessionId)) {
            $request->session()->start();
            $sessionId = $request->session()->getId();
        }

        if (! $request->session()->has('guest_cart_session_id')) {
            $request->session()->put('guest_cart_session_id', $sessionId);
        }

        /** @var Cart $cart */
        $cart = Cart::firstOrCreate(['session_id' => $sessionId]);
        $cart->loadMissing(['items.variant.product']);

        return $cart;
    }

    /**
     * Add a variant with requested quantity to the cart.
     *
     * @throws InsufficientStockException
     */
    public function addItem(Cart $cart, int $variantId, int $quantity = 1): CartItem
    {
        $variant = ProductVariant::query()->with('product')->findOrFail($variantId);

        /** @var CartItem|null $existingItem */
        $existingItem = $cart->items()->where('product_variant_id', $variantId)->first();

        $targetQuantity = ($existingItem?->quantity ?? 0) + $quantity;

        if ($targetQuantity > $variant->stock_count) {
            throw new InsufficientStockException(
                "Only {$variant->stock_count} item(s) available for {$variant->product->name} ({$variant->color} / {$variant->size})."
            );
        }

        if ($existingItem !== null) {
            $existingItem->update(['quantity' => $targetQuantity]);

            return $existingItem->fresh();
        }

        /** @var CartItem $newItem */
        $newItem = $cart->items()->create([
            'product_variant_id' => $variantId,
            'quantity' => $quantity,
        ]);

        return $newItem;
    }

    /**
     * Update the quantity of a cart line item.
     *
     * @throws InsufficientStockException
     */
    public function updateItemQuantity(CartItem $item, int $quantity): ?CartItem
    {
        if ($quantity <= 0) {
            $item->delete();

            return null;
        }

        $variant = $item->variant;
        if ($variant !== null && $quantity > $variant->stock_count) {
            throw new InsufficientStockException(
                "Cannot set quantity to {$quantity}. Only {$variant->stock_count} in stock."
            );
        }

        $item->update(['quantity' => $quantity]);

        return $item->fresh();
    }

    /**
     * Remove an item from the cart.
     */
    public function removeItem(CartItem $item): void
    {
        $item->delete();
    }

    /**
     * Empty all items from the cart.
     */
    public function clearCart(Cart $cart): void
    {
        $cart->items()->delete();
    }

    /**
     * Merge a guest session cart into an authenticated user's cart.
     */
    public function mergeGuestCartIntoUserCart(User $user, string $sessionId): void
    {
        $guestCart = Cart::query()
            ->where('session_id', $sessionId)
            ->with(['items.variant'])
            ->first();

        if ($guestCart === null || $guestCart->items->isEmpty()) {
            return;
        }

        /** @var Cart $userCart */
        $userCart = Cart::firstOrCreate(['user_id' => $user->id]);

        foreach ($guestCart->items as $guestItem) {
            $variant = $guestItem->variant;
            if ($variant === null) {
                continue;
            }

            /** @var CartItem|null $existingItem */
            $existingItem = $userCart->items()
                ->where('product_variant_id', $guestItem->product_variant_id)
                ->first();

            $newQuantity = min(
                ($existingItem?->quantity ?? 0) + $guestItem->quantity,
                $variant->stock_count
            );

            if ($existingItem !== null) {
                $existingItem->update(['quantity' => $newQuantity]);
            } else {
                $userCart->items()->create([
                    'product_variant_id' => $guestItem->product_variant_id,
                    'quantity' => $newQuantity,
                ]);
            }
        }

        $guestCart->items()->delete();
        $guestCart->delete();
    }
}
