<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import CartEmptyState from '@/components/cart/CartEmptyState.vue';
import CartItemList from '@/components/cart/CartItemList.vue';
import CartPromoCode from '@/components/cart/CartPromoCode.vue';
import CartShippingMeter from '@/components/cart/CartShippingMeter.vue';
import CartSummary from '@/components/cart/CartSummary.vue';
import { useCart } from '@/composables/useCart';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { CartData } from '@/types/cart';

const props = defineProps<{
    cart: CartData;
}>();

const {
    cart,
    isUpdating,
    promoSuccess,
    promoError,
    subtotal,
    amountToFreeShipping,
    freeShippingProgress,
    isEligibleForFreeShipping,
    estimatedTax,
    estimatedShipping,
    promoDiscount,
    orderTotal,
    updateQuantity,
    removeItem,
    applyPromoCode,
} = useCart(props.cart);
</script>

<template>
    <StoreLayout title="Your Shopping Bag — Aura & Oak">
        <Head>
            <title>Your Bag | Aura & Oak</title>
            <meta
                name="description"
                content="Review your curated artisanal selections and proceed to checkout."
            />
        </Head>

        <!-- Page Header -->
        <header class="mx-auto w-full max-w-[1400px] px-6 py-8 md:py-12">
            <h1
                class="mb-2 font-serif text-3xl text-aura-slate md:text-4xl lg:text-5xl"
            >
                Shopping Bag
            </h1>
            <p class="text-xs font-light text-aura-moss md:text-sm">
                You have {{ cart.items.length }}
                {{ cart.items.length === 1 ? 'item' : 'items' }} in your bag.
                Free carbon-neutral shipping on orders over $99.
            </p>
        </header>

        <!-- Main Content -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <CartEmptyState v-if="cart.items.length === 0" />

            <div v-else class="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <!-- Cart Items (Left Side) -->
                <div class="w-full lg:w-2/3">
                    <CartShippingMeter
                        :amount-to-free-shipping="amountToFreeShipping"
                        :progress="freeShippingProgress"
                        :is-eligible="isEligibleForFreeShipping"
                    />

                    <CartItemList
                        :items="cart.items"
                        :updating-item-id="isUpdating"
                        @update-quantity="
                            ({ id, quantity }) => updateQuantity(id, quantity)
                        "
                        @remove-item="(id) => removeItem(id)"
                    />

                    <CartPromoCode
                        :promo-success="promoSuccess"
                        :promo-error="promoError"
                        @apply="applyPromoCode"
                    />
                </div>

                <!-- Order Summary (Right Side) -->
                <div class="w-full lg:w-1/3">
                    <CartSummary
                        :subtotal="subtotal"
                        :shipping="estimatedShipping"
                        :tax="estimatedTax"
                        :discount="promoDiscount"
                        :total="orderTotal"
                        :is-free-shipping="isEligibleForFreeShipping"
                    />
                </div>
            </div>
        </main>
    </StoreLayout>
</template>
