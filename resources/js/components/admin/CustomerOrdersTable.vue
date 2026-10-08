<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { AdminCustomerOrder } from '@/types/customer';

defineProps<{
    orders: AdminCustomerOrder[];
}>();
</script>

<template>
    <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
        <div class="border-b border-aura-sage px-5 py-4 flex items-center justify-between">
            <h3 class="font-serif text-base text-aura-slate">Order History ({{ orders.length }})</h3>
        </div>
        <div v-if="orders.length > 0" class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-aura-sage/60 bg-aura-bg/20 text-[9px] font-semibold text-aura-moss uppercase">
                        <th class="px-5 py-3">Order Number</th>
                        <th class="px-5 py-3">Date</th>
                        <th class="px-5 py-3 text-center">Items</th>
                        <th class="px-5 py-3">Status</th>
                        <th class="px-5 py-3 text-right">Total</th>
                        <th class="px-5 py-3 text-right">Action</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-aura-sage/40">
                    <tr v-for="order in orders" :key="order.id" class="text-xs transition hover:bg-aura-bg/30">
                        <td class="px-5 py-3.5 font-mono font-medium text-aura-slate">
                            #{{ order.order_number }}
                        </td>
                        <td class="px-5 py-3.5 text-aura-moss">{{ order.created_at }}</td>
                        <td class="px-5 py-3.5 text-center text-aura-slate">{{ order.items_count }}</td>
                        <td class="px-5 py-3.5">
                            <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold', order.status_color]">
                                {{ order.status_label }}
                            </span>
                        </td>
                        <td class="px-5 py-3.5 text-right font-serif font-medium text-aura-slate">
                            {{ order.formatted_total }}
                        </td>
                        <td class="px-5 py-3.5 text-right">
                            <Link
                                :href="`/admin/orders/${order.id}`"
                                class="inline-flex items-center text-xs font-semibold text-aura-moss hover:text-aura-slate"
                            >
                                View Order
                                <i class="fa-solid fa-chevron-right ml-1 text-[9px]"></i>
                            </Link>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div v-else class="p-8 text-center text-xs text-aura-moss">
            No orders placed yet.
        </div>
    </div>
</template>
