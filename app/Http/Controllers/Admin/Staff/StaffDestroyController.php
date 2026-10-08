<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Staff;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class StaffDestroyController extends Controller
{
    /**
     * Remove a staff member.
     */
    public function __invoke(Request $request, User $user): RedirectResponse
    {
        if ($user->id === $request->user()?->id) {
            return back()->with('error', 'You cannot remove your own active staff account.');
        }

        $user->delete();

        return back()->with('success', 'Staff member removed successfully.');
    }
}
