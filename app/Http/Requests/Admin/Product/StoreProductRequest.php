<?php

declare(strict_types=1);

namespace App\Http\Requests\Admin\Product;

use App\Enums\ProductStatus;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreProductRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return $this->user()?->isStaff() ?? false;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', 'string', 'max:255', 'unique:products,slug'],
            'category_id' => ['nullable', 'integer', 'exists:categories,id'],
            'short_description' => ['nullable', 'string', 'max:1000'],
            'full_description' => ['nullable', 'string'],
            'base_price' => ['required', 'numeric', 'min:0'],
            'compare_at_price' => ['nullable', 'numeric', 'min:0'],
            'primary_image' => ['nullable', 'string'],
            'gallery_images' => ['nullable', 'array'],
            'gallery_images.*' => ['string'],
            'status' => ['required', Rule::enum(ProductStatus::class)],
            'materials' => ['nullable', 'string', 'max:500'],
            'care_instructions' => ['nullable', 'string', 'max:500'],
            'collection_ids' => ['nullable', 'array'],
            'collection_ids.*' => ['integer', 'exists:collections,id'],
            'variants' => ['nullable', 'array'],
            'variants.*.sku' => ['required', 'string', 'max:100'],
            'variants.*.color' => ['required', 'string', 'max:50'],
            'variants.*.color_hex' => ['nullable', 'string', 'max:10'],
            'variants.*.size' => ['required', 'string', 'max:20'],
            'variants.*.stock_count' => ['required', 'integer', 'min:0'],
            'variants.*.price_adjustment' => ['nullable', 'numeric'],
        ];
    }
}
