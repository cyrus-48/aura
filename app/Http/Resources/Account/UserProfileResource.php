<?php

declare(strict_types=1);

namespace App\Http\Resources\Account;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Str;

/**
 * @mixin User
 */
class UserProfileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $initials = Str::of((string) $this->name)
            ->explode(' ')
            ->map(fn (string $segment): string => Str::substr($segment, 0, 1))
            ->take(2)
            ->implode('');

        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => null,
            'avatar' => null,
            'initials' => strtoupper($initials ?: 'AO'),
            'memberSince' => $this->created_at?->format('F Y') ?? 'Member',
        ];
    }
}
