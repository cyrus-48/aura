<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Models\ProductVariant;

class InsufficientStockException extends DomainException
{
    public function __construct(string $message = 'Requested quantity exceeds available inventory stock.')
    {
        parent::__construct($message);
    }

    public static function for(ProductVariant $variant, int $requested): self
    {
        $name = $variant->product->name ?? 'Item';
        $remaining = $variant->stock_count;

        return new self("Insufficient stock for {$name}. Requested {$requested}, only {$remaining} available.");
    }
}
