<?php

declare(strict_types=1);

use App\Http\Controllers\Storefront\PaymentWebhookController;
use Illuminate\Support\Facades\Route;

/**
 * Dedicated webhook routes for third-party payment gateways.
 * Excluded from Inertia middleware and CSRF protection.
 * Adheres to Rule 14.
 */
Route::post('/payments/{driver}', PaymentWebhookController::class)
    ->name('payments');
