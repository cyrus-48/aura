<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminPageListItem } from '@/types/content_admin';

defineProps<{
    pages: AdminPageListItem[];
}>();

const columns: DataTableColumn[] = [
    { key: 'title', label: 'Page Title' },
    { key: 'subtitle', label: 'Subtitle / Description' },
    { key: 'route', label: 'Storefront Route' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: '', align: 'right' },
];
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Pages' }]">
        <Head title="Content Pages | Aura & Oak Admin" />

        <AdminPageHeader
            title="Static Content Pages"
            :subtitle="`Brand storytelling, customer concierge contact details, FAQ care guides, and legal terms.`"
        />

        <div class="mt-6 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="pages" row-key="id">
                <template #title="{ row }">
                    <span class="font-medium text-aura-slate text-xs">{{ row.title }}</span>
                </template>
                <template #subtitle="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.subtitle }}</span>
                </template>
                <template #route="{ row }">
                    <span class="font-mono text-xs text-aura-moss">{{ row.route }}</span>
                </template>
                <template #status="{ row }">
                    <span class="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                        {{ row.status }}
                    </span>
                </template>
                <template #actions="{ row }">
                    <a :href="row.route" target="_blank" class="inline-flex items-center text-xs font-semibold text-aura-moss hover:text-aura-slate">
                        View Live <i class="fa-solid fa-arrow-up-right-from-square ml-1.5 text-[9px]"></i>
                    </a>
                </template>
            </DataTable>
        </div>
    </AdminLayout>
</template>
