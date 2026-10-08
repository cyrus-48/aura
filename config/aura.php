<?php

declare(strict_types=1);

return [
    /*
    |--------------------------------------------------------------------------
    | Storefront Currency & Financial Settings
    |--------------------------------------------------------------------------
    |
    | Default currency symbol/code and default VAT percentage rate.
    |
    */
    'currency' => env('AURA_CURRENCY', 'USD'),
    'currency_symbol' => env('AURA_CURRENCY_SYMBOL', '$'),
    'tax_rate' => (float) env('AURA_TAX_RATE', 0.16),

    /*
    |--------------------------------------------------------------------------
    | Shipping Rate Thresholds
    |--------------------------------------------------------------------------
    |
    | Configuration for carbon-neutral delivery costs and tiers.
    |
    */
    'free_shipping_threshold' => (float) env('AURA_FREE_SHIPPING_THRESHOLD', 99.00),
    'standard_shipping_rate' => (float) env('AURA_STANDARD_SHIPPING_RATE', 15.00),
    'express_shipping_rate' => (float) env('AURA_EXPRESS_SHIPPING_RATE', 25.00),

    /*
    |--------------------------------------------------------------------------
    | Atelier Contact & Concierge Notifications
    |--------------------------------------------------------------------------
    |
    | Contact information used across order receipts and support communications.
    |
    */
    'contact_email' => env('AURA_CONTACT_EMAIL', 'concierge@auraandoak.com'),
    'contact_phone' => env('AURA_CONTACT_PHONE', '+1 (800) 555-0199'),
    'atelier_address' => env('AURA_ATELIER_ADDRESS', '124 Greenway Blvd, Portland, OR 97201'),
];
