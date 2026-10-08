<script setup lang="ts">
import type { OrderAddressData } from '@/types/order';

defineProps<{
    address: OrderAddressData | null;
    paymentMethodLabel: string;
    shippingMethod: string;
}>();
</script>

<template>
    <div class="rounded-2xl border border-aura-sage bg-white p-6 shadow-soft">
        <h2 class="font-serif text-lg text-aura-slate">Delivery & Payment</h2>
        <div
            class="mt-4 grid grid-cols-1 gap-6 text-xs text-aura-moss sm:grid-cols-2"
        >
            <div>
                <span
                    class="block text-[10px] font-semibold tracking-wider text-aura-slate uppercase"
                    >Shipping Address</span
                >
                <div v-if="address" class="mt-2 space-y-0.5">
                    <p class="font-medium text-aura-slate">
                        {{ address.firstName }} {{ address.lastName }}
                    </p>
                    <p>{{ address.addressLine1 }}</p>
                    <p v-if="address.addressLine2">
                        {{ address.addressLine2 }}
                    </p>
                    <p>{{ address.city }}, {{ address.postalCode }}</p>
                    <p>{{ address.country }}</p>
                </div>
            </div>

            <div>
                <span
                    class="block text-[10px] font-semibold tracking-wider text-aura-slate uppercase"
                    >Payment & Delivery</span
                >
                <div class="mt-2 space-y-1">
                    <p>
                        <span class="text-aura-moss">Method:</span>
                        <span class="ml-1 font-medium text-aura-slate">{{
                            paymentMethodLabel
                        }}</span>
                    </p>
                    <p>
                        <span class="text-aura-moss">Courier:</span>
                        <span class="ml-1 font-medium text-aura-slate">{{
                            shippingMethod
                        }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
