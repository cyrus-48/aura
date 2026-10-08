<?php

declare(strict_types=1);

namespace App\Actions\Admin\Product;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class CreateProductAction
{
    /**
     * Create a new product and its associated variants and collections.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(array $data): Product
    {
        return DB::transaction(function () use ($data): Product {
            $status = $data['status'] instanceof ProductStatus
                ? $data['status']
                : ProductStatus::from((string) $data['status']);

            $product = Product::create([
                'category_id' => $data['category_id'] ?? null,
                'name' => $data['name'],
                'slug' => $data['slug'],
                'short_description' => $data['short_description'] ?? null,
                'full_description' => $data['full_description'] ?? null,
                'base_price' => $data['base_price'],
                'compare_at_price' => $data['compare_at_price'] ?? null,
                'primary_image' => $data['primary_image'] ?? null,
                'gallery_images' => $data['gallery_images'] ?? [],
                'status' => $status,
                'is_active' => $status === ProductStatus::Active,
                'materials' => $data['materials'] ?? null,
                'care_instructions' => $data['care_instructions'] ?? null,
            ]);

            if (! empty($data['collection_ids'])) {
                $product->collections()->sync($data['collection_ids']);
            }

            if (! empty($data['variants'])) {
                foreach ($data['variants'] as $variantData) {
                    $product->variants()->create([
                        'sku' => $variantData['sku'],
                        'color' => $variantData['color'],
                        'color_hex' => $variantData['color_hex'] ?? '#000000',
                        'size' => $variantData['size'],
                        'stock_count' => (int) $variantData['stock_count'],
                        'price_adjustment' => $variantData['price_adjustment'] ?? 0.00,
                    ]);
                }
            }

            return $product;
        });
    }
}
