<?php

declare(strict_types=1);

namespace App\Exceptions;

use App\Enums\OrderStatus;

class InvalidStatusTransitionException extends DomainException
{
    public function __construct(string $message = 'The requested order status transition is invalid.')
    {
        parent::__construct($message);
    }

    public static function fromTo(OrderStatus|string $current, OrderStatus|string $target): self
    {
        $currentLabel = $current instanceof OrderStatus ? $current->label() : (OrderStatus::tryFrom($current)?->label() ?? $current);
        $targetLabel = $target instanceof OrderStatus ? $target->label() : (OrderStatus::tryFrom($target)?->label() ?? $target);

        return new self("Cannot transition order status from '{$currentLabel}' to '{$targetLabel}'.");
    }
}
