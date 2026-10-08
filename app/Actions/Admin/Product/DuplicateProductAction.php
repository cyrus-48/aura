<?php

declare(strict_types=1);

namespace App\Actions\Admin\Product;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class DuplicateProductAction
{
    /**
     * Duplicate a product and its variants into a new draft item.
     */
    public function execute(Product $source): Product
    {
        return DB::transaction(function () use ($source): Product {
            $source->loadMissing(['variants', 'collections']);

            $baseSlug = $source->slug.'-copy';
            $slug = $baseSlug;
            $counter = 1;
            while (Product::withTrashed()->where('slug', $slug)->exists()) {
                $counter++;
                $slug = $baseSlug.'-'.$counter;
            }

            $duplicate = Product::create([
                'category_id' => $source->category_id,
                'name' => $source->name.' (Copy)',
                'slug' => $slug,
                'short_description' => $source->short_description,
                'full_description' => $source->full_description,
                'base_price' => $source->base_price,
                'compare_at_price' => $source->compare_at_price,
                'primary_image' => $source->primary_image,
                'gallery_images' => $source->gallery_images,
                'status' => ProductStatus::Draft,
                'is_active' => false,
                'materials' => $source->materials,
                'care_instructions' => $source->care_instructions,
                'badge' => $source->badge,
            ]);

            $duplicate->collections()->sync($source->collections->pluck('id'));

            foreach ($source->variants as $variant) {
                $skuSuffix = strtoupper(Str::random(4));
                $duplicate->variants()->create([
                    'sku' => $variant->sku.'-CP-'.$skuSuffix,
                    'color' => $variant->color,
                    'color_hex' => $variant->color_hex,
                    'size' => $variant->size,
                    'stock_count' => $variant->stock_count,
                    'price_adjustment' => $variant->price_adjustment,
                ]);
            }

            return $duplicate;
        });
    }
}
