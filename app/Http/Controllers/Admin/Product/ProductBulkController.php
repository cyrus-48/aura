<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Actions\Admin\Product\BulkProductAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ProductBulkController extends Controller
{
    /**
     * Perform bulk operations on selected catalog products.
     */
    public function __invoke(Request $request, BulkProductAction $bulkAction): RedirectResponse
    {
        $validated = $request->validate([
            'action' => ['required', 'string', 'in:status,category,delete'],
            'ids' => ['required', 'array', 'min:1'],
            'ids.*' => ['integer', 'exists:products,id'],
            'payload' => ['nullable', 'array'],
        ]);

        /** @var list<int> $ids */
        $ids = $validated['ids'];
        $affected = $bulkAction->execute($validated['action'], $ids, $validated['payload'] ?? []);

        return redirect()->route('admin.products.index')
            ->with('success', "Updated {$affected} products successfully.");
    }
}
