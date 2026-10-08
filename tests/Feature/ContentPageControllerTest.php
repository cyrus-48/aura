<?php

declare(strict_types=1);

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

test('can view our story page', function (): void {
    $response = $this->get(route('story'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page->component('Story'));
});

test('can view contact page and submit contact inquiry', function (): void {
    $response = $this->get(route('contact.index'));

    $response->assertOk()
        ->assertInertia(fn ($page) => $page->component('Contact'));

    $submit = $this->post(route('contact.store'), [
        'name' => 'Amara Vance',
        'email' => 'amara@example.com',
        'subject' => 'Bespoke Order Inquiry',
        'message' => 'We would love to discuss custom dinnerware sets for our lodge.',
    ]);

    $submit->assertSessionHasNoErrors();
    $submit->assertRedirect();
});

test('can view faq and terms pages', function (): void {
    $this->get(route('faq'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Faq'));

    $this->get(route('terms'))
        ->assertOk()
        ->assertInertia(fn ($page) => $page->component('Terms'));
});
