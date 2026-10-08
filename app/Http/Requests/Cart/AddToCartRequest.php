<?php

declare(strict_types=1);

namespace App\Http\Requests\Cart;

use App\Models\ProductVariant;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;

class AddToCartRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'product_variant_id' => ['required', 'integer', 'exists:product_variants,id'],
            'quantity' => ['nullable', 'integer', 'min:1', 'max:50'],
        ];
    }

    /**
     * Prepare input for validation.
     */
    protected function prepareForValidation(): void
    {
        $variantId = $this->input('product_variant_id')
            ?? $this->input('variant_id')
            ?? $this->input('variantId');

        if ($variantId === null && $this->filled('product_id')) {
            $variant = ProductVariant::query()
                ->where('product_id', $this->input('product_id'))
                ->where('stock_count', '>', 0)
                ->first()
                ?? ProductVariant::query()
                    ->where('product_id', $this->input('product_id'))
                    ->first();

            $variantId = $variant?->id;
        }

        $this->merge([
            'product_variant_id' => $variantId ? (int) $variantId : null,
            'quantity' => (int) $this->input('quantity', 1),
        ]);
    }

    /**
     * Get custom error messages for validation failures.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'product_variant_id.required' => 'Please select a product variant or size.',
            'product_variant_id.exists' => 'Selected product variant is not available.',
        ];
    }

    /**
     * Get validated variant id.
     */
    public function variantId(): int
    {
        return (int) $this->validated('product_variant_id');
    }

    /**
     * Get validated quantity.
     */
    public function quantity(): int
    {
        return (int) ($this->validated('quantity') ?? 1);
    }
}
