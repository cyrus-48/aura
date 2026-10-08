<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title: string;
        description?: string;
        confirmLabel?: string;
        cancelLabel?: string;
        variant?: 'default' | 'destructive';
        loading?: boolean;
    }>(),
    {
        description: '',
        confirmLabel: 'Confirm',
        cancelLabel: 'Cancel',
        variant: 'default',
        loading: false,
    },
);

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'confirm'): void;
}>();

const handleKeydown = (e: KeyboardEvent) => {
    if (props.open && e.key === 'Escape') {
        emit('close');
    }
};

watch(
    () => props.open,
    (isOpen) => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    },
);

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
});
</script>

<template>
    <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <!-- Backdrop -->
        <div
            class="fixed inset-0 bg-aura-slate/50 backdrop-blur-xs transition-opacity"
            @click="emit('close')"
        />

        <!-- Dialog Box -->
        <div
            class="relative w-full max-w-md overflow-hidden rounded-xl border border-aura-sage bg-white p-6 shadow-2xl transition-all"
            role="dialog"
            aria-modal="true"
        >
            <div class="mb-4">
                <h3 class="font-serif text-lg text-aura-slate">
                    {{ title }}
                </h3>
                <p v-if="description" class="mt-2 text-xs text-aura-moss leading-relaxed">
                    {{ description }}
                </p>
                <div v-if="$slots.default" class="mt-4">
                    <slot />
                </div>
            </div>

            <div class="mt-6 flex items-center justify-end space-x-3">
                <button
                    type="button"
                    :disabled="loading"
                    class="rounded-lg border border-aura-sage bg-white px-4 py-2 text-xs font-medium text-aura-slate transition hover:bg-aura-sage/40 cursor-pointer disabled:opacity-50"
                    @click="emit('close')"
                >
                    {{ cancelLabel }}
                </button>
                <button
                    type="button"
                    :disabled="loading"
                    :class="[
                        'flex items-center rounded-lg px-4 py-2 text-xs font-medium text-white transition cursor-pointer disabled:opacity-50',
                        variant === 'destructive'
                            ? 'bg-red-600 hover:bg-red-700'
                            : 'bg-aura-slate hover:bg-aura-moss',
                    ]"
                    @click="emit('confirm')"
                >
                    <i v-if="loading" class="fa-solid fa-spinner mr-2 animate-spin text-xs" />
                    {{ confirmLabel }}
                </button>
            </div>
        </div>
    </div>
</template>
