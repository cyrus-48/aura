<?php

declare(strict_types=1);

namespace App\Actions\Admin\Product;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class UpdateProductAction
{
    /**
     * Update an existing product and synchronize variants and collections.
     *
     * @param  array<string, mixed>  $data
     */
    public function execute(Product $product, array $data): Product
    {
        return DB::transaction(function () use ($product, $data): Product {
            $status = $data['status'] instanceof ProductStatus
                ? $data['status']
                : ProductStatus::from((string) $data['status']);

            $product->update([
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

            $product->collections()->sync($data['collection_ids'] ?? []);

            if (isset($data['variants'])) {
                $keptVariantIds = [];

                foreach ($data['variants'] as $variantData) {
                    if (! empty($variantData['id'])) {
                        $variant = $product->variants()->find($variantData['id']);
                        if ($variant) {
                            $variant->update([
                                'sku' => $variantData['sku'],
                                'color' => $variantData['color'],
                                'color_hex' => $variantData['color_hex'] ?? '#000000',
                                'size' => $variantData['size'],
                                'stock_count' => (int) $variantData['stock_count'],
                                'price_adjustment' => $variantData['price_adjustment'] ?? 0.00,
                            ]);
                            $keptVariantIds[] = $variant->id;

                            continue;
                        }
                    }

                    $newVariant = $product->variants()->create([
                        'sku' => $variantData['sku'],
                        'color' => $variantData['color'],
                        'color_hex' => $variantData['color_hex'] ?? '#000000',
                        'size' => $variantData['size'],
                        'stock_count' => (int) $variantData['stock_count'],
                        'price_adjustment' => $variantData['price_adjustment'] ?? 0.00,
                    ]);
                    $keptVariantIds[] = $newVariant->id;
                }

                $product->variants()->whereNotIn('id', $keptVariantIds)->delete();
            }

            return $product;
        });
    }
}
