<script setup lang="ts">
import type { OrderAddressData } from '@/types/order';

defineProps<{
    addresses: OrderAddressData[];
}>();
</script>

<template>
    <div>
        <div
            v-if="addresses.length === 0"
            class="rounded-2xl border border-dashed border-aura-sage py-12 text-center"
        >
            <p class="text-sm font-light text-aura-moss">
                No saved addresses on file.
            </p>
        </div>

        <div v-else class="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div
                v-for="addr in addresses"
                :key="addr.id"
                class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
            >
                <div class="flex items-center justify-between">
                    <span
                        class="text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
                    >
                        {{ addr.firstName }} {{ addr.lastName }}
                    </span>
                    <span
                        v-if="addr.isDefaultShipping"
                        class="rounded bg-aura-sage/60 px-2 py-0.5 text-[9px] font-medium tracking-wider text-aura-slate uppercase"
                    >
                        Default Shipping
                    </span>
                </div>

                <div class="mt-4 space-y-1 text-xs font-light text-aura-moss">
                    <p>{{ addr.addressLine1 }}</p>
                    <p v-if="addr.addressLine2">{{ addr.addressLine2 }}</p>
                    <p>
                        {{ addr.city }}, {{ addr.state || '' }}
                        {{ addr.postalCode }}
                    </p>
                    <p>{{ addr.country }}</p>
                    <p
                        v-if="addr.phone"
                        class="pt-2 text-[11px] text-aura-slate"
                    >
                        Phone: {{ addr.phone }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
