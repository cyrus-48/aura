<script setup lang="ts">
defineProps<{
    label?: string;
    hint?: string;
    error?: string;
    required?: boolean;
    id?: string;
}>();
</script>

<template>
    <div class="space-y-1.5">
        <label
            v-if="label"
            :for="id"
            class="block text-[10px] font-semibold tracking-wider text-aura-moss uppercase"
        >
            {{ label }}
            <span v-if="required" class="text-red-500">*</span>
        </label>

        <div>
            <slot />
        </div>

        <p v-if="hint && !error" class="text-[11px] text-aura-moss">
            {{ hint }}
        </p>

        <p v-if="error" class="text-[11px] font-medium text-red-600">
            {{ error }}
        </p>
    </div>
</template>
