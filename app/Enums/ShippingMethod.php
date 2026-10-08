<?php

declare(strict_types=1);

namespace App\Enums;

enum ShippingMethod: string
{
    case Standard = 'standard';
    case Express = 'express';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Standard => 'Standard Carbon-Neutral Delivery (3-5 Days)',
            self::Express => 'Express Courier Dispatch (1-2 Days)',
        };
    }

    /**
     * Get Tailwind color class for badge rendering in Vue.
     */
    public function color(): string
    {
        return match ($this) {
            self::Standard => 'bg-emerald-100 text-emerald-800 border-emerald-200',
            self::Express => 'bg-amber-100 text-amber-800 border-amber-200',
        };
    }

    /**
     * Calculate delivery fee for given subtotal based on configuration.
     */
    public function calculateCost(float $subtotal): float
    {
        $freeThreshold = (float) config('aura.free_shipping_threshold', 99.00);

        return match ($this) {
            self::Standard => $subtotal >= $freeThreshold ? 0.00 : (float) config('aura.standard_shipping_rate', 15.00),
            self::Express => (float) config('aura.express_shipping_rate', 25.00),
        };
    }
}
