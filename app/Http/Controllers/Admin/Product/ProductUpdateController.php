<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Actions\Admin\Product\UpdateProductAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\UpdateProductRequest;
use App\Models\Product;
use Illuminate\Http\RedirectResponse;

class ProductUpdateController extends Controller
{
    /**
     * Update the specified product in storage.
     */
    public function __invoke(UpdateProductRequest $request, Product $product, UpdateProductAction $updateProduct): RedirectResponse
    {
        $updated = $updateProduct->execute($product, $request->validated());

        return redirect()->route('admin.products.edit', $updated)
            ->with('success', "Product '{$updated->name}' updated successfully.");
    }
}
