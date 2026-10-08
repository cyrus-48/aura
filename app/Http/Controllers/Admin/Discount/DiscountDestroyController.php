<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Discount;

use App\Http\Controllers\Controller;
use App\Models\Discount;
use Illuminate\Http\RedirectResponse;

class DiscountDestroyController extends Controller
{
    /**
     * Remove the specified discount coupon from storage.
     */
    public function __invoke(Discount $discount): RedirectResponse
    {
        $discount->delete();

        return back()->with('success', 'Discount coupon code deleted successfully.');
    }
}
