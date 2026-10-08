<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

withDefaults(
    defineProps<{
        icon?: string;
        title: string;
        description?: string;
        actionLabel?: string;
        actionHref?: string;
    }>(),
    {
        icon: 'fa-regular fa-folder-open',
        description: '',
        actionLabel: '',
        actionHref: '',
    },
);

const emit = defineEmits<{
    (e: 'action'): void;
}>();
</script>

<template>
    <div class="flex flex-col items-center justify-center px-4 py-16 text-center">
        <div class="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-aura-sage/40 text-aura-moss">
            <i :class="[icon, 'text-xl']" />
        </div>
        <h3 class="font-serif text-lg text-aura-slate">
            {{ title }}
        </h3>
        <p v-if="description" class="mt-1 max-w-sm text-xs text-aura-moss">
            {{ description }}
        </p>
        <div v-if="actionLabel" class="mt-6">
            <Link
                v-if="actionHref"
                :href="actionHref"
                class="inline-flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
            >
                {{ actionLabel }}
            </Link>
            <button
                v-else
                type="button"
                class="inline-flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss cursor-pointer"
                @click="emit('action')"
            >
                {{ actionLabel }}
            </button>
        </div>
    </div>
</template>
