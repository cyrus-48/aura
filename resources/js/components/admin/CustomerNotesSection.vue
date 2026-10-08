<script setup lang="ts">
import { useForm } from '@inertiajs/vue3';
import type { AdminCustomerNote } from '@/types/customer';

const props = defineProps<{
    customerId: number;
    notes: AdminCustomerNote[];
}>();

const form = useForm({
    note: '',
});

const submitNote = (): void => {
    if (!form.note.trim()) {
        return;
    }
    form.post(`/admin/customers/${props.customerId}/notes`, {
        preserveScroll: true,
        onSuccess: () => {
            form.reset('note');
        },
    });
};
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
        <h3 class="mb-4 font-serif text-base text-aura-slate flex items-center justify-between">
            <span>Staff Internal Notes</span>
            <span class="rounded-full bg-aura-bg px-2 py-0.5 text-[10px] font-mono text-aura-moss">{{ notes.length }}</span>
        </h3>

        <!-- Add Note Form -->
        <form @submit.prevent="submitNote" class="mb-6 space-y-3">
            <div>
                <textarea
                    v-model="form.note"
                    rows="3"
                    placeholder="Record notes on customer preferences, special requests, or support history..."
                    class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 p-3 text-xs text-aura-slate placeholder:text-aura-moss/60 focus:border-aura-slate focus:outline-none"
                    :disabled="form.processing"
                ></textarea>
                <p v-if="form.errors.note" class="mt-1 text-[11px] text-rose-600">{{ form.errors.note }}</p>
            </div>
            <div class="flex justify-end">
                <button
                    type="submit"
                    :disabled="form.processing || !form.note.trim()"
                    class="inline-flex cursor-pointer items-center rounded-lg bg-aura-slate px-4 py-2 text-xs font-semibold text-white transition hover:bg-aura-slate/90 disabled:opacity-50"
                >
                    <i class="fa-solid fa-paper-plane mr-2 text-[10px]"></i>
                    Add Note
                </button>
            </div>
        </form>

        <!-- Notes Timeline -->
        <div v-if="notes.length > 0" class="space-y-3 divide-y divide-aura-sage/30">
            <div v-for="item in notes" :key="item.id" class="pt-3 first:pt-0">
                <div class="flex items-center justify-between text-[11px]">
                    <span class="font-semibold text-aura-slate">{{ item.author_name }}</span>
                    <span class="text-[10px] text-aura-moss">{{ item.created_at }}</span>
                </div>
                <p class="mt-1 text-xs text-aura-slate/90 whitespace-pre-wrap">{{ item.note }}</p>
            </div>
        </div>
        <div v-else class="py-6 text-center text-xs text-aura-moss">
            No notes on file for this customer yet.
        </div>
    </div>
</template>
