<?php

declare(strict_types=1);

namespace App\Http\Resources\Cart;

use App\Models\CartItem;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin CartItem
 */
class CartItemResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $variant = $this->variant;
        $product = $variant?->product;

        return [
            'id' => $this->id,
            'quantity' => $this->quantity,
            'unitPrice' => (float) $this->unitPrice(),
            'lineTotal' => (float) $this->totalPrice(),
            'product' => [
                'id' => $product?->id ?? 0,
                'name' => $product?->name ?? 'Artisanal Piece',
                'slug' => $product?->slug ?? '',
                'primaryImage' => $product?->primary_image,
            ],
            'variant' => $variant ? [
                'id' => $variant->id,
                'sku' => $variant->sku,
                'color' => $variant->color,
                'size' => $variant->size,
                'material' => null,
                'stockCount' => $variant->stock_count,
            ] : null,
            'productVariantId' => $this->product_variant_id,
            'productId' => $product?->id,
            'name' => $product?->name ?? 'Artisanal Piece',
            'slug' => $product?->slug ?? '',
            'primaryImage' => $product?->primary_image ?? '',
            'color' => $variant?->color,
            'colorHex' => $variant?->color_hex,
            'size' => $variant?->size,
            'stockCount' => $variant?->stock_count ?? 0,
            'inStock' => $variant ? $variant->inStock() : false,
        ];
    }
}
