<?php

declare(strict_types=1);

namespace App\Http\Requests\Checkout;

use App\Enums\PaymentMethod;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class CheckoutRequest extends FormRequest
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
            'first_name' => ['required', 'string', 'max:100'],
            'last_name' => ['required', 'string', 'max:100'],
            'email' => ['required', 'email', 'max:255'],
            'phone' => ['required', 'string', 'max:30'],
            'address_line_1' => ['required', 'string', 'max:255'],
            'address_line_2' => ['nullable', 'string', 'max:255'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['nullable', 'string', 'max:100'],
            'postal_code' => ['required', 'string', 'max:20'],
            'country' => ['required', 'string', 'max:100'],
            'shipping_method' => ['required', 'string', 'in:standard,express'],
            'payment_method' => ['required', new Enum(PaymentMethod::class)],
            'notes' => ['nullable', 'string', 'max:500'],
            'card_token' => ['nullable', 'string', 'max:255'],
            'card_name' => ['nullable', 'string', 'max:255'],
            'mpesa_phone' => ['nullable', 'string', 'max:30'],
            'airtel_phone' => ['nullable', 'string', 'max:30'],
        ];
    }

    /**
     * Prepare the data for validation.
     */
    protected function prepareForValidation(): void
    {
        $shipping = $this->input('shippingAddress', []);

        $paymentMethod = (string) $this->input('payment_method', $this->input('paymentMethod', 'mpesa'));
        if ($paymentMethod === 'card') {
            $paymentMethod = 'stripe';
        }

        $phone = $this->input('phone', $this->input('mpesaPhone', is_array($shipping) ? ($shipping['phone'] ?? null) : null));
        $mpesaPhone = $this->input('mpesaPhone', $this->input('mpesa_phone', $phone));
        $airtelPhone = $this->input('airtelPhone', $this->input('airtel_phone', $phone));

        $this->merge([
            'first_name' => $this->input('first_name', is_array($shipping) ? ($shipping['firstName'] ?? null) : null),
            'last_name' => $this->input('last_name', is_array($shipping) ? ($shipping['lastName'] ?? null) : null),
            'email' => $this->input('email') ? strtolower(trim((string) $this->input('email'))) : null,
            'phone' => $phone ? trim((string) $phone) : null,
            'mpesa_phone' => $mpesaPhone ? trim((string) $mpesaPhone) : null,
            'airtel_phone' => $airtelPhone ? trim((string) $airtelPhone) : null,
            'address_line_1' => $this->input('address_line_1', is_array($shipping) ? ($shipping['addressLine1'] ?? null) : null),
            'address_line_2' => $this->input('address_line_2', is_array($shipping) ? ($shipping['addressLine2'] ?? null) : null),
            'city' => $this->input('city', is_array($shipping) ? ($shipping['city'] ?? null) : null),
            'state' => $this->input('state', is_array($shipping) ? ($shipping['state'] ?? null) : null),
            'postal_code' => $this->input('postal_code', is_array($shipping) ? ($shipping['postalCode'] ?? null) : null),
            'country' => $this->input('country', is_array($shipping) ? ($shipping['country'] ?? 'Kenya') : 'Kenya'),
            'shipping_method' => $this->input('shipping_method', $this->input('shippingMethod', 'standard')),
            'payment_method' => $paymentMethod,
            'card_token' => $this->input('card_token', $this->input('cardNumber') ? 'tok_visa' : null),
            'card_name' => $this->input('card_name', $this->input('cardName')),
        ]);
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'payment_method.required' => 'Please select a preferred payment method.',
            'shipping_method.required' => 'Please select a shipping option.',
        ];
    }
}
