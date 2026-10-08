<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Collection;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class CollectionStoreController extends Controller
{
    /**
     * Store a newly created collection.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:collections,slug'],
            'description' => ['nullable', 'string', 'max:1000'],
            'hero_image' => ['nullable', 'string'],
            'is_active' => ['boolean'],
            'product_ids' => ['nullable', 'array'],
            'product_ids.*' => ['integer', 'exists:products,id'],
        ]);

        $collection = Collection::create([
            'name' => $validated['name'],
            'slug' => $validated['slug'],
            'description' => $validated['description'] ?? null,
            'hero_image' => $validated['hero_image'] ?? null,
            'is_active' => (bool) ($validated['is_active'] ?? true),
        ]);

        if (! empty($validated['product_ids'])) {
            $syncData = [];
            foreach ($validated['product_ids'] as $index => $productId) {
                $syncData[$productId] = ['sort_order' => $index];
            }
            $collection->products()->sync($syncData);
        }

        return redirect()->route('admin.collections.edit', $collection)
            ->with('success', "Collection '{$collection->name}' created successfully.");
    }
}
