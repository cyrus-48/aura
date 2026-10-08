<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar from '@/components/admin/FilterBar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminCustomerFilters, AdminCustomerListItem, AdminCustomerStats } from '@/types/customer';

const props = defineProps<{
    customers: {
        data: AdminCustomerListItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: AdminCustomerFilters;
    stats: AdminCustomerStats;
}>();

const columns: DataTableColumn[] = [
    { key: 'name', label: 'Customer' },
    { key: 'is_verified', label: 'Status' },
    { key: 'orders_count', label: 'Orders', align: 'center' },
    { key: 'formatted_total_spend', label: 'Total Spend', align: 'right' },
    { key: 'created_at', label: 'Joined', align: 'right' },
    { key: 'actions', label: '', align: 'right' },
];

const applyParams = (params: Record<string, unknown>): void => {
    router.get('/admin/customers', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Customers' }]">
        <Head title="Customers | Aura & Oak Admin" />

        <AdminPageHeader
            title="Customers"
            :subtitle="`Client directory with ${props.customers.total} registered accounts and lifetime purchasing records.`"
        />

        <!-- Metric Summary Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminMetricCard title="Total Customers" :amount="stats.total_customers.toString()" subtitle="Registered accounts" icon="fa-solid fa-users" />
            <AdminMetricCard title="Gross Customer Spend" :amount="stats.total_revenue" subtitle="Across all customer orders" icon="fa-solid fa-chart-line" />
            <AdminMetricCard title="Average Lifetime Value" :amount="stats.average_ltv" subtitle="Per customer account" icon="fa-solid fa-wallet" />
        </div>

        <FilterBar
            :search="filters.search"
            :filters="[]"
            placeholder="Search customers by name or email..."
            :has-active-filters="!!filters.search"
            @update:search="(val) => applyParams({ search: val, page: 1 })"
            @clear="applyParams({ search: '', page: 1 })"
        />

        <div class="mt-4 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="customers.data" row-key="id">
                <template #name="{ row }">
                    <div class="flex items-center space-x-3">
                        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-aura-sage font-serif text-xs font-semibold text-aura-slate">
                            {{ row.name.slice(0, 2).toUpperCase() }}
                        </div>
                        <div>
                            <Link :href="`/admin/customers/${row.id}`" class="font-medium text-aura-slate hover:underline">
                                {{ row.name }}
                            </Link>
                            <p class="text-[11px] text-aura-moss">{{ row.email }}</p>
                        </div>
                    </div>
                </template>
                <template #is_verified="{ row }">
                    <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-medium', row.is_verified ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800']">
                        <i :class="['mr-1 text-[8px]', row.is_verified ? 'fa-solid fa-check' : 'fa-solid fa-clock']"></i>
                        {{ row.is_verified ? 'Verified' : 'Unverified' }}
                    </span>
                </template>
                <template #orders_count="{ row }">
                    <span class="rounded bg-aura-bg px-2 py-0.5 font-mono text-xs text-aura-slate">{{ row.orders_count }}</span>
                </template>
                <template #formatted_total_spend="{ row }">
                    <span class="font-serif font-medium text-aura-slate">{{ row.formatted_total_spend }}</span>
                </template>
                <template #created_at="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.created_at }}</span>
                </template>
                <template #actions="{ row }">
                    <Link :href="`/admin/customers/${row.id}`" class="text-xs font-semibold text-aura-moss hover:text-aura-slate">
                        View Profile <i class="fa-solid fa-chevron-right ml-1 text-[9px]"></i>
                    </Link>
                </template>
            </DataTable>

            <div class="border-t border-aura-sage p-4">
                <Pagination :paginator="customers" @page-change="(p) => applyParams({ page: p })" />
            </div>
        </div>
    </AdminLayout>
</template>
