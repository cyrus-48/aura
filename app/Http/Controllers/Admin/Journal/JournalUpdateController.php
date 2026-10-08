<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\UpdateJournalPostRequest;
use App\Models\JournalPost;
use Illuminate\Http\RedirectResponse;

class JournalUpdateController extends Controller
{
    /**
     * Update an existing journal article.
     */
    public function __invoke(UpdateJournalPostRequest $request, JournalPost $post): RedirectResponse
    {
        $post->update($request->validated());

        return redirect()->route('admin.journal.index')
            ->with('success', 'Editorial journal article updated successfully.');
    }
}
