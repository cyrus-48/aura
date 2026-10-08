<?php

declare(strict_types=1);

use App\Enums\UserRole;
use App\Models\JournalPost;
use App\Models\User;
use Inertia\Testing\AssertableInertia as Assert;

beforeEach(function (): void {
    $this->admin = User::factory()->admin()->create();
    $this->customer = User::factory()->create([
        'role' => UserRole::Customer,
    ]);

    $this->post = JournalPost::create([
        'title' => 'Wabi-Sabi Aesthetics in Modern Architecture',
        'slug' => 'wabi-sabi-aesthetics',
        'category' => 'Architecture',
        'excerpt' => 'Exploring tactile materials and deliberate imperfections.',
        'body' => 'The essence of understated design lies in raw texture and honest finishes.',
        'read_time' => '5 min read',
        'is_featured' => true,
        'published_at' => now()->subDay(),
    ]);
});

test('non-staff users cannot access journal or content administration', function (): void {
    $this->actingAs($this->customer)->get(route('admin.journal.index'))->assertForbidden();
    $this->actingAs($this->customer)->get(route('admin.pages.index'))->assertForbidden();
    $this->actingAs($this->customer)->get(route('admin.media.index'))->assertForbidden();
});

test('administrators can list journal posts with counts', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.journal.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/journal/Index')
            ->has('posts.data', 1)
            ->where('posts.data.0.title', 'Wabi-Sabi Aesthetics in Modern Architecture')
            ->has('stats.total')
            ->has('stats.published')
        );
});

test('administrators can create a new journal article', function (): void {
    $response = $this->actingAs($this->admin)->post(route('admin.journal.store'), [
        'title' => 'Loom & Weave: The Story of Our Linen',
        'category' => 'Craftsmanship',
        'excerpt' => 'How Normandy flax transforms into our signature relaxed linen.',
        'body' => 'Full article narrative on textile production.',
        'read_time' => '4 min read',
        'is_featured' => false,
        'published_at' => now()->format('Y-m-d'),
    ]);

    $response->assertRedirect(route('admin.journal.index'));
    $this->assertDatabaseHas('journal_posts', [
        'title' => 'Loom & Weave: The Story of Our Linen',
        'slug' => 'loom-weave-the-story-of-our-linen',
    ]);
});

test('administrators can update a journal article', function (): void {
    $response = $this->actingAs($this->admin)->put(route('admin.journal.update', $this->post), [
        'title' => 'Wabi-Sabi in Contemporary Spaces',
        'slug' => 'wabi-sabi-spaces',
        'category' => 'Living',
        'excerpt' => 'Updated excerpt snippet.',
        'body' => 'Updated article content.',
        'read_time' => '6 min read',
        'is_featured' => true,
        'published_at' => now()->format('Y-m-d'),
    ]);

    $response->assertRedirect(route('admin.journal.index'));
    $this->assertDatabaseHas('journal_posts', [
        'id' => $this->post->id,
        'title' => 'Wabi-Sabi in Contemporary Spaces',
        'category' => 'Living',
    ]);
});

test('administrators can delete a journal post', function (): void {
    $response = $this->actingAs($this->admin)->delete(route('admin.journal.destroy', $this->post));

    $response->assertRedirect(route('admin.journal.index'));
    $this->assertSoftDeleted('journal_posts', [
        'id' => $this->post->id,
    ]);
});

test('administrators can view static content pages list', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.pages.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/pages/Index')
            ->has('pages', 4)
        );
});

test('administrators can view media library', function (): void {
    $response = $this->actingAs($this->admin)->get(route('admin.media.index'));

    $response->assertOk()
        ->assertInertia(fn (Assert $page) => $page
            ->component('admin/media/Index')
            ->has('media')
            ->has('stats.total_assets')
        );
});
