<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import StatusBadge from '@/components/admin/StatusBadge.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface OrderRow {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    items_count: number;
    total: number;
    formatted_total: string;
    payment_method: string;
    payment_status: string;
    payment_status_label: string;
    payment_status_color: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
}

const props = defineProps<{
    orders: {
        data: OrderRow[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: { search: string; status: string; payment_status: string; per_page: number };
    counts: { total: number; pending: number; processing: number };
}>();

const selectedKeys = ref<(string | number)[]>([]);

const columns: DataTableColumn[] = [
    { key: 'order_number', label: 'Order #' },
    { key: 'customer', label: 'Customer' },
    { key: 'items_count', label: 'Items', align: 'center' },
    { key: 'formatted_total', label: 'Total', align: 'right' },
    { key: 'payment_status', label: 'Payment' },
    { key: 'status', label: 'Fulfillment' },
    { key: 'created_at', label: 'Placed Date', align: 'right' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'status',
        label: 'Order Status',
        selected: props.filters.status,
        options: [
            { label: 'Pending', value: 'pending' },
            { label: 'Confirmed', value: 'confirmed' },
            { label: 'Processing', value: 'processing' },
            { label: 'Shipped', value: 'shipped' },
            { label: 'Delivered', value: 'delivered' },
            { label: 'Cancelled', value: 'cancelled' },
            { label: 'Refunded', value: 'refunded' },
        ],
    },
    {
        key: 'payment_status',
        label: 'Payment Status',
        selected: props.filters.payment_status,
        options: [
            { label: 'Paid', value: 'paid' },
            { label: 'Pending', value: 'pending' },
            { label: 'Failed', value: 'failed' },
            { label: 'Refunded', value: 'refunded' },
        ],
    },
]);

const hasActiveFilters = computed(() => !!(props.filters.search || props.filters.status || props.filters.payment_status));

const applyParams = (params: Record<string, any>) => {
    router.get('/admin/orders', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Orders' }]">
        <Head title="Orders | Aura & Oak Admin" />

        <AdminPageHeader
            title="Orders"
            :subtitle="`Total of ${props.orders.total} orders placed. ${props.counts.pending} awaiting dispatch fulfillment.`"
        />

        <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <FilterBar
                :search="props.filters.search"
                search-placeholder="Search by order #, email, phone or customer..."
                :filters="filterDefs"
                :show-clear="hasActiveFilters"
                @update:search="applyParams({ search: $event })"
                @update:filter="(key, val) => applyParams({ [key]: val })"
                @clear="applyParams({ search: '', status: '', payment_status: '' })"
            />

            <DataTable
                :columns="columns"
                :rows="props.orders.data"
                selectable
                :selected-keys="selectedKeys"
                empty-title="No orders found"
                empty-description="Orders placed by storefront clients will appear here automatically."
                @row-click="(row) => router.visit(`/admin/orders/${row.id}`)"
                @update:selected-keys="selectedKeys = $event"
            >
                <template #order_number="{ row }">
                    <Link :href="`/admin/orders/${row.id}`" class="font-mono text-xs font-semibold text-aura-slate hover:underline">
                        {{ row.order_number }}
                    </Link>
                </template>

                <template #customer="{ row }">
                    <div>
                        <p class="font-medium text-xs text-aura-slate">{{ row.customer_name }}</p>
                        <p class="text-[10px] text-aura-moss">{{ row.customer_email }}</p>
                    </div>
                </template>

                <template #items_count="{ value }">
                    <span class="rounded-full bg-aura-sage/40 px-2 py-0.5 text-[10px] font-semibold text-aura-slate">
                        {{ value }}
                    </span>
                </template>

                <template #formatted_total="{ value }">
                    <span class="font-serif font-semibold text-aura-slate">{{ value }}</span>
                </template>

                <template #payment_status="{ row }">
                    <StatusBadge :label="row.payment_status_label" :color="row.payment_status_color" />
                </template>

                <template #status="{ row }">
                    <StatusBadge :label="row.status_label" :color="row.status_color" />
                </template>

                <template #created_at="{ value }">
                    <span class="text-[11px] text-aura-moss">{{ value }}</span>
                </template>
            </DataTable>

            <Pagination
                :current-page="props.orders.current_page"
                :last-page="props.orders.last_page"
                :per-page="props.orders.per_page"
                :total="props.orders.total"
                :from="props.orders.from"
                :to="props.orders.to"
                @change-page="applyParams({ page: $event })"
                @change-per-page="applyParams({ per_page: $event, page: 1 })"
            />
        </div>
    </AdminLayout>
</template>
