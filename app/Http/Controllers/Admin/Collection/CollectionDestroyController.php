<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Collection;

use App\Http\Controllers\Controller;
use App\Models\Collection;
use Illuminate\Http\RedirectResponse;

class CollectionDestroyController extends Controller
{
    /**
     * Remove the specified collection from storage.
     */
    public function __invoke(Collection $collection): RedirectResponse
    {
        $name = $collection->name;
        $collection->delete();

        return redirect()->route('admin.collections.index')
            ->with('success', "Collection '{$name}' was deleted.");
    }
}
