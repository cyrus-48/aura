<script setup lang="ts">
defineProps<{
    selectedCount: number;
}>();

const emit = defineEmits<{
    (e: 'clear'): void;
    (e: 'action', actionKey: string): void;
}>();
</script>

<template>
    <div
        v-if="selectedCount > 0"
        class="fixed bottom-6 left-1/2 z-40 -translate-x-1/2"
    >
        <div class="flex items-center space-x-4 rounded-xl border border-aura-sage bg-aura-slate px-5 py-3 text-xs text-white shadow-2xl">
            <span class="flex items-center font-medium">
                <span class="mr-2 flex h-5 w-5 items-center justify-center rounded-full bg-aura-sage text-[10px] font-bold text-aura-slate">
                    {{ selectedCount }}
                </span>
                selected
            </span>

            <div class="h-4 w-px bg-white/20" />

            <div class="flex items-center space-x-2">
                <slot>
                    <button
                        type="button"
                        class="rounded-lg bg-white/10 px-3 py-1.5 font-medium transition hover:bg-white/20 cursor-pointer"
                        @click="emit('action', 'status')"
                    >
                        Set Status
                    </button>
                    <button
                        type="button"
                        class="rounded-lg bg-white/10 px-3 py-1.5 font-medium transition hover:bg-white/20 cursor-pointer"
                        @click="emit('action', 'category')"
                    >
                        Set Category
                    </button>
                    <button
                        type="button"
                        class="rounded-lg bg-red-500/20 px-3 py-1.5 font-medium text-red-200 transition hover:bg-red-500/30 cursor-pointer"
                        @click="emit('action', 'delete')"
                    >
                        Delete
                    </button>
                </slot>
            </div>

            <div class="h-4 w-px bg-white/20" />

            <button
                type="button"
                class="text-xs text-aura-sage underline transition hover:text-white cursor-pointer"
                @click="emit('clear')"
            >
                Clear
            </button>
        </div>
    </div>
</template>
