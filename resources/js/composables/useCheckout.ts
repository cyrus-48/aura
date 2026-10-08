import { computed, ref } from 'vue';
import { useForm } from '@inertiajs/vue3';
import type { CartData } from '@/types/cart';
import type { CheckoutFormData, ShippingMethodOption } from '@/types/checkout';
import type { OrderAddressData } from '@/types/order';

/**
 * Composable managing the multi-step checkout workflow and submission state.
 * Adheres to Rule 4: accepts initial data, returns refs and methods.
 */
export function useCheckout(
    cart: CartData,
    defaultAddress: OrderAddressData | null,
) {
    const currentStep = ref<number>(1);

    const shippingOptions: ShippingMethodOption[] = [
        {
            id: 'standard',
            name: 'Standard Carbon-Neutral Delivery',
            rate: cart.subtotal >= 99 ? 0 : 15,
            estimatedDays: '3–5 business days',
            description:
                'Carefully packaged with 100% recycled biodegradable cushioning.',
        },
        {
            id: 'express',
            name: 'Express White Glove Courier',
            rate: 25,
            estimatedDays: '1–2 business days',
            description:
                'Direct courier delivery with real-time GPS tracking and signature verification.',
        },
    ];

    const form = useForm<CheckoutFormData>({
        email: defaultAddress?.email || '',
        phone: defaultAddress?.phone || '',
        shippingMethod: 'standard',
        paymentMethod: 'mpesa',
        shippingAddress: {
            firstName: defaultAddress?.firstName || '',
            lastName: defaultAddress?.lastName || '',
            addressLine1: defaultAddress?.addressLine1 || '',
            addressLine2: defaultAddress?.addressLine2 || '',
            city: defaultAddress?.city || '',
            state: defaultAddress?.state || '',
            postalCode: defaultAddress?.postalCode || '',
            country: defaultAddress?.country || 'Kenya',
        },
        notes: '',
        cardNumber: '',
        cardExpiry: '',
        cardCvc: '',
        cardName: defaultAddress ? `${defaultAddress.firstName} ${defaultAddress.lastName}`.trim() : '',
        mpesaPhone: defaultAddress?.phone || '',
        airtelPhone: defaultAddress?.phone || '',
    });

    const selectedShippingOption = computed(() => {
        return (
            shippingOptions.find((opt) => opt.id === form.shippingMethod) ||
            shippingOptions[0]
        );
    });

    const shippingCost = computed(() => {
        return selectedShippingOption.value.rate;
    });

    const taxAmount = computed(() => {
        return Number((cart.subtotal * 0.16).toFixed(2));
    });

    const totalAmount = computed(() => {
        return Number((cart.subtotal + shippingCost.value + taxAmount.value).toFixed(2));
    });

    function validateStep1(): boolean {
        form.clearErrors();
        let valid = true;

        if (!form.email || !form.email.trim()) {
            form.setError('email', 'Email address is required.');
            valid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
            form.setError('email', 'Please provide a valid email address.');
            valid = false;
        }

        if (!form.phone || !form.phone.trim()) {
            form.setError('phone', 'Phone number is required.');
            valid = false;
        }

        if (!form.shippingAddress.firstName?.trim()) {
            form.setError('first_name', 'First name is required.');
            valid = false;
        }

        if (!form.shippingAddress.lastName?.trim()) {
            form.setError('last_name', 'Last name is required.');
            valid = false;
        }

        if (!form.shippingAddress.addressLine1?.trim()) {
            form.setError('address_line_1', 'Street address is required.');
            valid = false;
        }

        if (!form.shippingAddress.city?.trim()) {
            form.setError('city', 'City is required.');
            valid = false;
        }

        if (!form.shippingAddress.postalCode?.trim()) {
            form.setError('postal_code', 'Postal / ZIP code is required.');
            valid = false;
        }

        return valid;
    }

    function setStep(step: number): void {
        if (step < 1 || step > 3) {
            return;
        }
        if (step > 1 && !validateStep1()) {
            return;
        }
        currentStep.value = step;
    }

    function nextStep(): void {
        if (currentStep.value === 1) {
            if (!validateStep1()) {
                return;
            }
            if (!form.mpesaPhone) {
                form.mpesaPhone = form.phone;
            }
            if (!form.airtelPhone) {
                form.airtelPhone = form.phone;
            }
        }

        if (currentStep.value < 3) {
            currentStep.value += 1;
        }
    }

    function prevStep(): void {
        if (currentStep.value > 1) {
            currentStep.value -= 1;
        }
    }

    function submitOrder(): void {
        if (form.paymentMethod === 'mpesa' && !form.mpesaPhone) {
            form.mpesaPhone = form.phone;
        }
        if (form.paymentMethod === 'airtel' && !form.airtelPhone) {
            form.airtelPhone = form.phone;
        }

        form.post('/checkout', {
            preserveScroll: true,
            onError: (errors) => {
                const step1Fields = [
                    'email',
                    'phone',
                    'first_name',
                    'last_name',
                    'address_line_1',
                    'address_line_2',
                    'city',
                    'state',
                    'postal_code',
                    'country',
                ];
                if (Object.keys(errors).some((key) => step1Fields.includes(key))) {
                    currentStep.value = 1;
                    return;
                }
                if (errors.shipping_method) {
                    currentStep.value = 2;
                }
            },
        });
    }

    return {
        currentStep,
        shippingOptions,
        form,
        selectedShippingOption,
        shippingCost,
        taxAmount,
        totalAmount,
        setStep,
        nextStep,
        prevStep,
        submitOrder,
    };
}
