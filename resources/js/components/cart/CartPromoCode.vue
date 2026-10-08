<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    initialCode?: string;
    promoSuccess: string | null;
    promoError: string | null;
}>();

const emit = defineEmits<{
    (e: 'apply', code: string): void;
}>();

const inputCode = ref(props.initialCode || '');

function onSubmit(): void {
    if (inputCode.value.trim()) {
        emit('apply', inputCode.value.trim());
    }
}
</script>

<template>
    <div class="mt-8 rounded-2xl border border-aura-sage bg-white p-6">
        <h3
            class="mb-4 text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
        >
            Have a promotional code?
        </h3>
        <div class="flex flex-col gap-3 sm:flex-row">
            <input
                v-model="inputCode"
                type="text"
                placeholder="Enter your code here"
                class="form-input flex-1 rounded"
                @keyup.enter="onSubmit"
            />
            <button
                type="button"
                class="rounded bg-aura-slate px-8 py-3 text-[10px] font-medium tracking-widest whitespace-nowrap text-white uppercase transition hover:bg-aura-moss"
                @click="onSubmit"
            >
                Apply Code
            </button>
        </div>
        <p v-if="promoSuccess" class="mt-2 text-xs text-aura-moss">
            ✓ {{ promoSuccess }}
        </p>
        <p v-if="promoError" class="mt-2 text-xs text-red-600">
            {{ promoError }}
        </p>
    </div>
</template>
