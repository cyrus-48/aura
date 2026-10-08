<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Discount;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateDiscountRequest;
use App\Models\Discount;
use Illuminate\Http\RedirectResponse;

class DiscountUpdateController extends Controller
{
    /**
     * Update an existing discount coupon code.
     */
    public function __invoke(UpdateDiscountRequest $request, Discount $discount): RedirectResponse
    {
        $discount->update($request->validated());

        return back()->with('success', 'Discount coupon code updated successfully.');
    }
}
