<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Journal;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class JournalCreateController extends Controller
{
    /**
     * Show the editor to create a new journal post.
     */
    public function __invoke(): Response
    {
        return Inertia::render('admin/journal/Editor', [
            'post' => null,
        ]);
    }
}
