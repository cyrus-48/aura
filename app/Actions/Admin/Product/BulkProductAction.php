<?php

declare(strict_types=1);

namespace App\Actions\Admin\Product;

use App\Enums\ProductStatus;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class BulkProductAction
{
    /**
     * Perform a bulk operation on a collection of products.
     *
     * @param  list<int>  $productIds
     * @param  array<string, mixed>  $payload
     */
    public function execute(string $action, array $productIds, array $payload = []): int
    {
        if (empty($productIds)) {
            return 0;
        }

        return DB::transaction(function () use ($action, $productIds, $payload): int {
            $query = Product::query()->whereIn('id', $productIds);

            return match ($action) {
                'status' => (function () use ($query, $payload): int {
                    $status = ProductStatus::from((string) ($payload['status'] ?? 'active'));

                    return $query->update([
                        'status' => $status,
                        'is_active' => $status === ProductStatus::Active,
                    ]);
                })(),
                'category' => $query->update([
                    'category_id' => $payload['category_id'] ?? null,
                ]),
                'delete' => (int) $query->delete(),
                default => 0,
            };
        });
    }
}
