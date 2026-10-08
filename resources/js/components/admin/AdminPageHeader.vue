<script setup lang="ts">
defineProps<{
    title: string;
    subtitle?: string;
}>();
</script>

<template>
    <div class="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
            <h1 class="font-serif text-2xl text-aura-slate lg:text-3xl">{{ title }}</h1>
            <p v-if="subtitle" class="mt-1 text-xs text-aura-moss">{{ subtitle }}</p>
        </div>
        <div v-if="$slots.actions" class="flex items-center space-x-3">
            <slot name="actions" />
        </div>
    </div>
</template>
