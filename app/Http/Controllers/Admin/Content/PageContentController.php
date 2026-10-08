<?php

declare(strict_types=1);

namespace App\Http\Controllers\Admin\Content;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class PageContentController extends Controller
{
    /**
     * Display directory of managed brand content pages.
     */
    public function index(): Response
    {
        $pages = [
            [
                'id' => 'story',
                'title' => 'Our Story',
                'slug' => 'our-story',
                'subtitle' => 'The Philosophy & Craft of Aura & Oak',
                'route' => '/our-story',
                'status' => 'Published',
                'updated_at' => now()->format('M d, Y'),
            ],
            [
                'id' => 'contact',
                'title' => 'Contact Atelier',
                'slug' => 'contact',
                'subtitle' => 'Customer Care & Concierge Support',
                'route' => '/contact',
                'status' => 'Published',
                'updated_at' => now()->format('M d, Y'),
            ],
            [
                'id' => 'faq',
                'title' => 'Frequently Asked Questions',
                'slug' => 'faq',
                'subtitle' => 'Care Guides, Deliveries & Returns',
                'route' => '/faq',
                'status' => 'Published',
                'updated_at' => now()->format('M d, Y'),
            ],
            [
                'id' => 'terms',
                'title' => 'Terms of Service',
                'slug' => 'terms',
                'subtitle' => 'Legal Policies & Client Agreements',
                'route' => '/terms',
                'status' => 'Published',
                'updated_at' => now()->format('M d, Y'),
            ],
        ];

        return Inertia::render('admin/pages/Index', [
            'pages' => $pages,
        ]);
    }
}
