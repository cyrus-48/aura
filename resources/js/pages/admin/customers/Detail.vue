<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import CustomerAddressesCard from '@/components/admin/CustomerAddressesCard.vue';
import CustomerNotesSection from '@/components/admin/CustomerNotesSection.vue';
import CustomerOrdersTable from '@/components/admin/CustomerOrdersTable.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminCustomerAddress, AdminCustomerDetail, AdminCustomerNote, AdminCustomerOrder } from '@/types/customer';

defineProps<{
    customer: AdminCustomerDetail;
    orders: AdminCustomerOrder[];
    addresses: AdminCustomerAddress[];
    notes: AdminCustomerNote[];
}>();
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Customers', href: '/admin/customers' }, { label: customer.name }]">
        <Head :title="`${customer.name} | Customer Profile | Aura & Oak Admin`" />

        <!-- Header Card -->
        <div class="mb-6 flex flex-col justify-between gap-4 rounded-xl border border-aura-sage bg-white p-6 shadow-card sm:flex-row sm:items-center">
            <div class="flex items-center space-x-4">
                <div class="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-aura-slate font-serif text-lg text-white">
                    {{ customer.name.slice(0, 2).toUpperCase() }}
                </div>
                <div>
                    <div class="flex items-center space-x-2">
                        <h1 class="font-serif text-2xl text-aura-slate">{{ customer.name }}</h1>
                        <span :class="['inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-semibold', customer.is_verified ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800']">
                            {{ customer.is_verified ? 'Verified Client' : 'Unverified' }}
                        </span>
                    </div>
                    <p class="text-xs text-aura-moss">{{ customer.email }} · Registered {{ customer.created_at }}</p>
                </div>
            </div>
            <div class="flex items-center space-x-6 border-t border-aura-sage/60 pt-4 sm:border-0 sm:pt-0">
                <div class="text-right">
                    <p class="text-[10px] font-semibold tracking-wider text-aura-moss uppercase">Lifetime Spend</p>
                    <p class="font-serif text-xl font-bold text-aura-slate">{{ customer.total_spend }}</p>
                </div>
                <div class="text-right">
                    <p class="text-[10px] font-semibold tracking-wider text-aura-moss uppercase">Total Orders</p>
                    <p class="font-serif text-xl font-bold text-aura-slate">{{ customer.order_count }}</p>
                </div>
            </div>
        </div>

        <!-- 2-Column Operational Grid -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div class="space-y-6 lg:col-span-2">
                <CustomerOrdersTable :orders="orders" />
                <CustomerAddressesCard :addresses="addresses" />
            </div>
            <div class="space-y-6 lg:col-span-1">
                <CustomerNotesSection :customer-id="customer.id" :notes="notes" />
            </div>
        </div>
    </AdminLayout>
</template>
