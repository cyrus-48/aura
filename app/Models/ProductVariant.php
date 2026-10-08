<?php

declare(strict_types=1);

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class ProductVariant extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'product_id',
        'sku',
        'color',
        'color_hex',
        'size',
        'price_adjustment',
        'stock_count',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'price_adjustment' => 'decimal:2',
            'stock_count' => 'integer',
        ];
    }

    /**
     * Get the product parent.
     */
    public function product(): BelongsTo
    {
        return $this->belongsTo(Product::class);
    }

    /**
     * Get cart items for this variant.
     */
    public function cartItems(): HasMany
    {
        return $this->hasMany(CartItem::class);
    }

    /**
     * Get order items for this variant.
     */
    public function orderItems(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    /**
     * Get inventory movements audit log for this variant.
     */
    public function inventoryMovements(): HasMany
    {
        return $this->hasMany(InventoryMovement::class);
    }

    /**
     * Calculate effective final price for this variant.
     */
    public function finalPrice(): float
    {
        $this->loadMissing('product');

        return (float) ($this->product?->base_price ?? 0) + (float) $this->price_adjustment;
    }

    /**
     * Check if requested quantity is in stock.
     */
    public function isAvailable(int $quantity = 1): bool
    {
        return $this->stock_count >= $quantity;
    }

    /**
     * Check if variant has inventory in stock.
     */
    public function inStock(): bool
    {
        return $this->stock_count > 0;
    }
}
