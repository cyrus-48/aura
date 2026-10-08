<?php

declare(strict_types=1);

namespace App\Http\Controllers\Storefront;

use App\Http\Controllers\Controller;
use App\Http\Requests\Storefront\ContactRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class ContentPageController extends Controller
{
    /**
     * Display the Our Story brand heritage page.
     */
    public function ourStory(): Response
    {
        return Inertia::render('Story');
    }

    /**
     * Display the Contact Atelier page.
     */
    public function contact(): Response
    {
        return Inertia::render('Contact');
    }

    /**
     * Handle contact form submission.
     */
    public function submitContact(ContactRequest $request): RedirectResponse
    {
        Log::info('Contact inquiry received', $request->validated());

        return back()->with('success', 'Thank you for contacting our atelier. We will respond within 24 business hours.');
    }

    /**
     * Display the FAQ knowledge base page.
     */
    public function faq(): Response
    {
        return Inertia::render('Faq');
    }

    /**
     * Display the Terms & Conditions and Privacy Policy page.
     */
    public function terms(): Response
    {
        return Inertia::render('Terms');
    }
}
