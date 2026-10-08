<script setup lang="ts">
interface OrderItemRow {
    id: number;
    product_name: string;
    variant_name: string | null;
    sku: string | null;
    unit_price: number;
    quantity: number;
    total_price: number;
    image: string | null;
}

interface AddressData {
    name: string;
    line1: string;
    city: string;
    postal_code: string;
    country: string;
}

defineProps<{
    items: OrderItemRow[];
    shippingAddress: AddressData | null;
    billingAddress: AddressData | null;
    shippingMethod: string;
}>();
</script>

<template>
    <div class="space-y-6">
        <!-- Order Items Table -->
        <div class="rounded-xl border border-aura-sage bg-white shadow-card overflow-hidden">
            <div class="border-b border-aura-sage px-5 py-4">
                <h3 class="font-serif text-base text-aura-slate">Purchased Items ({{ items.length }})</h3>
            </div>
            <table class="w-full text-left">
                <thead>
                    <tr class="border-b border-aura-sage/60 bg-aura-bg/20 text-[9px] font-semibold text-aura-moss uppercase">
                        <th class="px-5 py-3">Item</th>
                        <th class="px-5 py-3">Price</th>
                        <th class="px-5 py-3 text-center">Qty</th>
                        <th class="px-5 py-3 text-right">Total</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-aura-sage/40">
                    <tr v-for="item in items" :key="item.id" class="text-xs">
                        <td class="px-5 py-3.5">
                            <div class="flex items-center space-x-3">
                                <div class="h-10 w-10 shrink-0 rounded bg-aura-sage overflow-hidden">
                                    <img v-if="item.image" :src="item.image" :alt="item.product_name" class="h-full w-full object-cover mix-blend-multiply" />
                                    <div v-else class="flex h-full w-full items-center justify-center text-aura-moss"><i class="fa-solid fa-box text-xs" /></div>
                                </div>
                                <div>
                                    <p class="font-medium text-aura-slate">{{ item.product_name }}</p>
                                    <p class="text-[10px] text-aura-moss">{{ item.variant_name }} · SKU: {{ item.sku }}</p>
                                </div>
                            </div>
                        </td>
                        <td class="px-5 py-3.5 text-aura-moss font-serif">${{ item.unit_price.toFixed(2) }}</td>
                        <td class="px-5 py-3.5 text-center font-semibold text-aura-slate">{{ item.quantity }}</td>
                        <td class="px-5 py-3.5 text-right font-serif font-semibold text-aura-slate">${{ item.total_price.toFixed(2) }}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Addresses Grid -->
        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
                <h4 class="font-serif text-sm font-semibold text-aura-slate mb-2">Shipping Destination</h4>
                <div v-if="shippingAddress" class="text-xs text-aura-moss space-y-0.5">
                    <p class="font-semibold text-aura-slate">{{ shippingAddress.name }}</p>
                    <p>{{ shippingAddress.line1 }}</p>
                    <p>{{ shippingAddress.city }}, {{ shippingAddress.postal_code }}</p>
                    <p>{{ shippingAddress.country }}</p>
                    <p class="pt-2 text-[10px] font-semibold text-aura-slate uppercase">Method: {{ shippingMethod }}</p>
                </div>
                <p v-else class="text-xs text-aura-moss">No shipping address provided.</p>
            </div>

            <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
                <h4 class="font-serif text-sm font-semibold text-aura-slate mb-2">Billing Address</h4>
                <div v-if="billingAddress" class="text-xs text-aura-moss space-y-0.5">
                    <p class="font-semibold text-aura-slate">{{ billingAddress.name }}</p>
                    <p>{{ billingAddress.line1 }}</p>
                    <p>{{ billingAddress.city }}, {{ billingAddress.postal_code }}</p>
                    <p>{{ billingAddress.country }}</p>
                </div>
                <p v-else class="text-xs text-aura-moss">Same as shipping address.</p>
            </div>
        </div>
    </div>
</template>
