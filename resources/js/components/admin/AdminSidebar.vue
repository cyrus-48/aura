<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useAdminSidebar } from '@/composables/useAdminSidebar';
import type { AdminSidebarCounts } from '@/types/admin';

const props = defineProps<{
    counts?: AdminSidebarCounts;
}>();

const page = usePage();
const { isCollapsed, isMobileOpen, toggleCollapse, closeMobile } = useAdminSidebar();

const currentPath = computed(() => page.url);
const authUser = computed(() => page.props.auth?.user as { name?: string; role?: string } | undefined);
const userName = computed(() => authUser.value?.name ?? 'Atelier Staff');
const userRole = computed(() => authUser.value?.role ? authUser.value.role.charAt(0).toUpperCase() + authUser.value.role.slice(1) : 'Administrator');
const userInitials = computed(() => {
    return userName.value
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'AO';
});

const isRouteActive = (href: string) => {
    if (href === '/admin') {
        return currentPath.value === '/admin' || currentPath.value === '/admin/';
    }
    return currentPath.value.startsWith(href);
};

const navigationSections = computed(() => [
    {
        title: '',
        items: [
            { label: 'Dashboard', href: '/admin', icon: 'fa-solid fa-gauge-high' },
        ],
    },
    {
        title: 'Catalog',
        items: [
            { label: 'Products', href: '/admin/products', icon: 'fa-solid fa-tags', badge: props.counts?.products, badgeClass: 'bg-aura-sage text-aura-slate' },
            { label: 'Categories', href: '/admin/categories', icon: 'fa-solid fa-layer-group' },
            { label: 'Collections', href: '/admin/collections', icon: 'fa-solid fa-bookmark' },
            { label: 'Inventory', href: '/admin/inventory', icon: 'fa-solid fa-warehouse', badge: props.counts?.low_stock, badgeClass: 'bg-amber-100 text-amber-800' },
        ],
    },
    {
        title: 'Sales',
        items: [
            { label: 'Orders', href: '/admin/orders', icon: 'fa-solid fa-box-open', badge: props.counts?.pending_orders, badgeClass: 'bg-aura-slate text-white' },
            { label: 'Customers', href: '/admin/customers', icon: 'fa-solid fa-users' },
            { label: 'Discounts', href: '/admin/discounts', icon: 'fa-solid fa-percent' },
            { label: 'Payments', href: '/admin/payments', icon: 'fa-solid fa-credit-card' },
        ],
    },
    {
        title: 'Content',
        items: [
            { label: 'Journal', href: '/admin/journal', icon: 'fa-solid fa-newspaper' },
            { label: 'Pages', href: '/admin/pages', icon: 'fa-solid fa-file-lines' },
            { label: 'Media', href: '/admin/media', icon: 'fa-regular fa-image' },
        ],
    },
    {
        title: 'Settings',
        items: [
            { label: 'Store Settings', href: '/admin/settings', icon: 'fa-solid fa-gear' },
            { label: 'Staff', href: '/admin/staff', icon: 'fa-solid fa-user-tie' },
        ],
    },
]);
</script>

<template>
    <aside
        :class="[
            'fixed inset-y-0 left-0 z-50 flex h-full shrink-0 flex-col border-r border-aura-sage bg-white transition-all duration-200 lg:static lg:h-full lg:translate-x-0',
            isCollapsed ? 'w-18' : 'w-60',
            isMobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        ]"
    >
        <Teleport to="body">
            <div
                v-if="isMobileOpen"
                class="fixed inset-0 z-40 bg-aura-slate/40 backdrop-blur-xs lg:hidden"
                @click="closeMobile"
            />
        </Teleport>

        <div :class="['flex h-16 shrink-0 items-center border-b border-aura-sage px-4', isCollapsed ? 'justify-center px-2' : 'justify-between']">
            <Link
                href="/admin"
                :class="['flex flex-col items-start overflow-hidden hover:opacity-85', isCollapsed ? 'hidden' : 'block']"
            >
                <span class="font-serif text-lg tracking-[0.15em] text-aura-slate uppercase leading-none whitespace-nowrap">Aura & Oak</span>
                <span class="mt-1 text-[8px] tracking-[0.35em] text-aura-moss uppercase whitespace-nowrap">Admin Panel</span>
            </Link>

            <button
                type="button"
                class="flex h-8 w-8 items-center justify-center rounded-md text-aura-moss transition hover:bg-aura-sage/50 hover:text-aura-slate cursor-pointer"
                aria-label="Toggle sidebar"
                @click="toggleCollapse"
            >
                <i :class="['fa-solid text-[10px]', isCollapsed ? 'fa-chevron-right' : 'fa-chevron-left']" />
            </button>
        </div>

        <nav class="no-scrollbar flex-1 overflow-y-auto py-4">
            <div v-for="section in navigationSections" :key="section.title || 'main'" class="mb-4">
                <h3 v-if="!isCollapsed && section.title" class="mb-2 px-6 text-[9px] font-semibold tracking-[0.2em] text-aura-moss uppercase">
                    {{ section.title }}
                </h3>
                <div class="space-y-0.5">
                    <Link
                        v-for="item in section.items"
                        :key="item.href"
                        :href="item.href"
                        :title="isCollapsed ? item.label : undefined"
                        :class="[
                            'mx-3 flex items-center rounded-lg px-3 py-2 text-sm font-medium transition',
                            isRouteActive(item.href)
                                ? 'bg-aura-slate text-white font-medium'
                                : 'text-aura-moss hover:bg-aura-sage/40 hover:text-aura-slate',
                            isCollapsed ? 'justify-center px-0' : '',
                        ]"
                    >
                        <i :class="[item.icon, 'text-xs', isCollapsed ? '' : 'mr-3 w-4 text-center']" />
                        <span v-if="!isCollapsed" class="whitespace-nowrap">{{ item.label }}</span>
                        <span
                            v-if="!isCollapsed && item.badge"
                            :class="[
                                'ml-auto rounded-full px-2 py-0.5 text-[9px] font-semibold',
                                isRouteActive(item.href) ? 'bg-white/20 text-white' : item.badgeClass
                            ]"
                        >
                            {{ item.badge }}
                        </span>
                    </Link>
                </div>
            </div>
        </nav>

        <div class="border-t border-aura-sage p-3 shrink-0">
            <div :class="['flex items-center rounded-lg transition hover:bg-aura-sage/40', isCollapsed ? 'justify-center p-1' : 'p-2']">
                <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aura-slate font-serif text-xs text-white">
                    {{ userInitials }}
                </div>
                <div v-if="!isCollapsed" class="ml-3 min-w-0 flex-1">
                    <p class="truncate text-xs font-semibold text-aura-slate">{{ userName }}</p>
                    <p class="truncate text-[10px] text-aura-moss">{{ userRole }}</p>
                </div>
                <a
                    v-if="!isCollapsed"
                    href="/"
                    target="_blank"
                    class="text-aura-moss hover:text-aura-slate p-1 ml-auto"
                    title="View Storefront"
                >
                    <i class="fa-solid fa-arrow-up-right-from-square text-[10px]" />
                </a>
            </div>
        </div>
    </aside>
</template>
