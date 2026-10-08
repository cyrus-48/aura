<?php

declare(strict_types=1);

namespace App\Enums;

enum AddressType: string
{
    case Shipping = 'shipping';
    case Billing = 'billing';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Shipping => 'Shipping Address',
            self::Billing => 'Billing Address',
        };
    }

    /**
     * Get Tailwind color class for badge rendering in Vue.
     */
    public function color(): string
    {
        return match ($this) {
            self::Shipping => 'bg-aura-sage text-aura-slate border-aura-sage',
            self::Billing => 'bg-stone-100 text-stone-700 border-stone-200',
        };
    }
}
