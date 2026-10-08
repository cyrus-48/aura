<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { formatPrice } from '@/utils';

defineProps<{
    subtotal: number;
    shipping: number;
    tax: number;
    discount: number;
    total: number;
    isFreeShipping: boolean;
}>();
</script>

<template>
    <div
        class="sticky top-24 rounded-2xl border border-aura-sage/50 bg-white p-8 shadow-soft"
    >
        <h2
            class="mb-6 border-b border-aura-sage pb-4 font-serif text-2xl text-aura-slate"
        >
            Order Summary
        </h2>

        <!-- Summary Lines -->
        <div class="mb-6 space-y-4 text-sm">
            <div class="flex justify-between text-aura-moss">
                <span>Subtotal</span>
                <span class="font-medium text-aura-slate">
                    {{ formatPrice(subtotal) }}
                </span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Shipping</span>
                <span class="font-medium text-aura-slate">
                    {{ isFreeShipping ? 'Free' : formatPrice(shipping) }}
                </span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Estimated Tax</span>
                <span class="font-medium text-aura-slate">
                    {{ formatPrice(tax) }}
                </span>
            </div>
            <div v-if="discount > 0" class="flex justify-between text-red-600">
                <span>Discount</span>
                <span class="font-medium">−{{ formatPrice(discount) }}</span>
            </div>
        </div>

        <slot name="promo" />

        <!-- Total -->
        <div
            class="mt-6 mb-8 flex items-center justify-between border-t border-aura-sage pt-6"
        >
            <span
                class="text-sm font-semibold tracking-widest text-aura-slate uppercase"
            >
                Total
            </span>
            <span class="font-serif text-2xl text-aura-slate">
                {{ formatPrice(total) }}
            </span>
        </div>

        <!-- Checkout Button -->
        <Link
            href="/checkout"
            class="mb-4 flex w-full items-center justify-center rounded bg-aura-slate py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss"
        >
            <i class="fa-solid fa-lock mr-2 text-[10px]"></i>
            Secure Checkout
        </Link>

        <!-- Payment Icons -->
        <div class="mb-6 flex justify-center space-x-3 text-2xl text-aura-moss">
            <i
                class="fa-brands fa-cc-visa transition hover:text-aura-slate"
            ></i>
            <i
                class="fa-brands fa-cc-mastercard transition hover:text-aura-slate"
            ></i>
            <i
                class="fa-brands fa-cc-amex transition hover:text-aura-slate"
            ></i>
            <i
                class="fa-brands fa-cc-paypal transition hover:text-aura-slate"
            ></i>
            <i
                class="fa-brands fa-apple-pay transition hover:text-aura-slate"
            ></i>
        </div>

        <!-- Trust Badges -->
        <div class="space-y-2 border-t border-aura-sage pt-6 text-center">
            <p
                class="flex items-center justify-center text-[10px] text-aura-moss"
            >
                <i class="fa-solid fa-leaf mr-2 text-aura-accent"></i> Carbon
                neutral shipping on all orders
            </p>
            <p
                class="flex items-center justify-center text-[10px] text-aura-moss"
            >
                <i
                    class="fa-solid fa-arrow-rotate-left mr-2 text-aura-accent"
                ></i>
                45-day easy returns & exchanges
            </p>
        </div>
    </div>
</template>
