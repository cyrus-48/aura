<?php

declare(strict_types=1);

use App\Models\JournalPost;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

beforeEach(function (): void {
    $this->post1 = JournalPost::create([
        'title' => 'Slow Living and Natural Textures',
        'slug' => 'slow-living-and-natural-textures',
        'excerpt' => 'Exploring the quiet power of tactile organic living.',
        'body' => 'Full editorial text here.',
        'category' => 'Living',
        'is_featured' => true,
        'published_at' => now()->subDay(),
    ]);

    $this->post2 = JournalPost::create([
        'title' => 'The Art of Ceramic Forms',
        'slug' => 'the-art-of-ceramic-forms',
        'excerpt' => 'Behind the wheel with master potters.',
        'body' => 'Ceramic process editorial here.',
        'category' => 'Craftsmanship',
        'is_featured' => false,
        'published_at' => now()->subDays(2),
    ]);

    $this->draftPost = JournalPost::create([
        'title' => 'Draft Upcoming Collection Preview',
        'slug' => 'draft-upcoming-collection-preview',
        'excerpt' => 'Not yet published.',
        'body' => 'Draft text.',
        'category' => 'Craftsmanship',
        'is_featured' => false,
        'published_at' => null,
    ]);
});

test('can view journal index with published posts', function (): void {
    $response = $this->get(route('journal.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Journal')
            ->has('featuredPost')
            ->has('posts.data', 1) // post2 because post1 is featured
        );
});

test('can filter journal by category', function (): void {
    $response = $this->get(route('journal.index', ['category' => 'Craftsmanship']));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('Journal')
            ->where('selectedCategory', 'Craftsmanship')
        );
});

test('can view single published article', function (): void {
    $response = $this->get(route('journal.show', $this->post1));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page
            ->component('JournalDetail')
            ->where('post.title', 'Slow Living and Natural Textures')
        );
});

test('returns 404 for draft unpublished article', function (): void {
    $response = $this->get(route('journal.show', $this->draftPost));

    $response->assertNotFound();
});
