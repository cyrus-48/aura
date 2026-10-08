<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import { useAdminSidebar } from '@/composables/useAdminSidebar';
import { useCommandPalette } from '@/composables/useCommandPalette';
import type { AdminBreadcrumbItem } from '@/types/admin';

const props = withDefaults(
    defineProps<{
        breadcrumbs?: AdminBreadcrumbItem[];
    }>(),
    {
        breadcrumbs: () => [
            { label: 'Admin', href: '/admin' },
            { label: 'Dashboard' },
        ],
    },
);

const page = usePage();
const { toggleMobile } = useAdminSidebar();
const { open: openPalette } = useCommandPalette();

const authUser = computed(() => page.props.auth?.user as { name?: string; role?: string } | undefined);
const userName = computed(() => authUser.value?.name ?? 'Atelier Staff');
const userInitials = computed(() => {
    return userName.value
        .split(' ')
        .map((s) => s[0])
        .join('')
        .slice(0, 2)
        .toUpperCase() || 'AO';
});
</script>

<template>
    <header class="flex h-16 shrink-0 items-center justify-between border-b border-aura-sage bg-white px-4 lg:px-6">
        <!-- Left: Mobile Toggle + Breadcrumbs -->
        <div class="flex items-center space-x-4">
            <button
                type="button"
                class="flex h-9 w-9 items-center justify-center rounded-md text-aura-moss transition hover:bg-aura-sage/50 hover:text-aura-slate cursor-pointer lg:hidden"
                aria-label="Open sidebar"
                @click="toggleMobile"
            >
                <i class="fa-solid fa-bars text-sm" />
            </button>

            <nav class="hidden items-center text-[11px] tracking-widest text-aura-moss uppercase sm:flex">
                <template v-for="(crumb, idx) in props.breadcrumbs" :key="crumb.label">
                    <span v-if="idx > 0" class="mx-2 text-[7px] opacity-50">
                        <i class="fa-solid fa-chevron-right" />
                    </span>
                    <Link
                        v-if="crumb.href && idx < props.breadcrumbs.length - 1"
                        :href="crumb.href"
                        class="transition hover:text-aura-slate"
                    >
                        {{ crumb.label }}
                    </Link>
                    <span v-else class="font-medium text-aura-slate">
                        {{ crumb.label }}
                    </span>
                </template>
            </nav>
        </div>

        <!-- Center: Command Palette Trigger -->
        <button
            type="button"
            class="hidden max-w-md flex-1 items-center justify-between rounded-lg border border-aura-sage bg-aura-bg px-3 py-2 text-left transition hover:border-aura-accent cursor-pointer md:mx-8 md:flex"
            aria-label="Open command palette"
            @click="openPalette"
        >
            <div class="flex items-center space-x-2">
                <i class="fa-solid fa-magnifying-glass text-xs text-aura-moss" />
                <span class="text-xs text-aura-moss">Search products, orders, customers...</span>
            </div>
            <kbd class="rounded border border-aura-sage bg-white px-1.5 py-0.5 font-mono text-[9px] text-aura-moss">⌘K</kbd>
        </button>

        <!-- Right: Actions -->
        <div class="flex items-center space-x-2">
            <Link
                href="/admin/products/create"
                class="flex h-9 w-9 items-center justify-center rounded-md text-aura-moss transition hover:bg-aura-sage/50 hover:text-aura-slate"
                aria-label="Quick add product"
            >
                <i class="fa-solid fa-plus text-sm" />
            </Link>

            <div class="relative">
                <button
                    type="button"
                    class="relative flex h-9 w-9 items-center justify-center rounded-md text-aura-moss transition hover:bg-aura-sage/50 hover:text-aura-slate cursor-pointer"
                    aria-label="Notifications"
                >
                    <i class="fa-regular fa-bell text-sm" />
                    <span class="absolute top-1.5 right-1.5 flex h-2 w-2">
                        <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-aura-accent opacity-75" />
                        <span class="relative inline-flex h-2 w-2 rounded-full bg-aura-accent" />
                    </span>
                </button>
            </div>

            <div
                class="ml-1 flex h-9 w-9 items-center justify-center rounded-full bg-aura-slate font-serif text-xs text-white"
                :title="userName"
            >
                {{ userInitials }}
            </div>
        </div>
    </header>
</template>
