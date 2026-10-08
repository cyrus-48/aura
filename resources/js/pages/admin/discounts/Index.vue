<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import DiscountModal from '@/components/admin/DiscountModal.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminDiscountFilters, AdminDiscountListItem, AdminDiscountStats } from '@/types/discount';

const props = defineProps<{
    discounts: {
        data: AdminDiscountListItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: AdminDiscountFilters;
    stats: AdminDiscountStats;
}>();

const isModalOpen = ref(false);
const editingDiscount = ref<AdminDiscountListItem | null>(null);

const columns: DataTableColumn[] = [
    { key: 'code', label: 'Coupon Code' },
    { key: 'type', label: 'Benefit' },
    { key: 'usage', label: 'Redemptions', align: 'center' },
    { key: 'expires_at', label: 'Expiration' },
    { key: 'is_active', label: 'Status' },
    { key: 'actions', label: '', align: 'right' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'status',
        label: 'Status',
        selected: props.filters.status,
        options: [
            { label: 'Active Codes', value: 'active' },
            { label: 'Expired / Disabled', value: 'expired' },
        ],
    },
]);

const openCreate = (): void => {
    editingDiscount.value = null;
    isModalOpen.value = true;
};

const openEdit = (discount: AdminDiscountListItem): void => {
    editingDiscount.value = discount;
    isModalOpen.value = true;
};

const deleteDiscount = (discount: AdminDiscountListItem): void => {
    if (confirm(`Are you sure you want to delete coupon code "${discount.code}"?`)) {
        router.delete(`/admin/discounts/${discount.id}`);
    }
};

const applyParams = (params: Record<string, unknown>): void => {
    router.get('/admin/discounts', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Discounts' }]">
        <Head title="Discounts | Aura & Oak Admin" />

        <AdminPageHeader
            title="Discounts & Promotions"
            :subtitle="`Manage promotional coupon codes, cart threshold reductions, and seasonal sales.`"
        >
            <template #actions>
                <button
                    type="button"
                    class="inline-flex cursor-pointer items-center rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white shadow-xs transition hover:bg-aura-slate/90"
                    @click="openCreate"
                >
                    <i class="fa-solid fa-plus mr-2 text-[10px]"></i>
                    Create Discount
                </button>
            </template>
        </AdminPageHeader>

        <!-- Metric Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminMetricCard title="Total Discount Codes" :amount="stats.total.toString()" subtitle="All created campaigns" icon="fa-solid fa-percent" />
            <AdminMetricCard title="Active Campaigns" :amount="stats.active.toString()" subtitle="Currently redeemable" icon="fa-solid fa-tag" />
            <AdminMetricCard title="Total Redemptions" :amount="stats.total_redemptions.toString()" subtitle="Times applied at checkout" icon="fa-solid fa-receipt" />
        </div>

        <FilterBar
            :search="filters.search"
            :filters="filterDefs"
            placeholder="Search coupons by code or notes..."
            :has-active-filters="!!(filters.search || filters.status)"
            @update:search="(val) => applyParams({ search: val, page: 1 })"
            @update:filter="({ key, value }) => applyParams({ [key]: value, page: 1 })"
            @clear="applyParams({ search: '', status: '', page: 1 })"
        />

        <div class="mt-4 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="discounts.data" row-key="id">
                <template #code="{ row }">
                    <div class="flex items-center space-x-2">
                        <span class="rounded bg-aura-bg px-2.5 py-1 font-mono text-xs font-bold tracking-wider text-aura-slate uppercase border border-aura-sage/60">
                            {{ row.code }}
                        </span>
                        <span v-if="row.description" class="truncate text-[11px] text-aura-moss max-w-xs" :title="row.description">
                            {{ row.description }}
                        </span>
                    </div>
                </template>
                <template #type="{ row }">
                    <span :class="['inline-flex rounded-full px-2.5 py-0.5 text-[10px] font-semibold border', row.type_color]">
                        {{ row.formatted_value }}
                    </span>
                </template>
                <template #usage="{ row }">
                    <span class="text-xs font-mono text-aura-slate">
                        {{ row.uses_count }} / {{ row.max_uses ?? '∞' }}
                    </span>
                </template>
                <template #expires_at="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.expires_at ?? 'No expiration' }}</span>
                </template>
                <template #is_active="{ row }">
                    <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium', row.is_valid ? 'bg-emerald-50 text-emerald-800' : 'bg-stone-100 text-stone-600']">
                        {{ row.is_valid ? 'Active' : 'Inactive' }}
                    </span>
                </template>
                <template #actions="{ row }">
                    <div class="flex items-center justify-end space-x-2">
                        <button type="button" class="text-aura-moss hover:text-aura-slate cursor-pointer p-1" title="Edit" @click="openEdit(row)">
                            <i class="fa-solid fa-pen-to-square text-xs"></i>
                        </button>
                        <button type="button" class="text-aura-moss hover:text-rose-600 cursor-pointer p-1" title="Delete" @click="deleteDiscount(row)">
                            <i class="fa-regular fa-trash-can text-xs"></i>
                        </button>
                    </div>
                </template>
            </DataTable>

            <div class="border-t border-aura-sage p-4">
                <Pagination :paginator="discounts" @page-change="(p) => applyParams({ page: p })" />
            </div>
        </div>

        <DiscountModal :is-open="isModalOpen" :discount="editingDiscount" @close="isModalOpen = false" />
    </AdminLayout>
</template>
