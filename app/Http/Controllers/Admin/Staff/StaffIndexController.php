<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Staff;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use Inertia\Inertia;
use Inertia\Response;

class StaffIndexController extends Controller
{
    /**
     * Display listing of internal staff and administrators.
     */
    public function __invoke(): Response
    {
        $staff = User::whereIn('role', [UserRole::Admin, UserRole::Manager, UserRole::Support])
            ->latest('id')
            ->get()
            ->map(fn (User $u) => [
                'id' => $u->id,
                'name' => $u->name,
                'email' => $u->email,
                'role' => $u->role->value,
                'role_label' => ucfirst($u->role->value),
                'role_color' => match ($u->role) {
                    UserRole::Admin => 'bg-purple-100 text-purple-800',
                    UserRole::Manager => 'bg-sky-100 text-sky-800',
                    UserRole::Support => 'bg-emerald-100 text-emerald-800',
                    default => 'bg-stone-100 text-stone-800',
                },
                'is_current_user' => $u->id === auth()->id(),
                'created_at' => $u->created_at?->format('M d, Y') ?? '',
            ]);

        return Inertia::render('admin/staff/Index', [
            'staff' => $staff,
        ]);
    }
}
