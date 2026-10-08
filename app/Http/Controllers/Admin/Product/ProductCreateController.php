<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Product;

use App\Http\Controllers\Controller;
use App\Models\Category;
use App\Models\Collection;
use Inertia\Inertia;
use Inertia\Response;

class ProductCreateController extends Controller
{
    /**
     * Show form for creating a new product.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/products/Editor', [
            'product' => null,
            'categories' => Category::query()->orderBy('name')->get(['id', 'name']),
            'collections' => Collection::query()->orderBy('name')->get(['id', 'name']),
        ]);
    }
}
