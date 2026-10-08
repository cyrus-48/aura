<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed } from 'vue';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminJournalPostListItem } from '@/types/content_admin';

const props = defineProps<{
    posts: {
        data: AdminJournalPostListItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: { search: string; status: string; category: string; per_page: number };
    categories: string[];
    stats: { total: number; published: number; featured: number };
}>();

const columns: DataTableColumn[] = [
    { key: 'title', label: 'Article' },
    { key: 'category', label: 'Category' },
    { key: 'read_time', label: 'Read Time' },
    { key: 'status', label: 'Status' },
    { key: 'published_at', label: 'Publication Date', align: 'right' },
    { key: 'actions', label: '', align: 'right' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'status',
        label: 'Status',
        selected: props.filters.status,
        options: [
            { label: 'Published', value: 'published' },
            { label: 'Drafts', value: 'draft' },
        ],
    },
    {
        key: 'category',
        label: 'Category',
        selected: props.filters.category,
        options: props.categories.map((c) => ({ label: c, value: c })),
    },
]);

const deletePost = (post: AdminJournalPostListItem): void => {
    if (confirm(`Are you sure you want to delete article "${post.title}"?`)) {
        router.delete(`/admin/journal/${post.id}`);
    }
};

const applyParams = (params: Record<string, unknown>): void => {
    router.get('/admin/journal', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Journal' }]">
        <Head title="Journal | Aura & Oak Admin" />

        <AdminPageHeader
            title="Editorial Journal"
            :subtitle="`Brand stories, craftsmanship features, and curated interior living articles.`"
        >
            <template #actions>
                <Link
                    href="/admin/journal/create"
                    class="inline-flex items-center rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-aura-slate/90"
                >
                    <i class="fa-solid fa-plus mr-2 text-[10px]"></i>
                    New Article
                </Link>
            </template>
        </AdminPageHeader>

        <!-- Metric Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminMetricCard title="Total Articles" :amount="stats.total.toString()" subtitle="In editorial archive" icon="fa-solid fa-newspaper" />
            <AdminMetricCard title="Live / Published" :amount="stats.published.toString()" subtitle="Visible on storefront" icon="fa-solid fa-globe" />
            <AdminMetricCard title="Featured Stories" :amount="stats.featured.toString()" subtitle="Pinned hero placements" icon="fa-solid fa-star" />
        </div>

        <FilterBar
            :search="filters.search"
            :filters="filterDefs"
            placeholder="Search stories by title or excerpt..."
            :has-active-filters="!!(filters.search || filters.status || filters.category)"
            @update:search="(val) => applyParams({ search: val, page: 1 })"
            @update:filter="({ key, value }) => applyParams({ [key]: value, page: 1 })"
            @clear="applyParams({ search: '', status: '', category: '', page: 1 })"
        />

        <div class="mt-4 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="posts.data" row-key="id">
                <template #title="{ row }">
                    <div class="flex items-center space-x-3">
                        <div class="h-10 w-12 shrink-0 overflow-hidden rounded bg-aura-sage/50">
                            <img v-if="row.featured_image" :src="row.featured_image" :alt="row.title" class="h-full w-full object-cover" />
                            <div v-else class="flex h-full w-full items-center justify-center text-aura-moss"><i class="fa-solid fa-image text-xs"></i></div>
                        </div>
                        <div>
                            <Link :href="`/admin/journal/${row.id}/edit`" class="font-medium text-aura-slate hover:underline">
                                {{ row.title }}
                            </Link>
                            <p class="text-[10px] text-aura-moss">/journal/{{ row.slug }}</p>
                        </div>
                    </div>
                </template>
                <template #category="{ row }">
                    <span class="rounded bg-aura-bg px-2 py-0.5 text-[10px] font-medium text-aura-slate uppercase">
                        {{ row.category }}
                    </span>
                </template>
                <template #read_time="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.read_time }}</span>
                </template>
                <template #status="{ row }">
                    <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold', row.is_published ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800']">
                        {{ row.is_published ? 'Published' : 'Draft' }}
                    </span>
                </template>
                <template #published_at="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.published_at }}</span>
                </template>
                <template #actions="{ row }">
                    <div class="flex items-center justify-end space-x-2">
                        <Link :href="`/admin/journal/${row.id}/edit`" class="text-aura-moss hover:text-aura-slate p-1" title="Edit">
                            <i class="fa-solid fa-pen-to-square text-xs"></i>
                        </Link>
                        <button type="button" class="text-aura-moss hover:text-rose-600 cursor-pointer p-1" title="Delete" @click="deletePost(row)">
                            <i class="fa-regular fa-trash-can text-xs"></i>
                        </button>
                    </div>
                </template>
            </DataTable>

            <div class="border-t border-aura-sage p-4">
                <Pagination :paginator="posts" @page-change="(p) => applyParams({ page: p })" />
            </div>
        </div>
    </AdminLayout>
</template>
