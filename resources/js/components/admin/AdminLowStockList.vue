<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { AdminLowStockItem } from '@/types/admin';

defineProps<{
    items: AdminLowStockItem[];
}>();
</script>

<template>
    <div class="flex flex-col justify-between rounded-xl border border-aura-sage bg-white shadow-card">
        <div>
            <div class="flex items-center justify-between border-b border-aura-sage px-5 py-4">
                <div>
                    <h2 class="font-serif text-base text-aura-slate">Low Stock Alert</h2>
                    <p class="text-[10px] text-aura-moss">Items below threshold</p>
                </div>
                <span
                    v-if="items.length > 0"
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-red-100 text-[10px] font-semibold text-red-700"
                >
                    {{ items.length }}
                </span>
            </div>

            <div v-if="items.length > 0" class="divide-y divide-aura-sage/40">
                <Link
                    v-for="item in items"
                    :key="item.id"
                    :href="`/admin/products/${item.product_id}/edit`"
                    class="flex items-center space-x-3 px-5 py-3 transition hover:bg-aura-bg"
                >
                    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-aura-sage">
                        <img
                            v-if="item.image"
                            :src="item.image"
                            :alt="item.name"
                            class="h-full w-full object-cover mix-blend-multiply"
                            loading="lazy"
                        />
                        <div v-else class="flex h-full w-full items-center justify-center text-aura-moss">
                            <i class="fa-solid fa-box text-xs" />
                        </div>
                    </div>
                    <div class="min-w-0 flex-1">
                        <p class="truncate text-[11px] font-medium text-aura-slate">{{ item.name }}</p>
                        <p class="truncate text-[9px] text-aura-moss">{{ item.variant_label }}</p>
                    </div>
                    <div class="text-right">
                        <p
                            :class="[
                                'text-[11px] font-semibold',
                                item.stock_count <= 2 ? 'text-red-600' : 'text-amber-600',
                            ]"
                        >
                            {{ item.stock_count }} left
                        </p>
                        <p class="text-[8px] text-aura-moss">{{ item.sku }}</p>
                    </div>
                </Link>
            </div>
            <div v-else class="px-5 py-8 text-center text-xs text-aura-moss">
                All inventory levels are healthy.
            </div>
        </div>

        <div class="border-t border-aura-sage px-5 py-3">
            <Link
                href="/admin/inventory"
                class="flex items-center justify-center text-[10px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
            >
                Manage Inventory <i class="fa-solid fa-arrow-right ml-2 text-[8px]" />
            </Link>
        </div>
    </div>
</template>
