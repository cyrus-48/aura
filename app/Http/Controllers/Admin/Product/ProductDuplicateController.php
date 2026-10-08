<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Actions\Admin\Product\DuplicateProductAction;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;

class ProductDuplicateController extends Controller
{
    /**
     * Duplicate a product and its variants into a new draft item.
     */
    public function __invoke(Product $product, DuplicateProductAction $duplicateProduct): RedirectResponse
    {
        $duplicate = $duplicateProduct->execute($product);

        return redirect()->route('admin.products.edit', $duplicate)
            ->with('success', "Product duplicated as draft '{$duplicate->name}'.");
    }
}
