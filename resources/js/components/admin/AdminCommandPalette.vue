<script setup lang="ts">
import { router } from '@inertiajs/vue3';
import { ref } from 'vue';
import { useCommandPalette } from '@/composables/useCommandPalette';

const { isOpen, close } = useCommandPalette();
const searchQuery = ref('');

const navigationItems = [
    {
        group: 'Pages',
        label: 'Dashboard',
        icon: 'fa-solid fa-gauge-high',
        href: '/admin',
    },
    {
        group: 'Pages',
        label: 'Products',
        icon: 'fa-solid fa-tags',
        href: '/admin/products',
    },
    {
        group: 'Pages',
        label: 'Categories',
        icon: 'fa-solid fa-layer-group',
        href: '/admin/categories',
    },
    {
        group: 'Pages',
        label: 'Collections',
        icon: 'fa-solid fa-bookmark',
        href: '/admin/collections',
    },
    {
        group: 'Pages',
        label: 'Inventory',
        icon: 'fa-solid fa-warehouse',
        href: '/admin/inventory',
    },
    {
        group: 'Pages',
        label: 'Orders',
        icon: 'fa-solid fa-box-open',
        href: '/admin/orders',
    },
    {
        group: 'Pages',
        label: 'Customers',
        icon: 'fa-solid fa-users',
        href: '/admin/customers',
    },
    {
        group: 'Pages',
        label: 'Discounts',
        icon: 'fa-solid fa-percent',
        href: '/admin/discounts',
    },
    {
        group: 'Pages',
        label: 'Payments',
        icon: 'fa-solid fa-credit-card',
        href: '/admin/payments',
    },
    {
        group: 'Pages',
        label: 'Store Settings',
        icon: 'fa-solid fa-gear',
        href: '/admin/settings',
    },
];

const actionItems = [
    {
        group: 'Actions',
        label: 'Create New Product',
        icon: 'fa-solid fa-plus',
        href: '/admin/products/create',
    },
    {
        group: 'Actions',
        label: 'Create Discount Code',
        icon: 'fa-solid fa-percent',
        href: '/admin/discounts/create',
    },
    {
        group: 'Actions',
        label: 'Adjust Stock',
        icon: 'fa-solid fa-boxes-stacked',
        href: '/admin/inventory',
    },
    {
        group: 'Actions',
        label: 'View Storefront',
        icon: 'fa-solid fa-arrow-up-right-from-square',
        href: '/',
    },
];

const handleSelect = (href: string) => {
    close();
    router.visit(href);
};
</script>

<template>
    <div
        v-if="isOpen"
        class="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]"
    >
        <!-- Backdrop -->
        <div
            class="backdrop-blur-xs absolute inset-0 bg-aura-slate/50 transition-opacity"
            @click="close"
        ></div>

        <!-- Palette Modal Container -->
        <div
            class="relative w-full max-w-lg overflow-hidden rounded-xl border border-aura-sage bg-white shadow-2xl"
        >
            <div class="flex items-center border-b border-aura-sage px-4">
                <i
                    class="fa-solid fa-magnifying-glass text-sm text-aura-moss"
                ></i>
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Type a command or search..."
                    class="flex-1 bg-transparent px-3 py-4 text-sm text-aura-slate outline-none placeholder:text-aura-moss"
                    autofocus
                />
                <button
                    type="button"
                    class="cursor-pointer rounded border border-aura-sage bg-aura-bg px-1.5 py-0.5 font-mono text-[9px] text-aura-moss"
                    @click="close"
                >
                    ESC
                </button>
            </div>

            <div class="no-scrollbar max-h-80 overflow-y-auto p-2">
                <!-- Group: Pages -->
                <p
                    class="px-2 py-1.5 text-[9px] font-semibold tracking-widest text-aura-moss uppercase"
                >
                    Pages
                </p>
                <div class="space-y-0.5">
                    <button
                        v-for="item in navigationItems.filter(
                            (i) =>
                                !searchQuery ||
                                i.label
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()),
                        )"
                        :key="item.label"
                        type="button"
                        class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-xs text-aura-slate transition hover:bg-aura-sage/40"
                        @click="handleSelect(item.href)"
                    >
                        <i
                            :class="[
                                item.icon,
                                'mr-3 w-4 text-xs text-aura-moss',
                            ]"
                        ></i>
                        <span>{{ item.label }}</span>
                    </button>
                </div>

                <!-- Group: Actions -->
                <p
                    class="mt-2 px-2 py-1.5 text-[9px] font-semibold tracking-widest text-aura-moss uppercase"
                >
                    Actions
                </p>
                <div class="space-y-0.5">
                    <button
                        v-for="action in actionItems.filter(
                            (a) =>
                                !searchQuery ||
                                a.label
                                    .toLowerCase()
                                    .includes(searchQuery.toLowerCase()),
                        )"
                        :key="action.label"
                        type="button"
                        class="flex w-full cursor-pointer items-center rounded-lg px-3 py-2 text-left text-xs text-aura-slate transition hover:bg-aura-sage/40"
                        @click="handleSelect(action.href)"
                    >
                        <i
                            :class="[
                                action.icon,
                                'mr-3 w-4 text-xs text-aura-moss',
                            ]"
                        ></i>
                        <span>{{ action.label }}</span>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
