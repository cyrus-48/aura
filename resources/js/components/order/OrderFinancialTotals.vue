<script setup lang="ts">
import { formatPrice } from '@/utils';

defineProps<{
    subtotal: number;
    shippingCost: number;
    taxAmount: number;
    discountAmount: number;
    total: number;
}>();
</script>

<template>
    <div class="rounded-2xl border border-aura-sage bg-white p-6 shadow-soft">
        <h2 class="font-serif text-lg text-aura-slate">Total Breakdown</h2>
        <div class="mt-4 space-y-2 text-xs">
            <div class="flex justify-between text-aura-moss">
                <span>Subtotal</span>
                <span class="font-medium text-aura-slate">{{
                    formatPrice(subtotal)
                }}</span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Shipping</span>
                <span class="font-medium text-aura-slate">
                    {{
                        shippingCost === 0
                            ? 'Complimentary'
                            : formatPrice(shippingCost)
                    }}
                </span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Taxes</span>
                <span class="font-medium text-aura-slate">{{
                    formatPrice(taxAmount)
                }}</span>
            </div>
            <div
                v-if="discountAmount > 0"
                class="flex justify-between text-aura-moss"
            >
                <span>Discount</span>
                <span class="font-medium text-aura-slate"
                    >−{{ formatPrice(discountAmount) }}</span
                >
            </div>
            <div
                class="flex justify-between border-t border-aura-sage pt-3 font-serif text-base text-aura-slate"
            >
                <span>Total Paid</span>
                <span>{{ formatPrice(total) }}</span>
            </div>
        </div>
    </div>
</template>
