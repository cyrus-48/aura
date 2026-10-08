<?php

declare(strict_types=1);

namespace App\Http\Resources\Catalog;

use App\Models\ProductVariant;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin ProductVariant
 */
class ProductVariantResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'sku' => $this->sku,
            'color' => $this->color,
            'colorHex' => $this->color_hex,
            'size' => $this->size,
            'price' => $this->finalPrice(),
            'finalPrice' => $this->finalPrice(),
            'priceAdjustment' => (float) $this->price_adjustment,
            'material' => null,
            'stockCount' => $this->stock_count,
            'inStock' => $this->inStock(),
        ];
    }
}
