<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Setting;

use App\Http\Controllers\Controller;
use App\Models\StoreSetting;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StoreSettingUpdateController extends Controller
{
    /**
     * Update store settings configurations.
     */
    public function __invoke(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'store_name' => ['required', 'string', 'max:100'],
            'support_email' => ['required', 'email', 'max:150'],
            'contact_phone' => ['nullable', 'string', 'max:50'],
            'currency' => ['required', 'string', 'size:3'],
            'tax_rate' => ['required', 'numeric', 'min:0', 'max:100'],
            'free_shipping_threshold' => ['required', 'numeric', 'min:0'],
            'flat_shipping_rate' => ['required', 'numeric', 'min:0'],
            'low_stock_threshold' => ['required', 'integer', 'min:1'],
            'notifications_enabled' => ['boolean'],
        ]);

        foreach ($validated as $key => $value) {
            StoreSetting::set($key, $value);
        }

        return back()->with('success', 'Store configurations updated successfully.');
    }
}
