<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\StoreJournalPostRequest;
use App\Models\JournalPost;
use Illuminate\Http\RedirectResponse;

class JournalStoreController extends Controller
{
    /**
     * Store a newly created journal post.
     */
    public function __invoke(StoreJournalPostRequest $request): RedirectResponse
    {
        JournalPost::create($request->validated());

        return redirect()->route('admin.journal.index')
            ->with('success', 'Editorial journal article published successfully.');
    }
}
