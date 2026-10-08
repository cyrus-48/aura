<?php

declare(strict_types=1);

namespace App\Enums;

enum ProductStatus: string
{
    case Active = 'active';
    case Draft = 'draft';
    case Archived = 'archived';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Active => 'Active',
            self::Draft => 'Draft',
            self::Archived => 'Archived',
        };
    }

    /**
     * Get badge styling classes for status display.
     */
    public function badgeClasses(): string
    {
        return match ($this) {
            self::Active => 'bg-green-50 text-green-700 border-green-200',
            self::Draft => 'bg-amber-50 text-amber-700 border-amber-200',
            self::Archived => 'bg-stone-100 text-stone-600 border-stone-200',
        };
    }

    /**
     * Get color classes for badge rendering in Vue.
     */
    public function color(): string
    {
        return $this->badgeClasses();
    }
}
