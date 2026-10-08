<?php

declare(strict_types=1);

namespace App\Enums;

enum OrderStatus: string
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Processing = 'processing';
    case Shipped = 'shipped';
    case Delivered = 'delivered';
    case Cancelled = 'cancelled';
    case Refunded = 'refunded';

    /**
     * Get human-readable label for order status.
     */
    public function label(): string
    {
        return match ($this) {
            self::Pending => 'Pending',
            self::Confirmed => 'Confirmed',
            self::Processing => 'Processing',
            self::Shipped => 'Shipped',
            self::Delivered => 'Delivered',
            self::Cancelled => 'Cancelled',
            self::Refunded => 'Refunded',
        };
    }

    /**
     * Determine if a transition to the target status is allowed by the state machine.
     */
    public function canTransitionTo(self $target): bool
    {
        return in_array($target, $this->allowedTransitions(), true);
    }

    /**
     * Get allowed next transitions based on strict state sequence.
     *
     * @return array<self>
     */
    public function allowedTransitions(): array
    {
        return match ($this) {
            self::Pending => [self::Confirmed, self::Cancelled],
            self::Confirmed => [self::Processing, self::Cancelled],
            self::Processing => [self::Shipped, self::Cancelled],
            self::Shipped => [self::Delivered],
            self::Delivered => [self::Refunded],
            self::Cancelled, self::Refunded => [],
        };
    }

    /**
     * Get badge styling classes for status display.
     */
    public function badgeClasses(): string
    {
        return match ($this) {
            self::Pending => 'bg-amber-100 text-amber-800 border-amber-200',
            self::Confirmed => 'bg-blue-100 text-blue-800 border-blue-200',
            self::Processing => 'bg-indigo-100 text-indigo-800 border-indigo-200',
            self::Shipped => 'bg-purple-100 text-purple-800 border-purple-200',
            self::Delivered => 'bg-emerald-100 text-emerald-800 border-emerald-200',
            self::Cancelled => 'bg-stone-100 text-stone-700 border-stone-200',
            self::Refunded => 'bg-red-100 text-red-800 border-red-200',
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
     * Alias for color().
     */
    public function badgeColor(): string
    {
        return $this->color();
    }
}
