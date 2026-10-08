<script setup lang="ts">
import { computed } from 'vue';
import { Link } from '@inertiajs/vue3';

interface Props {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
    size?: 'sm' | 'md' | 'lg';
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    loading?: boolean;
    as?: 'button' | 'a' | 'link';
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'primary',
    size: 'md',
    type: 'button',
    disabled: false,
    loading: false,
    as: 'button',
});

const emit = defineEmits<{
    (e: 'click', event: MouseEvent): void;
}>();

const variantClasses = computed(() => {
    switch (props.variant) {
        case 'secondary':
            return 'bg-aura-sage text-aura-slate hover:bg-aura-accent hover:text-white focus-visible:ring-aura-accent';
        case 'outline':
            return 'border border-aura-slate text-aura-slate hover:bg-aura-slate hover:text-white focus-visible:ring-aura-slate';
        case 'ghost':
            return 'text-aura-slate hover:bg-aura-sage/40 focus-visible:ring-aura-slate';
        case 'danger':
            return 'bg-red-700 text-white hover:bg-red-800 focus-visible:ring-red-600';
        case 'primary':
        default:
            return 'bg-aura-slate text-white hover:bg-aura-moss focus-visible:ring-aura-slate';
    }
});

const sizeClasses = computed(() => {
    switch (props.size) {
        case 'sm':
            return 'px-4 py-2 text-[9px] tracking-widest';
        case 'lg':
            return 'px-10 py-4 text-xs tracking-[0.2em]';
        case 'md':
        default:
            return 'px-8 py-3.5 text-[10px] tracking-widest';
    }
});

function handleClick(event: MouseEvent) {
    if (props.disabled || props.loading) {
        event.preventDefault();
        return;
    }
    emit('click', event);
}
</script>

<template>
    <component
        :is="href ? (as === 'a' ? 'a' : Link) : 'button'"
        :href="href"
        :type="href ? undefined : type"
        :disabled="disabled || loading"
        :class="[
            'inline-flex cursor-pointer items-center justify-center rounded-sm font-medium uppercase transition-all duration-300 select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
            variantClasses,
            sizeClasses,
            (disabled || loading) &&
                'pointer-events-none cursor-not-allowed opacity-60',
        ]"
        @click="handleClick"
    >
        <svg
            v-if="loading"
            class="mr-2 -ml-1 h-3.5 w-3.5 animate-spin text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
        >
            <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
            ></circle>
            <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
            ></path>
        </svg>
        <slot />
    </component>
</template>
