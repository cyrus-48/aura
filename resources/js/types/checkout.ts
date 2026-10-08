/**
 * Types representing checkout flow and submission data.
 */

export interface CheckoutShippingAddressInput {
    firstName: string;
    lastName: string;
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
}

export interface CheckoutFormData {
    email: string;
    phone: string;
    shippingMethod: string;
    paymentMethod: string;
    shippingAddress: CheckoutShippingAddressInput;
    notes: string;
    cardNumber?: string;
    cardExpiry?: string;
    cardCvc?: string;
    cardName?: string;
    mpesaPhone?: string;
    airtelPhone?: string;
}

export interface ShippingMethodOption {
    id: string;
    name: string;
    rate: number;
    estimatedDays: string;
    description: string;
}
