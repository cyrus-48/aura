import { computed, ref, watch } from 'vue';
import { router } from '@inertiajs/vue3';
import type { CartData } from '@/types/cart';

/**
 * Composable managing cart state, quantities, promotions, and shipping progress.
 * Adheres to Rule 4: accepts initial data, returns refs and functions, unit-testable without mounting.
 */
export function useCart(initialCart: CartData) {
    const cart = ref<CartData>(initialCart);

    watch(
        () => initialCart,
        (newVal) => {
            if (newVal) {
                cart.value = newVal;
            }
        },
        { deep: true },
    );

    const isUpdating = ref<number | null>(null);
    const promoCode = ref('');
    const promoDiscount = ref(0);
    const promoError = ref<string | null>(null);
    const promoSuccess = ref<string | null>(null);

    const FREE_SHIPPING_THRESHOLD = 99.0;

    const subtotal = computed(() => {
        return cart.value.subtotal || 0;
    });

    const amountToFreeShipping = computed(() => {
        return Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal.value);
    });

    const freeShippingProgress = computed(() => {
        return Math.min(
            100,
            Math.round((subtotal.value / FREE_SHIPPING_THRESHOLD) * 100),
        );
    });

    const isEligibleForFreeShipping = computed(() => {
        return subtotal.value >= FREE_SHIPPING_THRESHOLD;
    });

    const estimatedTax = computed(() => {
        return subtotal.value * 0.08;
    });

    const estimatedShipping = computed(() => {
        if (subtotal.value === 0) {
            return 0;
        }
        return isEligibleForFreeShipping.value ? 0 : 12.0;
    });

    const orderTotal = computed(() => {
        return Math.max(
            0,
            subtotal.value +
                estimatedShipping.value +
                estimatedTax.value -
                promoDiscount.value,
        );
    });

    function updateQuantity(itemId: number, newQuantity: number): void {
        if (newQuantity < 1) {
            removeItem(itemId);
            return;
        }

        isUpdating.value = itemId;

        router.patch(
            `/cart/${itemId}`,
            { quantity: newQuantity },
            {
                preserveScroll: true,
                onFinish: () => {
                    isUpdating.value = null;
                },
            },
        );
    }

    function removeItem(itemId: number): void {
        isUpdating.value = itemId;

        router.delete(`/cart/${itemId}`, {
            preserveScroll: true,
            onFinish: () => {
                isUpdating.value = null;
            },
        });
    }

    function applyPromoCode(code: string): void {
        const trimmed = code.trim().toUpperCase();
        if (!trimmed) {
            promoError.value = 'Please enter a voucher code.';
            return;
        }

        if (trimmed === 'AURA10') {
            promoDiscount.value = subtotal.value * 0.1;
            promoSuccess.value = '10% artisanal welcome discount applied!';
            promoError.value = null;
        } else if (trimmed === 'HARVEST20') {
            promoDiscount.value = subtotal.value * 0.2;
            promoSuccess.value = '20% seasonal coupon applied!';
            promoError.value = null;
        } else {
            promoError.value = 'Invalid or expired promotional code.';
            promoSuccess.value = null;
        }
    }

    return {
        cart,
        isUpdating,
        promoCode,
        promoDiscount,
        promoError,
        promoSuccess,
        subtotal,
        amountToFreeShipping,
        freeShippingProgress,
        isEligibleForFreeShipping,
        estimatedTax,
        estimatedShipping,
        orderTotal,
        updateQuantity,
        removeItem,
        applyPromoCode,
    };
}
