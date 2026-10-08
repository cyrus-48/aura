<script setup lang="ts">
defineProps<{
    title?: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
        <div
            v-if="title || $slots.header || $slots.actions"
            class="flex items-center justify-between border-b border-aura-sage px-5 py-4"
        >
            <div>
                <slot name="header">
                    <h2 class="font-serif text-base text-aura-slate">{{ title }}</h2>
                    <p v-if="subtitle" class="text-[10px] text-aura-moss">{{ subtitle }}</p>
                </slot>
            </div>
            <div v-if="$slots.actions">
                <slot name="actions" />
            </div>
        </div>

        <div>
            <slot />
        </div>
    </div>
</template>
