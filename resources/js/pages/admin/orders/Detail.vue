<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import OrderItemsSummary from '@/components/admin/OrderItemsSummary.vue';
import StatusBadge from '@/components/admin/StatusBadge.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

const props = defineProps<{
    order: {
        id: number;
        order_number: string;
        email: string;
        phone: string;
        status: string;
        status_label: string;
        status_color: string;
        payment_status: string;
        payment_status_label: string;
        payment_status_color: string;
        payment_method: string;
        payment_reference: string;
        shipping_method: string;
        subtotal: number;
        shipping_cost: number;
        tax_amount: number;
        discount_amount: number;
        total: number;
        created_at: string;
        shipping_address: any;
        billing_address: any;
        items: any[];
        notes: { id: number; author_name: string; note: string; created_at: string }[];
    };
    customer: {
        name: string;
        email: string;
        phone: string;
        order_count: number;
        lifetime_value: string;
    };
    allowed_transitions: { value: string; label: string }[];
}>();

const newNote = ref('');
const isSubmittingNote = ref(false);

const changeStatus = (e: Event) => {
    const val = (e.target as HTMLSelectElement).value;
    if (!val) return;
    router.patch(`/admin/orders/${props.order.id}/status`, { status: val });
};

const addNote = () => {
    if (!newNote.value.trim()) return;
    isSubmittingNote.value = true;
    router.post(`/admin/orders/${props.order.id}/notes`, { note: newNote.value }, {
        onSuccess: () => { newNote.value = ''; },
        onFinish: () => { isSubmittingNote.value = false; },
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Orders', href: '/admin/orders' }, { label: `Order #${order.order_number}` }]">
        <Head :title="`Order #${order.order_number} | Aura & Oak Admin`" />

        <AdminPageHeader
            :title="`Order #${order.order_number}`"
            :subtitle="`Placed on ${order.created_at} · Paid via ${order.payment_method}`"
        >
            <template #actions>
                <div class="flex items-center space-x-2">
                    <StatusBadge :label="order.status_label" :color="order.status_color" />
                    <select
                        class="rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs font-medium text-aura-slate focus:border-aura-slate focus:outline-none cursor-pointer"
                        @change="changeStatus"
                    >
                        <option value="">Update Status...</option>
                        <option v-for="t in allowed_transitions" :key="t.value" :value="t.value">Mark as {{ t.label }}</option>
                    </select>
                </div>
            </template>
        </AdminPageHeader>

        <div class="grid grid-cols-1 gap-6 lg:grid-cols-3 pb-16">
            <!-- Left 2/3 Column -->
            <div class="space-y-6 lg:col-span-2">
                <OrderItemsSummary
                    :items="order.items"
                    :shipping-address="order.shipping_address"
                    :billing-address="order.billing_address"
                    :shipping-method="order.shipping_method"
                />

                <!-- Timeline & Notes -->
                <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
                    <h3 class="font-serif text-base text-aura-slate mb-4">Activity Timeline & Staff Notes</h3>
                    <div class="space-y-3 mb-6">
                        <div v-for="note in order.notes" :key="note.id" class="rounded-lg border border-aura-sage/40 bg-aura-bg/30 p-3 text-xs">
                            <div class="flex justify-between font-medium text-aura-slate mb-1">
                                <span>{{ note.author_name }}</span>
                                <span class="text-[10px] text-aura-moss">{{ note.created_at }}</span>
                            </div>
                            <p class="text-aura-moss">{{ note.note }}</p>
                        </div>
                        <p v-if="order.notes.length === 0" class="text-xs text-aura-moss">No internal notes added yet.</p>
                    </div>

                    <div class="flex gap-2">
                        <input v-model="newNote" type="text" placeholder="Add an internal note..." class="flex-1 rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" @keydown.enter.prevent="addNote" />
                        <button type="button" :disabled="isSubmittingNote || !newNote.trim()" class="rounded-lg bg-aura-slate px-4 py-2 text-xs font-medium text-white hover:bg-aura-moss disabled:opacity-50 cursor-pointer" @click="addNote">Add Note</button>
                    </div>
                </div>
            </div>

            <!-- Right 1/3 Column -->
            <div class="space-y-6">
                <!-- Summary -->
                <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-3">
                    <h4 class="font-serif text-sm font-semibold text-aura-slate">Financial Summary</h4>
                    <div class="space-y-1.5 text-xs text-aura-moss">
                        <div class="flex justify-between"><span>Subtotal</span><span class="font-medium text-aura-slate">${{ order.subtotal.toFixed(2) }}</span></div>
                        <div class="flex justify-between"><span>Shipping</span><span class="font-medium text-aura-slate">${{ order.shipping_cost.toFixed(2) }}</span></div>
                        <div class="flex justify-between"><span>Taxes</span><span class="font-medium text-aura-slate">${{ order.tax_amount.toFixed(2) }}</span></div>
                        <div v-if="order.discount_amount > 0" class="flex justify-between text-green-700"><span>Discount</span><span>-${{ order.discount_amount.toFixed(2) }}</span></div>
                        <div class="border-t border-aura-sage pt-2 flex justify-between font-serif text-sm font-bold text-aura-slate"><span>Total Paid</span><span>${{ order.total.toFixed(2) }}</span></div>
                    </div>
                </div>

                <!-- Customer Info -->
                <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-3">
                    <h4 class="font-serif text-sm font-semibold text-aura-slate">Client Profile</h4>
                    <div class="text-xs space-y-1 text-aura-moss">
                        <p class="font-medium text-aura-slate">{{ customer.name }}</p>
                        <p>{{ customer.email }}</p>
                        <p>{{ customer.phone }}</p>
                        <div class="pt-2 border-t border-aura-sage/60 grid grid-cols-2 gap-2 text-center">
                            <div class="rounded bg-aura-bg/50 p-2"><p class="text-[10px] uppercase font-bold text-aura-moss">Orders</p><p class="text-sm font-bold text-aura-slate">{{ customer.order_count }}</p></div>
                            <div class="rounded bg-aura-bg/50 p-2"><p class="text-[10px] uppercase font-bold text-aura-moss">Lifetime</p><p class="text-sm font-bold text-aura-slate">{{ customer.lifetime_value }}</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
