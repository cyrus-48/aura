<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import AdminLowStockList from '@/components/admin/AdminLowStockList.vue';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import AdminRecentOrdersTable from '@/components/admin/AdminRecentOrdersTable.vue';
import AdminRevenueChart from '@/components/admin/AdminRevenueChart.vue';
import AdminTopProductsTable from '@/components/admin/AdminTopProductsTable.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminDashboardData } from '@/types/admin';

const props = defineProps<{
    dashboard: AdminDashboardData;
}>();
</script>

<template>
    <AdminLayout :sidebar-counts="props.dashboard.sidebar_counts">
        <Head title="Dashboard | Aura & Oak Admin" />

        <AdminPageHeader
            title="Dashboard"
            subtitle="Welcome back. Here is what is happening at the atelier today."
        >
            <template #actions>
                <button
                    type="button"
                    class="flex items-center rounded-lg border border-aura-sage bg-white px-4 py-2.5 text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:bg-aura-sage/50 cursor-pointer"
                >
                    <i class="fa-regular fa-calendar mr-2 text-xs" /> Last 30 days
                </button>
                <button
                    type="button"
                    class="flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss cursor-pointer"
                >
                    <i class="fa-solid fa-download mr-2 text-xs" /> Export Report
                </button>
            </template>
        </AdminPageHeader>

        <!-- Metric Cards -->
        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <AdminMetricCard
                title="Today's Orders"
                :value="props.dashboard.metrics.today_orders.count ?? 0"
                icon="fa-solid fa-box-open"
                :change-text="props.dashboard.metrics.today_orders.change_percent ? `${props.dashboard.metrics.today_orders.change_percent}%` : undefined"
                :change-type="props.dashboard.metrics.today_orders.is_positive ? 'positive' : 'negative'"
                :sparkline="props.dashboard.metrics.today_orders.sparkline"
            />

            <AdminMetricCard
                title="Today's Revenue"
                :value="props.dashboard.metrics.today_revenue.formatted ?? '$0'"
                icon="fa-solid fa-dollar-sign"
                :change-text="props.dashboard.metrics.today_revenue.change_percent ? `${props.dashboard.metrics.today_revenue.change_percent}%` : undefined"
                :change-type="props.dashboard.metrics.today_revenue.is_positive ? 'positive' : 'negative'"
                :sparkline="props.dashboard.metrics.today_revenue.sparkline"
            />

            <AdminMetricCard
                title="Pending Fulfillment"
                :value="props.dashboard.metrics.pending_fulfillment.count ?? 0"
                icon="fa-solid fa-truck-fast"
                icon-bg-class="bg-amber-100"
                icon-color-class="text-amber-700"
                badge-text="Needs attention"
                change-type="warning"
                :sparkline="props.dashboard.metrics.pending_fulfillment.sparkline"
                sparkline-bar-class="bg-amber-300"
            />

            <AdminMetricCard
                title="Low Stock Items"
                :value="props.dashboard.metrics.low_stock.count ?? 0"
                icon="fa-solid fa-triangle-exclamation"
                icon-bg-class="bg-red-100"
                icon-color-class="text-red-700"
                badge-text="Restock soon"
                change-type="alert"
                :sparkline="props.dashboard.metrics.low_stock.sparkline"
                sparkline-bar-class="bg-red-300"
            />
        </div>

        <!-- 2-Column: Recent Orders (2/3) + Low Stock Alert (1/3) -->
        <div class="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
            <AdminRecentOrdersTable :orders="props.dashboard.recent_orders" />
            <AdminLowStockList :items="props.dashboard.low_stock_items" />
        </div>

        <!-- 30-Day Revenue Chart -->
        <AdminRevenueChart :data="props.dashboard.revenue_chart" class="mb-6" />

        <!-- Top Selling Products -->
        <AdminTopProductsTable :products="props.dashboard.top_products" />
    </AdminLayout>
</template>
