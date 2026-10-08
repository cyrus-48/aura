<?php

declare(strict_types=1);

namespace App\Enums;

enum UserRole: string
{
    case Customer = 'customer';
    case Support = 'support';
    case Manager = 'manager';
    case Admin = 'admin';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Customer => 'Customer Client',
            self::Support => 'Customer Support',
            self::Manager => 'Store Manager',
            self::Admin => 'Atelier Administrator',
        };
    }

    /**
     * Get Tailwind color class for badge rendering in Vue.
     */
    public function color(): string
    {
        return match ($this) {
            self::Customer => 'bg-aura-sage text-aura-slate border-aura-sage',
            self::Support => 'bg-blue-100 text-blue-800 border-blue-200',
            self::Manager => 'bg-emerald-100 text-emerald-800 border-emerald-200',
            self::Admin => 'bg-purple-100 text-purple-800 border-purple-200',
        };
    }
}
