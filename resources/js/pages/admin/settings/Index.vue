<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import FormField from '@/components/admin/FormField.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminStoreSettings } from '@/types/settings_admin';

const props = defineProps<{
    settings: AdminStoreSettings;
}>();

const form = useForm({
    store_name: props.settings.store_name,
    support_email: props.settings.support_email,
    contact_phone: props.settings.contact_phone,
    currency: props.settings.currency,
    tax_rate: props.settings.tax_rate,
    free_shipping_threshold: props.settings.free_shipping_threshold,
    flat_shipping_rate: props.settings.flat_shipping_rate,
    low_stock_threshold: props.settings.low_stock_threshold,
    notifications_enabled: props.settings.notifications_enabled,
});

const submit = (): void => {
    form.put('/admin/settings', { preserveScroll: true });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Store Settings' }]">
        <Head title="Store Settings | Aura & Oak Admin" />

        <AdminPageHeader
            title="Storefront & Atelier Configuration"
            :subtitle="`Global store defaults, currency, tax rates, shipping policies, and operational thresholds.`"
        >
            <template #actions>
                <button
                    type="button"
                    :disabled="form.processing"
                    class="rounded-lg bg-aura-slate px-5 py-2 text-xs font-semibold text-white shadow-xs hover:bg-aura-slate/90 disabled:opacity-50 cursor-pointer"
                    @click="submit"
                >
                    <i class="fa-solid fa-floppy-disk mr-2 text-[10px]"></i>
                    Save Configuration
                </button>
            </template>
        </AdminPageHeader>

        <form @submit.prevent="submit" class="mt-6 space-y-6">
            <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <!-- General Identity -->
                <div class="rounded-xl border border-aura-sage bg-white p-6 shadow-card space-y-4">
                    <h3 class="font-serif text-sm font-semibold text-aura-slate border-b border-aura-sage/60 pb-3">Atelier Identity & Support</h3>
                    <FormField label="Store Display Name" required :error="form.errors.store_name">
                        <input v-model="form.store_name" type="text" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="Concierge Support Email" required :error="form.errors.support_email">
                        <input v-model="form.support_email" type="email" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                    <FormField label="Concierge Phone" :error="form.errors.contact_phone">
                        <input v-model="form.contact_phone" type="text" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                </div>

                <!-- Currency & Taxes -->
                <div class="rounded-xl border border-aura-sage bg-white p-6 shadow-card space-y-4">
                    <h3 class="font-serif text-sm font-semibold text-aura-slate border-b border-aura-sage/60 pb-3">Financials & Taxes</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <FormField label="Base Currency" required :error="form.errors.currency">
                            <select v-model="form.currency" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none">
                                <option value="USD">USD ($)</option>
                                <option value="KES">KES (KSh)</option>
                                <option value="EUR">EUR (€)</option>
                                <option value="GBP">GBP (£)</option>
                            </select>
                        </FormField>
                        <FormField label="Sales Tax / VAT (%)" required :error="form.errors.tax_rate">
                            <input v-model="form.tax_rate" type="number" step="0.1" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                        </FormField>
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <FormField label="Flat Shipping Cost ($)" required :error="form.errors.flat_shipping_rate">
                            <input v-model="form.flat_shipping_rate" type="number" step="0.01" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                        </FormField>
                        <FormField label="Free Shipping Threshold ($)" required :error="form.errors.free_shipping_threshold">
                            <input v-model="form.free_shipping_threshold" type="number" step="0.01" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                        </FormField>
                    </div>
                    <FormField label="Low Stock Warning Limit (Units)" required :error="form.errors.low_stock_threshold">
                        <input v-model="form.low_stock_threshold" type="number" class="w-full rounded-lg border border-aura-sage px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                    </FormField>
                </div>
            </div>
        </form>
    </AdminLayout>
</template>
