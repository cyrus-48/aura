<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Discount;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreDiscountRequest;
use App\Models\Discount;
use Illuminate\Http\RedirectResponse;

class DiscountStoreController extends Controller
{
    /**
     * Store a newly created discount promotion.
     */
    public function __invoke(StoreDiscountRequest $request): RedirectResponse
    {
        Discount::create($request->validated());

        return back()->with('success', 'Discount coupon code created successfully.');
    }
}
