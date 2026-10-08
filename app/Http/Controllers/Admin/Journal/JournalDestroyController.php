<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use App\Models\JournalPost;
use Illuminate\Http\RedirectResponse;

class JournalDestroyController extends Controller
{
    /**
     * Delete the specified journal article.
     */
    public function __invoke(JournalPost $post): RedirectResponse
    {
        $post->delete();

        return redirect()->route('admin.journal.index')
            ->with('success', 'Journal article removed successfully.');
    }
}
