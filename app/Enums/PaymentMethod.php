<?php

declare(strict_types=1);

namespace App\Enums;

enum PaymentMethod: string
{
    case Mpesa = 'mpesa';
    case Airtel = 'airtel';
    case Stripe = 'stripe';
    case Pesapal = 'pesapal';
    case Cod = 'cod';

    /**
     * Get human-readable label.
     */
    public function label(): string
    {
        return match ($this) {
            self::Mpesa => 'M-Pesa Express (STK Push)',
            self::Airtel => 'Airtel Money',
            self::Stripe => 'Credit / Debit Card (Stripe)',
            self::Pesapal => 'Pesapal East Africa',
            self::Cod => 'Cash on Delivery',
        };
    }

    /**
     * Get Tailwind color class for badge rendering in Vue.
     */
    public function color(): string
    {
        return match ($this) {
            self::Mpesa => 'bg-emerald-100 text-emerald-800 border-emerald-200',
            self::Airtel => 'bg-red-100 text-red-800 border-red-200',
            self::Stripe => 'bg-indigo-100 text-indigo-800 border-indigo-200',
            self::Pesapal => 'bg-cyan-100 text-cyan-800 border-cyan-200',
            self::Cod => 'bg-stone-100 text-stone-700 border-stone-200',
        };
    }
}
