<script setup lang="ts">
defineProps<{
    label: string;
    colorClass?: string;
}>();
</script>

<template>
    <span
        :class="[
            'inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-semibold tracking-wide border border-transparent',
            colorClass || 'bg-aura-sage text-aura-slate',
        ]"
    >
        <slot>{{ label }}</slot>
    </span>
</template>
