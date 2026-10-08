<?php

declare(strict_types=1);

namespace App\Exceptions;

use RuntimeException;

/**
 * Base domain exception for all domain-specific errors in Aura & Oak.
 * Adheres to Rule 3.
 */
abstract class DomainException extends RuntimeException
{
    public function __construct(string $message = 'A domain rule violation occurred.')
    {
        parent::__construct($message);
    }
}
