<script setup lang="ts">
import type { OrderItemData } from '@/types/order';
import { formatPrice } from '@/utils';

defineProps<{
    items: OrderItemData[];
}>();
</script>

<template>
    <div class="rounded-2xl border border-aura-sage bg-white p-6 shadow-soft">
        <h2 class="font-serif text-lg text-aura-slate">Purchased Items</h2>
        <div class="mt-4 divide-y divide-aura-sage/50">
            <div
                v-for="item in items"
                :key="item.id"
                class="flex items-center justify-between py-4"
            >
                <div class="flex items-center gap-4">
                    <img
                        v-if="item.image"
                        :src="item.image"
                        :alt="item.productName"
                        class="h-14 w-14 rounded-lg bg-aura-sage object-cover mix-blend-multiply"
                    />
                    <div>
                        <div class="text-sm font-medium text-aura-slate">
                            {{ item.productName }}
                        </div>
                        <div class="text-xs text-aura-moss">
                            Qty: {{ item.quantity }} ·
                            {{ formatPrice(item.unitPrice) }} each
                        </div>
                    </div>
                </div>
                <div class="font-serif text-sm text-aura-slate">
                    {{ formatPrice(item.total) }}
                </div>
            </div>
        </div>
    </div>
</template>
