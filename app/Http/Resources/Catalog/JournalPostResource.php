<?php

declare(strict_types=1);

namespace App\Http\Resources\Catalog;

use App\Models\JournalPost;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

/**
 * @mixin JournalPost
 */
class JournalPostResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->body,
            'category' => $this->category,
            'featuredImage' => $this->featured_image,
            'readingTime' => $this->read_time,
            'isFeatured' => $this->is_featured,
            'publishedAt' => $this->published_at?->format('M d, Y'),
        ];
    }
}
