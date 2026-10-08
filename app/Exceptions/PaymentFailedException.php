<?php

declare(strict_types=1);

namespace App\Exceptions;

class PaymentFailedException extends DomainException
{
    public function __construct(string $message = 'Payment processing failed or was declined.')
    {
        parent::__construct($message);
    }

    public static function withReason(string $reason, ?string $reference = null): self
    {
        $refText = $reference ? " (Ref: {$reference})" : '';

        return new self("Payment transaction failed{$refText}: {$reason}");
    }
}
