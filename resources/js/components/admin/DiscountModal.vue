<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import { computed, watch } from 'vue';
import AdminModal from '@/components/admin/AdminModal.vue';
import FormField from '@/components/admin/FormField.vue';
import type { AdminDiscountListItem } from '@/types/discount';

const props = defineProps<{
    isOpen: boolean;
    discount: AdminDiscountListItem | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const isEditing = computed(() => !!props.discount);

const form = useForm({
    code: '',
    type: 'percentage',
    value: 10,
    min_order_amount: null as number | null,
    max_uses: null as number | null,
    starts_at: null as string | null,
    expires_at: null as string | null,
    description: '',
    is_active: true,
});

watch(() => props.discount, (d) => {
    if (d) {
        form.code = d.code;
        form.type = d.type;
        form.value = d.value;
        form.min_order_amount = d.min_order_amount;
        form.max_uses = d.max_uses;
        form.starts_at = d.starts_at;
        form.expires_at = d.expires_at;
        form.description = d.description ?? '';
        form.is_active = d.is_active;
    } else {
        form.reset();
        form.code = '';
        form.type = 'percentage';
        form.value = 10;
        form.min_order_amount = null;
        form.max_uses = null;
        form.starts_at = null;
        form.expires_at = null;
        form.description = '';
        form.is_active = true;
    }
}, { immediate: true });

const submit = (): void => {
    if (isEditing.value && props.discount) {
        form.put(`/admin/discounts/${props.discount.id}`, {
            onSuccess: () => emit('close'),
        });
    } else {
        form.post('/admin/discounts', {
            onSuccess: () => emit('close'),
        });
    }
};
</script>

<template>
    <AdminModal
        :is-open="isOpen"
        :title="isEditing ? `Edit Discount: ${discount?.code}` : 'Create Discount Code'"
        max-width="max-w-lg"
        @close="emit('close')"
    >
        <form @submit.prevent="submit" class="space-y-4">
            <div class="grid grid-cols-2 gap-4">
                <FormField label="Coupon Code" required :error="form.errors.code">
                    <input
                        v-model="form.code"
                        type="text"
                        placeholder="e.g. SUMMER20"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs font-mono font-bold uppercase text-aura-slate focus:border-aura-slate focus:outline-none"
                    />
                </FormField>
                <FormField label="Discount Type" required :error="form.errors.type">
                    <select
                        v-model="form.type"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    >
                        <option value="percentage">Percentage (%)</option>
                        <option value="fixed">Fixed Amount ($)</option>
                    </select>
                </FormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <FormField :label="form.type === 'percentage' ? 'Percentage Off (%)' : 'Amount Off ($)'" required :error="form.errors.value">
                    <input
                        v-model.number="form.value"
                        type="number"
                        step="0.01"
                        min="0.01"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    />
                </FormField>
                <FormField label="Min Order Spend ($)" :error="form.errors.min_order_amount">
                    <input
                        v-model.number="form.min_order_amount"
                        type="number"
                        step="0.01"
                        placeholder="Optional"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    />
                </FormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
                <FormField label="Max Redemptions" :error="form.errors.max_uses">
                    <input
                        v-model.number="form.max_uses"
                        type="number"
                        placeholder="Unlimited"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    />
                </FormField>
                <FormField label="Expiration Date" :error="form.errors.expires_at">
                    <input
                        v-model="form.expires_at"
                        type="date"
                        class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    />
                </FormField>
            </div>

            <FormField label="Description (Internal notes)" :error="form.errors.description">
                <input
                    v-model="form.description"
                    type="text"
                    placeholder="e.g. VIP Newsletter Autumn campaign"
                    class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                />
            </FormField>

            <div class="flex items-center space-x-2 pt-2">
                <input id="is_active" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-aura-sage text-aura-slate accent-aura-slate" />
                <label for="is_active" class="text-xs text-aura-slate font-medium cursor-pointer">Active and redeemable by shoppers</label>
            </div>

            <div class="mt-6 flex justify-end space-x-3 border-t border-aura-sage pt-4">
                <button
                    type="button"
                    class="rounded-lg border border-aura-sage px-4 py-2 text-xs text-aura-moss hover:bg-aura-bg cursor-pointer"
                    @click="emit('close')"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    :disabled="form.processing"
                    class="rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white hover:bg-aura-slate/90 disabled:opacity-50 cursor-pointer"
                >
                    {{ isEditing ? 'Save Changes' : 'Create Code' }}
                </button>
            </div>
        </form>
    </AdminModal>
</template>
