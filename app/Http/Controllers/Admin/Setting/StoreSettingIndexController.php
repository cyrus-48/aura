<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Setting;

use App\Http\Controllers\Controller;
use App\Models\StoreSetting;
use Inertia\Inertia;
use Inertia\Response;

class StoreSettingIndexController extends Controller
{
    /**
     * Display store operational settings.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/settings/Index', [
            'settings' => StoreSetting::allSettings(),
        ]);
    }
}
