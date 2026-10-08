<?php

declare(strict_types=1);

namespace App\Enums;

enum DiscountType: string
{
    case Percentage = 'percentage';
    case Fixed = 'fixed';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Percentage => 'Percentage Discount (%)',
            self::Fixed => 'Fixed Amount Discount ($)',
        };
    }

    /**
     * Get badge CSS classes for presentation.
     */
    public function badgeClasses(): string
    {
        return match ($this) {
            self::Percentage => 'bg-emerald-50 text-emerald-800 border-emerald-200',
            self::Fixed => 'bg-sky-50 text-sky-800 border-sky-200',
        };
    }
}
