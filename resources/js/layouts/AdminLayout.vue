<script setup lang="ts">
import AdminCommandPalette from '@/components/admin/AdminCommandPalette.vue';
import AdminSidebar from '@/components/admin/AdminSidebar.vue';
import AdminTopBar from '@/components/admin/AdminTopBar.vue';
import type { AdminBreadcrumbItem, AdminSidebarCounts } from '@/types/admin';

const props = defineProps<{
    breadcrumbs?: AdminBreadcrumbItem[];
    sidebarCounts?: AdminSidebarCounts;
}>();
</script>

<template>
    <div class="flex h-screen overflow-hidden bg-aura-bg font-sans text-aura-slate antialiased selection:bg-aura-slate selection:text-white">
        <AdminSidebar :counts="props.sidebarCounts" />

        <div class="flex flex-1 flex-col overflow-hidden">
            <AdminTopBar :breadcrumbs="props.breadcrumbs" />

            <main class="main-scroll flex-1 overflow-y-auto">
                <div class="mx-auto max-w-[1400px] px-4 py-6 lg:px-8 lg:py-8">
                    <slot />
                </div>
            </main>
        </div>

        <AdminCommandPalette />
    </div>
</template>
