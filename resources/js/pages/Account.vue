<script setup lang="ts">
import { Head, usePage } from '@inertiajs/vue3';
import { computed } from 'vue';
import AccountAddressesList from '@/components/account/AccountAddressesList.vue';
import AccountHeader from '@/components/account/AccountHeader.vue';
import AccountMetricsGrid from '@/components/account/AccountMetricsGrid.vue';
import AccountNavTabs from '@/components/account/AccountNavTabs.vue';
import AccountProfileForm from '@/components/account/AccountProfileForm.vue';
import AccountRecentOrders from '@/components/account/AccountRecentOrders.vue';
import { useAccount } from '@/composables/useAccount';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { AccountMetrics, UserProfile } from '@/types/account';
import type { OrderAddressData, OrderData } from '@/types/order';

const props = withDefaults(
    defineProps<{
        user?: UserProfile;
        metrics?: AccountMetrics;
        orders?: OrderData[];
        addresses?: OrderAddressData[];
    }>(),
    {
        orders: () => [],
        addresses: () => [],
    },
);

const page = usePage();

const resolvedUser = computed<UserProfile>(() => {
    if (props.user) {
        return props.user;
    }
    const pageUser = page.props.auth?.user as { id?: number; name?: string; email?: string } | undefined;
    const name = pageUser?.name ?? 'Valued Customer';
    const initials = name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase();

    return {
        id: pageUser?.id ?? 0,
        name,
        email: pageUser?.email ?? '',
        phone: null,
        avatar: null,
        initials: initials || 'AO',
        memberSince: 'Member',
    };
});

const resolvedMetrics = computed<AccountMetrics>(() => {
    if (props.metrics) {
        return props.metrics;
    }
    const orderList = props.orders ?? [];
    return {
        totalOrders: orderList.length,
        pendingOrders: orderList.filter((o) => ['pending', 'processing', 'confirmed'].includes(o.status)).length,
        deliveredOrders: orderList.filter((o) => o.status === 'delivered').length,
        lifetimeSpend: orderList.reduce((acc, o) => acc + (o.payment_status === 'paid' ? o.total : 0), 0),
    };
});

const { activeTab, setActiveTab } = useAccount('overview');
</script>

<template>
    <StoreLayout :title="`My Account — ${resolvedUser.name}`">
        <Head>
            <title>My Account | Aura & Oak</title>
            <meta
                name="description"
                content="View your order history, delivery addresses, and personal profile."
            />
        </Head>

        <!-- Page Header -->
        <AccountHeader :user="resolvedUser" />

        <!-- Main Content -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <div class="flex flex-col gap-12 lg:flex-row lg:gap-16">
                <!-- Sidebar Navigation -->
                <AccountNavTabs
                    :active-tab="activeTab"
                    :user="resolvedUser"
                    @select="setActiveTab"
                />

                <!-- Right Content -->
                <div class="flex-1">
                    <!-- Overview Tab using v-if -->
                    <div v-if="activeTab === 'overview'" class="space-y-8">
                        <AccountMetricsGrid :metrics="resolvedMetrics" />
                        <div>
                            <h2
                                class="mb-4 font-serif text-2xl text-aura-slate"
                            >
                                Recent Orders
                            </h2>
                            <AccountRecentOrders :orders="orders.slice(0, 3)" />
                        </div>
                    </div>

                    <!-- Orders Tab using v-if -->
                    <div v-if="activeTab === 'orders'">
                        <h2 class="mb-6 font-serif text-2xl text-aura-slate">
                            Order History
                        </h2>
                        <AccountRecentOrders :orders="orders" />
                    </div>

                    <!-- Addresses Tab using v-if -->
                    <div v-if="activeTab === 'addresses'">
                        <h2 class="mb-6 font-serif text-2xl text-aura-slate">
                            Saved Addresses
                        </h2>
                        <AccountAddressesList :addresses="addresses" />
                    </div>

                    <!-- Profile Tab using v-if -->
                    <div v-if="activeTab === 'profile'">
                        <AccountProfileForm :user="resolvedUser" />
                    </div>
                </div>
            </div>
        </main>
    </StoreLayout>
</template>
