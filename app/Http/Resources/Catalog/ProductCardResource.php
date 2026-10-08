<?php

declare(strict_types=1);

namespace App\Http\Resources\Catalog;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Product
 */
class ProductCardResource extends JsonResource
{
    /**
     * Transform the resource into an array for catalog card presentation.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'slug' => $this->slug,
            'tagline' => $this->short_description,
            'basePrice' => (float) $this->base_price,
            'price' => (float) $this->base_price,
            'comparePrice' => $this->compare_at_price !== null ? (float) $this->compare_at_price : null,
            'compareAtPrice' => $this->compare_at_price !== null ? (float) $this->compare_at_price : null,
            'primaryImage' => $this->primary_image,
            'secondaryImage' => $this->gallery_images[0] ?? null,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ] : null,
            'categoryName' => $this->category?->name,
            'badge' => $this->badge,
            'isSustainable' => (bool) ($this->badge === 'Sustainable' || str_contains(strtolower((string) $this->materials), 'organic')),
            'hasStock' => $this->inStock(),
            'colors' => $this->relationLoaded('variants')
                ? $this->variants->pluck('color_hex')->filter()->unique()->values()->all()
                : [],
        ];
    }
}
