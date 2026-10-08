<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { OrderData } from '@/types/order';
import { formatDate, formatPrice } from '@/utils';

defineProps<{
    orders: OrderData[];
}>();
</script>

<template>
    <div class="space-y-4">
        <div
            v-if="orders.length === 0"
            class="rounded-2xl border border-dashed border-aura-sage py-12 text-center"
        >
            <p class="text-sm font-light text-aura-moss">
                You haven't placed any orders yet.
            </p>
            <Link
                href="/shop"
                class="mt-4 inline-block rounded bg-aura-slate px-6 py-3 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
            >
                Browse Shop
            </Link>
        </div>

        <div
            v-for="order in orders"
            :key="order.id"
            class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft transition hover:border-aura-slate"
        >
            <div
                class="flex flex-col justify-between gap-4 border-b border-aura-sage/40 pb-4 sm:flex-row sm:items-center"
            >
                <div>
                    <span
                        class="font-serif text-base font-medium text-aura-slate"
                    >
                        Order #{{ order.orderNumber }}
                    </span>
                    <span class="ml-2 text-xs text-aura-moss">
                        Placed on {{ formatDate(order.createdAt) }}
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <span
                        class="rounded bg-aura-sage/60 px-2.5 py-0.5 text-[10px] font-medium tracking-wider text-aura-slate uppercase"
                    >
                        {{ order.statusLabel }}
                    </span>
                    <span
                        class="font-serif text-sm font-medium text-aura-slate"
                    >
                        {{ formatPrice(order.total) }}
                    </span>
                </div>
            </div>

            <div
                class="mt-4 flex items-center justify-between text-xs text-aura-moss"
            >
                <span>Delivery: {{ order.shippingMethod }}</span>
                <Link
                    :href="`/orders/${order.orderNumber}/confirmation`"
                    class="flex items-center font-medium text-aura-slate hover:text-aura-moss"
                >
                    View Details
                    <i class="fa-solid fa-arrow-right ml-1.5 text-[10px]"></i>
                </Link>
            </div>
        </div>
    </div>
</template>
