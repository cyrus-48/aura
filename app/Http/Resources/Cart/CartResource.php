<?php

declare(strict_types=1);

namespace App\Http\Resources\Cart;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Cart
 */
class CartResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $subtotal = $this->subtotal();
        $freeShippingThreshold = 99.00;
        $isFreeShipping = $subtotal >= $freeShippingThreshold;
        $shipping = $isFreeShipping || $subtotal === 0.0 ? 0.00 : 15.00;
        $tax = round($subtotal * 0.16, 2);
        $total = round($subtotal + $shipping + $tax, 2);

        return [
            'id' => $this->id,
            'items' => CartItemResource::collection($this->whenLoaded('items', $this->items, fn () => $this->items()->with(['variant.product'])->get())),
            'subtotal' => $subtotal,
            'shipping' => $shipping,
            'tax' => $tax,
            'total' => $total,
            'totalItems' => $this->totalItems(),
            'itemsCount' => $this->totalItems(),
            'totalQuantity' => $this->totalItems(),
            'isFreeShippingEligible' => $isFreeShipping,
            'freeShippingThresholdRemaining' => max(0.00, round($freeShippingThreshold - $subtotal, 2)),
        ];
    }
}
