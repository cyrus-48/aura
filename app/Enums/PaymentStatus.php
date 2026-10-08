<?php

declare(strict_types=1);

namespace App\Enums;

enum PaymentStatus: string
{
    case Pending = 'pending';
    case Paid = 'paid';
    case Failed = 'failed';
    case Refunded = 'refunded';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Paid => 'Paid',
            self::Failed => 'Failed',
            self::Refunded => 'Refunded',
        };
    }

    /**
     * Get badge styling classes for status display.
     */
    public function badgeClasses(): string
    {
        return match ($this) {
            self::Pending => 'bg-amber-100 text-amber-800 border-amber-200',
            self::Paid => 'bg-emerald-100 text-emerald-800 border-emerald-200',
            self::Failed => 'bg-red-100 text-red-800 border-red-200',
            self::Refunded => 'bg-stone-100 text-stone-700 border-stone-200',
        };
    }

    /**
     * Get Tailwind color class for badge rendering in Vue.
     */
    public function color(): string
    {
        return $this->badgeClasses();
    }

    /**
     * Alias for color.
     */
    public function badgeColor(): string
    {
        return $this->color();
    }
}
