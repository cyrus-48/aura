<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Models\Order;

class OrderAlreadyPaidException extends DomainException
{
    public function __construct(string $message = 'This order has already been paid and settled.')
    {
        parent::__construct($message);
    }

    public static function for(Order $order): self
    {
        return new self("Order #{$order->order_number} has already been paid.");
    }
}
