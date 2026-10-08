<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Customer;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreCustomerNoteRequest;
use App\Models\CustomerNote;
use App\Models\User;
use Illuminate\Http\RedirectResponse;

class CustomerNoteController extends Controller
{
    /**
     * Store a new internal staff note on a customer.
     */
    public function __invoke(StoreCustomerNoteRequest $request, User $user): RedirectResponse
    {
        CustomerNote::create([
            'customer_id' => $user->id,
            'author_id' => $request->user()?->id,
            'note' => $request->validated('note'),
        ]);

        return back()->with('success', 'Staff note recorded successfully.');
    }
}
