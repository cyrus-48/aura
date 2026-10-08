<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Actions\Admin\Product\CreateProductAction;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Product\StoreProductRequest;
use Illuminate\Http\RedirectResponse;

class ProductStoreController extends Controller
{
    /**
     * Store a newly created product in storage.
     */
    public function __invoke(StoreProductRequest $request, CreateProductAction $createProduct): RedirectResponse
    {
        $product = $createProduct->execute($request->validated());

        return redirect()->route('admin.products.edit', $product)
            ->with('success', "Product '{$product->name}' created successfully.");
    }
}
