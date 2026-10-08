<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import StatusBadge from '@/components/admin/StatusBadge.vue';
import type { AdminRecentOrder } from '@/types/admin';

defineProps<{
    orders: AdminRecentOrder[];
}>();
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white shadow-card lg:col-span-2">
        <div class="flex items-center justify-between border-b border-aura-sage px-5 py-4">
            <div>
                <h2 class="font-serif text-base text-aura-slate">Recent Orders</h2>
                <p class="text-[10px] text-aura-moss">Last 10 orders placed</p>
            </div>
            <Link
                href="/admin/orders"
                class="text-[10px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
            >
                View All <i class="fa-solid fa-arrow-right ml-1 text-[8px]" />
            </Link>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-aura-sage/60">
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Order</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Customer</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Total</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Status</th>
                        <th class="px-5 py-3 text-right text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Actions</th>
                    </tr>
                </thead>
                <tbody v-if="orders.length > 0">
                    <tr
                        v-for="order in orders"
                        :key="order.id"
                        class="border-b border-aura-sage/40 transition hover:bg-aura-bg/60 last:border-b-0"
                    >
                        <td class="px-5 py-3 font-mono text-[11px] font-semibold text-aura-slate">
                            <Link :href="`/admin/orders/${order.id}`" class="hover:underline">
                                {{ order.order_number }}
                            </Link>
                        </td>
                        <td class="px-5 py-3">
                            <p class="text-[11px] font-medium text-aura-slate">{{ order.customer_name }}</p>
                            <p class="text-[9px] text-aura-moss">{{ order.customer_email }}</p>
                        </td>
                        <td class="px-5 py-3 font-serif text-xs font-semibold text-aura-slate">
                            {{ order.formatted_total }}
                        </td>
                        <td class="px-5 py-3">
                            <StatusBadge :label="order.status_label" :color="order.status_color" />
                        </td>
                        <td class="px-5 py-3 text-right">
                            <Link
                                :href="`/admin/orders/${order.id}`"
                                class="inline-flex h-7 w-7 items-center justify-center rounded text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate"
                                aria-label="View order details"
                            >
                                <i class="fa-solid fa-chevron-right text-xs" />
                            </Link>
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" class="px-5 py-8 text-center text-xs text-aura-moss">
                            No recent orders recorded today.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
