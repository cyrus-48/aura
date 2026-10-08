<?php

declare(strict_types=1);

namespace App\Http\Resources\Catalog;

use App\Models\Collection;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin Collection
 */
class CollectionResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'description' => $this->description,
            'heroImage' => $this->hero_image,
            'badge' => $this->badge,
            'productsCount' => $this->products_count ?? ($this->relationLoaded('products') ? $this->products->count() : null),
            'products' => ProductCardResource::collection($this->whenLoaded('products')),
        ];
    }
}
