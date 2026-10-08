<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    categories: string[];
    selectedCategory: string | null;
}>();
</script>

<template>
    <div
        class="mb-16 flex items-center justify-center space-x-4 overflow-x-auto pb-2 text-[11px] font-medium tracking-widest uppercase md:space-x-8"
    >
        <Link
            href="/journal"
            :class="
                !selectedCategory
                    ? 'border-b border-aura-slate pb-1 text-aura-slate'
                    : 'text-aura-moss transition hover:text-aura-slate'
            "
        >
            All
        </Link>
        <Link
            v-for="cat in categories"
            :key="cat"
            :href="`/journal?category=${encodeURIComponent(cat)}`"
            :class="
                selectedCategory === cat
                    ? 'border-b border-aura-slate pb-1 text-aura-slate'
                    : 'text-aura-moss transition hover:text-aura-slate'
            "
        >
            {{ cat }}
        </Link>
    </div>
</template>
