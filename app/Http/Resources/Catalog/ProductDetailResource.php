<?php

declare(strict_types=1);

namespace App\Http\Resources\Catalog;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Product
 */
class ProductDetailResource extends JsonResource
{
    /**
     * Transform the resource into an array for product detail presentation.
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
            'description' => $this->full_description ?? $this->short_description ?? '',
            'shortDescription' => $this->short_description,
            'fullDescription' => $this->full_description,
            'basePrice' => (float) $this->base_price,
            'comparePrice' => $this->compare_at_price !== null ? (float) $this->compare_at_price : null,
            'compareAtPrice' => $this->compare_at_price !== null ? (float) $this->compare_at_price : null,
            'category' => $this->category ? [
                'id' => $this->category->id,
                'name' => $this->category->name,
                'slug' => $this->category->slug,
            ] : null,
            'media' => [
                'primaryImage' => $this->primary_image,
                'gallery' => $this->gallery_images ?? [],
            ],
            'specs' => [
                'dimensions' => 'Standard Studio Cut',
                'materialsCare' => $this->materials ? "{$this->materials}. {$this->care_instructions}" : ($this->care_instructions ?? 'Gentle hand wash recommended.'),
                'origin' => 'Crafted in Kenya',
            ],
            'primaryImage' => $this->primary_image,
            'galleryImages' => $this->gallery_images ?? [],
            'materials' => $this->materials,
            'careInstructions' => $this->care_instructions,
            'badge' => $this->badge,
            'rating' => (float) $this->rating,
            'reviewsCount' => $this->reviews_count,
            'isSustainable' => (bool) ($this->badge === 'Sustainable' || str_contains(strtolower((string) $this->materials), 'organic')),
            'hasStock' => $this->inStock(),
            'totalStock' => $this->totalStock(),
            'inStock' => $this->inStock(),
            'variants' => ProductVariantResource::collection($this->whenLoaded('variants')),
        ];
    }
}
