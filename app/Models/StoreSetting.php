<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class StoreSetting extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'key',
        'value',
    ];

    /**
     * Retrieve a setting value by key with optional default.
     */
    public static function get(string $key, mixed $default = null): mixed
    {
        $setting = static::where('key', $key)->first();

        return $setting ? $setting->value : $default;
    }

    /**
     * Set or create a setting key-value pair.
     */
    public static function set(string $key, mixed $value): void
    {
        static::updateOrCreate(
            ['key' => $key],
            ['value' => is_bool($value) ? ($value ? '1' : '0') : (string) $value]
        );
    }

    /**
     * Get all current store settings with defaults merged.
     *
     * @return array<string, mixed>
     */
    public static function allSettings(): array
    {
        $defaults = [
            'store_name' => 'Aura & Oak Atelier',
            'support_email' => 'concierge@auraandoak.com',
            'contact_phone' => '+254 700 123 456',
            'currency' => 'USD',
            'tax_rate' => '16.0',
            'free_shipping_threshold' => '150.00',
            'flat_shipping_rate' => '15.00',
            'low_stock_threshold' => '5',
            'notifications_enabled' => true,
        ];

        $stored = static::pluck('value', 'key')->toArray();

        foreach ($defaults as $k => $v) {
            if (array_key_exists($k, $stored)) {
                if (is_bool($v)) {
                    $defaults[$k] = $stored[$k] === '1' || $stored[$k] === 'true';
                } elseif (is_numeric($v)) {
                    $defaults[$k] = $stored[$k];
                } else {
                    $defaults[$k] = $stored[$k];
                }
            }
        }

        return $defaults;
    }
}
