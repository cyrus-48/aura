<?php

declare(strict_types=1);

namespace App\Exceptions;

class CartEmptyException extends DomainException
{
    public function __construct(string $message = 'Your shopping bag is empty. Please add items before placing an order.')
    {
        parent::__construct($message);
    }

    public static function make(): self
    {
        return new self;
    }
}
