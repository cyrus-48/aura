<script setup lang="ts">
import type { AdminCustomerAddress } from '@/types/customer';

defineProps<{
    addresses: AdminCustomerAddress[];
}>();
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
        <h3 class="mb-4 font-serif text-base text-aura-slate flex items-center justify-between">
            <span>Saved Addresses</span>
            <span class="rounded-full bg-aura-bg px-2 py-0.5 text-[10px] font-mono text-aura-moss">{{ addresses.length }}</span>
        </h3>
        <div v-if="addresses.length > 0" class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div
                v-for="address in addresses"
                :key="address.id"
                class="rounded-lg border border-aura-sage/60 bg-aura-bg/20 p-4 text-xs"
            >
                <div class="flex items-center justify-between mb-1.5">
                    <span class="font-semibold text-aura-slate uppercase text-[10px] tracking-wider">{{ address.type }}</span>
                    <span v-if="address.is_default" class="rounded bg-aura-sage px-1.5 py-0.5 text-[9px] font-medium text-aura-slate">Default</span>
                </div>
                <p class="font-medium text-aura-slate">{{ address.recipient_name }}</p>
                <p class="text-aura-moss">{{ address.address_line_1 }}</p>
                <p class="text-aura-moss">{{ address.city }}, {{ address.postal_code }}</p>
                <p class="text-aura-moss">{{ address.country }}</p>
            </div>
        </div>
        <div v-else class="py-6 text-center text-xs text-aura-moss">
            No saved addresses on file.
        </div>
    </div>
</template>
