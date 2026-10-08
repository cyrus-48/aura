<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import PaymentDetailModal from '@/components/admin/PaymentDetailModal.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminPaymentFilters, AdminPaymentListItem, AdminPaymentStats } from '@/types/payment';

const props = defineProps<{
    payments: {
        data: AdminPaymentListItem[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    filters: AdminPaymentFilters;
    stats: AdminPaymentStats;
}>();

const selectedPayment = ref<AdminPaymentListItem | null>(null);
const isModalOpen = ref(false);

const columns: DataTableColumn[] = [
    { key: 'reference', label: 'Reference / Receipt' },
    { key: 'provider', label: 'Gateway' },
    { key: 'customer', label: 'Customer' },
    { key: 'amount', label: 'Amount', align: 'right' },
    { key: 'status', label: 'Status' },
    { key: 'created_at', label: 'Timestamp', align: 'right' },
    { key: 'actions', label: '', align: 'right' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'status',
        label: 'Status',
        selected: props.filters.status,
        options: [
            { label: 'Completed', value: 'completed' },
            { label: 'Pending', value: 'pending' },
            { label: 'Failed', value: 'failed' },
            { label: 'Refunded', value: 'refunded' },
        ],
    },
    {
        key: 'provider',
        label: 'Provider',
        selected: props.filters.provider,
        options: [
            { label: 'M-Pesa', value: 'mpesa' },
            { label: 'Airtel Money', value: 'airtel' },
            { label: 'Stripe', value: 'stripe' },
            { label: 'Pesapal', value: 'pesapal' },
            { label: 'Cash on Delivery', value: 'cod' },
        ],
    },
]);

const viewDetails = (payment: AdminPaymentListItem): void => {
    selectedPayment.value = payment;
    isModalOpen.value = true;
};

const applyParams = (params: Record<string, unknown>): void => {
    router.get('/admin/payments', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Payments' }]">
        <Head title="Payments | Aura & Oak Admin" />

        <AdminPageHeader
            title="Payments & Gateway Logs"
            :subtitle="`Real-time ledger of Paysasa transactions, mobile money STK pushes, and card settlements.`"
        />

        <!-- Metric Summary Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminMetricCard title="Settled Volume" :amount="stats.total_volume" subtitle="Completed transactions" icon="fa-solid fa-credit-card" />
            <AdminMetricCard title="Successful Payments" :amount="stats.successful_count.toString()" subtitle="Settled into merchant account" icon="fa-solid fa-circle-check" />
            <AdminMetricCard title="Failed / Abandoned" :amount="stats.failed_count.toString()" subtitle="Declined or timed out" icon="fa-solid fa-circle-exclamation" />
        </div>

        <FilterBar
            :search="filters.search"
            :filters="filterDefs"
            placeholder="Search by reference, receipt, customer email..."
            :has-active-filters="!!(filters.search || filters.status || filters.provider)"
            @update:search="(val) => applyParams({ search: val, page: 1 })"
            @update:filter="({ key, value }) => applyParams({ [key]: value, page: 1 })"
            @clear="applyParams({ search: '', status: '', provider: '', page: 1 })"
        />

        <div class="mt-4 overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <DataTable :columns="columns" :rows="payments.data" row-key="id">
                <template #reference="{ row }">
                    <div>
                        <span class="font-mono text-xs font-semibold text-aura-slate">{{ row.reference }}</span>
                        <p v-if="row.receipt_number" class="text-[10px] text-aura-moss font-mono">{{ row.receipt_number }}</p>
                    </div>
                </template>
                <template #provider="{ row }">
                    <span class="rounded bg-aura-bg px-2 py-0.5 text-[10px] font-medium text-aura-slate uppercase">
                        {{ row.provider }}
                    </span>
                </template>
                <template #customer="{ row }">
                    <div>
                        <p class="font-medium text-aura-slate text-xs">{{ row.customer_name }}</p>
                        <p class="text-[10px] text-aura-moss">{{ row.customer_email || row.customer_phone || 'N/A' }}</p>
                    </div>
                </template>
                <template #amount="{ row }">
                    <span class="font-serif font-medium text-aura-slate">{{ row.formatted_amount }}</span>
                </template>
                <template #status="{ row }">
                    <span :class="['inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold', row.status === 'completed' ? 'bg-emerald-50 text-emerald-800' : row.status === 'pending' ? 'bg-amber-50 text-amber-800' : 'bg-rose-50 text-rose-800']">
                        {{ row.status.toUpperCase() }}
                    </span>
                </template>
                <template #created_at="{ row }">
                    <span class="text-xs text-aura-moss">{{ row.created_at }}</span>
                </template>
                <template #actions="{ row }">
                    <button type="button" class="text-xs font-semibold text-aura-moss hover:text-aura-slate cursor-pointer" @click="viewDetails(row)">
                        Details <i class="fa-solid fa-chevron-right ml-1 text-[9px]"></i>
                    </button>
                </template>
            </DataTable>

            <div class="border-t border-aura-sage p-4">
                <Pagination :paginator="payments" @page-change="(p) => applyParams({ page: p })" />
            </div>
        </div>

        <PaymentDetailModal :is-open="isModalOpen" :payment="selectedPayment" @close="isModalOpen = false" />
    </AdminLayout>
</template>
