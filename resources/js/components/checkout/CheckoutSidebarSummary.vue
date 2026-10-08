<script setup lang="ts">
import type { CartItemData } from '@/types/cart';
import { formatPrice } from '@/utils';

defineProps<{
    items: CartItemData[];
    subtotal: number;
    shippingCost: number;
    taxAmount: number;
    total: number;
}>();
</script>

<template>
    <div
        class="sticky top-24 rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft md:p-8"
    >
        <h2
            class="mb-6 border-b border-aura-sage pb-4 font-serif text-2xl text-aura-slate"
        >
            Order Summary
        </h2>

        <!-- Items list -->
        <div
            class="mb-6 max-h-80 space-y-4 divide-y divide-aura-sage/30 overflow-y-auto pr-1"
        >
            <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between pt-3 first:pt-0"
            >
                <div class="flex items-center space-x-3">
                    <div
                        class="relative h-14 w-12 shrink-0 overflow-hidden rounded-lg bg-aura-sage"
                    >
                        <img
                            v-if="item.product.primaryImage"
                            :src="item.product.primaryImage"
                            :alt="item.product.name"
                            class="h-full w-full object-cover mix-blend-multiply"
                        />
                        <span
                            class="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-aura-slate text-[9px] font-medium text-white"
                        >
                            {{ item.quantity }}
                        </span>
                    </div>
                    <div>
                        <div class="text-xs font-medium text-aura-slate">
                            {{ item.product.name }}
                        </div>
                        <div
                            v-if="item.variant"
                            class="text-[10px] text-aura-moss"
                        >
                            {{ item.variant.color || '' }}
                            <span
                                v-if="item.variant.color && item.variant.size"
                            >
                                ·
                            </span>
                            {{ item.variant.size || '' }}
                        </div>
                    </div>
                </div>
                <div class="text-xs font-medium text-aura-slate">
                    {{ formatPrice(item.lineTotal) }}
                </div>
            </div>
        </div>

        <!-- Summary Lines -->
        <div class="mb-6 space-y-3 border-t border-aura-sage pt-6 text-sm">
            <div class="flex justify-between text-aura-moss">
                <span>Subtotal</span>
                <span class="font-medium text-aura-slate">
                    {{ formatPrice(subtotal) }}
                </span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Shipping</span>
                <span class="font-medium text-aura-slate">
                    {{
                        shippingCost === 0 ? 'Free' : formatPrice(shippingCost)
                    }}
                </span>
            </div>
            <div class="flex justify-between text-aura-moss">
                <span>Estimated Tax</span>
                <span class="font-medium text-aura-slate">
                    {{ formatPrice(taxAmount) }}
                </span>
            </div>
        </div>

        <!-- Total -->
        <div
            class="mb-6 flex items-center justify-between border-t border-aura-sage pt-6"
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
                <i class="fa-solid fa-lock mr-2 text-aura-accent"></i> 256-bit
                encrypted checkout
            </p>
        </div>
    </div>
</template>
