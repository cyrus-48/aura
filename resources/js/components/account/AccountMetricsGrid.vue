<script setup lang="ts">
import type { AccountMetrics } from '@/types/account';
import { formatPrice } from '@/utils';

defineProps<{
    metrics: AccountMetrics;
}>();
</script>

<template>
    <div class="grid grid-cols-2 gap-6 lg:grid-cols-4">
        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
        >
            <span
                class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
            >
                Total Orders
            </span>
            <div class="mt-2 font-serif text-3xl text-aura-slate">
                {{ metrics.totalOrders }}
            </div>
        </div>

        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
        >
            <span
                class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
            >
                Active Orders
            </span>
            <div class="mt-2 font-serif text-3xl text-aura-slate">
                {{ metrics.pendingOrders }}
            </div>
        </div>

        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
        >
            <span
                class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
            >
                Delivered
            </span>
            <div class="mt-2 font-serif text-3xl text-aura-slate">
                {{ metrics.deliveredOrders }}
            </div>
        </div>

        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft"
        >
            <span
                class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
            >
                Total Invested
            </span>
            <div class="mt-2 font-serif text-3xl text-aura-slate">
                {{ formatPrice(metrics.lifetimeSpend) }}
            </div>
        </div>
    </div>
</template>
