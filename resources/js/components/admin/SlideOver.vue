<script setup lang="ts">
import { onMounted, onUnmounted, watch } from 'vue';

const props = withDefaults(
    defineProps<{
        open: boolean;
        title: string;
        subtitle?: string;
    }>(),
    {
        subtitle: '',
    },
);

const emit = defineEmits<{
    (e: 'close'): void;
}>();

const handleKeydown = (e: KeyboardEvent) => {
    if (props.open && e.key === 'Escape') {
        emit('close');
    }
};

watch(
    () => props.open,
    (isOpen) => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
    },
);

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => {
    window.removeEventListener('keydown', handleKeydown);
    document.body.style.overflow = '';
});
</script>

<template>
    <div v-if="open" class="fixed inset-0 z-50 overflow-hidden">
        <!-- Backdrop -->
        <div
            class="fixed inset-0 bg-aura-slate/40 backdrop-blur-xs transition-opacity"
            @click="emit('close')"
        />

        <div class="fixed inset-y-0 right-0 flex max-w-full pl-10">
            <!-- Slide-over panel -->
            <div class="w-screen max-w-md border-l border-aura-sage bg-white shadow-2xl">
                <div class="flex h-16 items-center justify-between border-b border-aura-sage px-6">
                    <div>
                        <h2 class="font-serif text-base text-aura-slate">
                            {{ title }}
                        </h2>
                        <p v-if="subtitle" class="text-[11px] text-aura-moss">
                            {{ subtitle }}
                        </p>
                    </div>
                    <button
                        type="button"
                        class="flex h-8 w-8 items-center justify-center rounded-md text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate cursor-pointer"
                        aria-label="Close panel"
                        @click="emit('close')"
                    >
                        <i class="fa-solid fa-xmark text-sm" />
                    </button>
                </div>

                <div class="h-[calc(100vh-4rem)] overflow-y-auto p-6">
                    <slot />
                </div>
            </div>
        </div>
    </div>
</template>
