<script setup lang="ts">
import AdminModal from '@/components/admin/AdminModal.vue';
import type { AdminPaymentListItem } from '@/types/payment';

defineProps<{
    isOpen: boolean;
    payment: AdminPaymentListItem | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();
</script>

<template>
    <AdminModal
        :is-open="isOpen"
        :title="payment ? `Payment: ${payment.reference}` : 'Transaction Details'"
        max-width="max-w-xl"
        @close="emit('close')"
    >
        <div v-if="payment" class="space-y-4 text-xs">
            <div class="grid grid-cols-2 gap-4 rounded-lg border border-aura-sage/60 bg-aura-bg/20 p-4">
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Provider</span>
                    <p class="font-medium text-aura-slate">{{ payment.provider_name }}</p>
                </div>
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Settled Amount</span>
                    <p class="font-serif text-base font-bold text-aura-slate">{{ payment.formatted_amount }} {{ payment.currency }}</p>
                </div>
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Provider Reference</span>
                    <p class="font-mono text-aura-slate truncate">{{ payment.provider_reference }}</p>
                </div>
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Receipt Number</span>
                    <p class="font-mono text-aura-slate">{{ payment.receipt_number ?? 'N/A' }}</p>
                </div>
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Customer</span>
                    <p class="font-medium text-aura-slate">{{ payment.customer_name }}</p>
                    <p class="text-[10px] text-aura-moss">{{ payment.customer_email }}</p>
                </div>
                <div>
                    <span class="text-[10px] font-semibold text-aura-moss uppercase">Transaction Date</span>
                    <p class="text-aura-slate">{{ payment.created_at }}</p>
                </div>
            </div>

            <div v-if="payment.failure_reason" class="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-800">
                <span class="font-semibold text-[10px] uppercase">Failure Reason</span>
                <p class="mt-0.5">{{ payment.failure_reason }}</p>
            </div>

            <div>
                <span class="font-semibold text-[10px] text-aura-moss uppercase">Raw Gateway Metadata</span>
                <pre class="mt-1 max-h-48 overflow-y-auto rounded-lg border border-aura-sage bg-aura-bg p-3 font-mono text-[11px] text-aura-slate">{{ JSON.stringify(payment.metadata || {}, null, 2) }}</pre>
            </div>

            <div class="mt-6 flex justify-end border-t border-aura-sage pt-4">
                <button
                    type="button"
                    class="rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white hover:bg-aura-slate/90 cursor-pointer"
                    @click="emit('close')"
                >
                    Close
                </button>
            </div>
        </div>
    </AdminModal>
</template>
