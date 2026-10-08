<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\GetAdminDashboardDataAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the operational admin dashboard.
     */
    public function __invoke(Request $request, GetAdminDashboardDataAction $getDashboardData): Response
    {
        return Inertia::render('admin/Dashboard', [
            'dashboard' => $getDashboardData->execute(),
        ]);
    }
}
