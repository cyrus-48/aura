<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import OrderDetailsCard from '@/components/order/OrderDetailsCard.vue';
import OrderFinancialTotals from '@/components/order/OrderFinancialTotals.vue';
import OrderHeaderBanner from '@/components/order/OrderHeaderBanner.vue';
import OrderItemsTable from '@/components/order/OrderItemsTable.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { OrderData } from '@/types/order';

defineProps<{
    order: OrderData;
}>();
</script>

<template>
    <StoreLayout :title="`Order #${order.orderNumber} Confirmed — Aura & Oak`">
        <Head>
            <title>Order Confirmed | Aura & Oak</title>
            <meta
                name="description"
                content="Your Aura & Oak order confirmation receipt."
            />
        </Head>

        <section class="mx-auto max-w-4xl px-6 py-12 md:py-20">
            <OrderHeaderBanner
                :order-number="order.orderNumber"
                :status-label="order.statusLabel"
                :status-color="order.statusColor"
                :email="order.email"
            />

            <!-- Payment Notification Banner -->
            <div
                v-if="$page.props.flash?.paymentMessage"
                class="mx-auto mt-6 max-w-xl rounded-xl border border-aura-sage bg-white p-4 text-center shadow-soft"
            >
                <div
                    class="flex items-center justify-center gap-2 text-xs font-medium text-aura-slate"
                >
                    <i class="fa-solid fa-circle-info text-aura-accent"></i>
                    <span>{{ $page.props.flash.paymentMessage }}</span>
                </div>
            </div>

            <div class="mt-12 space-y-8">
                <OrderItemsTable
                    v-if="order.items && order.items.length > 0"
                    :items="order.items"
                />

                <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
                    <OrderDetailsCard
                        :address="order.shippingAddress"
                        :payment-method-label="order.paymentMethodLabel"
                        :shipping-method="order.shippingMethod"
                    />

                    <OrderFinancialTotals
                        :subtotal="order.subtotal"
                        :shipping-cost="order.shippingCost"
                        :tax-amount="order.taxAmount"
                        :discount-amount="order.discountAmount"
                        :total="order.total"
                    />
                </div>

                <div class="flex justify-center pt-6">
                    <Link
                        href="/shop"
                        class="rounded-full bg-aura-slate px-8 py-3.5 text-xs font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                    >
                        Continue Browsing
                    </Link>
                </div>
            </div>
        </section>
    </StoreLayout>
</template>
