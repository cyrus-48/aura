<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import StatusBadge from '@/components/admin/StatusBadge.vue';
import type { AdminTopProduct } from '@/types/admin';

defineProps<{
    products: AdminTopProduct[];
}>();
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white shadow-card">
        <div class="flex items-center justify-between border-b border-aura-sage px-5 py-4">
            <div>
                <h2 class="font-serif text-base text-aura-slate">Top Selling Products</h2>
                <p class="text-[10px] text-aura-moss">Best performers this month</p>
            </div>
            <Link
                href="/admin/products"
                class="text-[10px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
            >
                View Catalog <i class="fa-solid fa-arrow-right ml-1 text-[8px]" />
            </Link>
        </div>

        <div class="overflow-x-auto">
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-aura-sage/60">
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Product</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Category</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Units Sold</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Revenue</th>
                        <th class="px-5 py-3 text-[9px] font-semibold tracking-widest text-aura-moss uppercase">Stock</th>
                    </tr>
                </thead>
                <tbody v-if="products.length > 0">
                    <tr
                        v-for="product in products"
                        :key="product.id"
                        class="border-b border-aura-sage/40 transition hover:bg-aura-bg/60 last:border-b-0"
                    >
                        <td class="px-5 py-3">
                            <Link :href="`/admin/products/${product.id}/edit`" class="flex items-center space-x-3">
                                <div class="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-aura-sage">
                                    <img
                                        v-if="product.primary_image"
                                        :src="product.primary_image"
                                        :alt="product.name"
                                        class="h-full w-full object-cover mix-blend-multiply"
                                        loading="lazy"
                                    />
                                    <div v-else class="flex h-full w-full items-center justify-center text-aura-moss">
                                        <i class="fa-solid fa-box text-xs" />
                                    </div>
                                </div>
                                <span class="text-[11px] font-medium text-aura-slate hover:underline">
                                    {{ product.name }}
                                </span>
                            </Link>
                        </td>
                        <td class="px-5 py-3 text-[11px] text-aura-moss">
                            {{ product.category_name }}
                        </td>
                        <td class="px-5 py-3 text-[11px] font-semibold text-aura-slate">
                            {{ product.units_sold }}
                        </td>
                        <td class="px-5 py-3 font-serif text-xs font-semibold text-aura-slate">
                            {{ product.formatted_revenue }}
                        </td>
                        <td class="px-5 py-3">
                            <StatusBadge :label="product.stock_status" :color="product.stock_color" />
                        </td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr>
                        <td colspan="5" class="px-5 py-8 text-center text-xs text-aura-moss">
                            No product sales recorded for this period yet.
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
