<?php

declare(strict_types=1);

namespace App\Http\Resources\Order;

use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin OrderItem
 */
class OrderItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $image = null;
        if ($this->relationLoaded('variant') && $this->variant?->relationLoaded('product')) {
            $image = $this->variant->product?->primary_image;
        }

        return [
            'id' => $this->id,
            'productVariantId' => $this->product_variant_id,
            'productName' => $this->product_name,
            'variantName' => $this->variant_name,
            'sku' => $this->sku,
            'unitPrice' => (float) $this->unit_price,
            'quantity' => $this->quantity,
            'totalPrice' => (float) $this->total_price,
            'total' => (float) $this->total_price,
            'image' => $image,
        ];
    }
}
