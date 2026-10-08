<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { PaginationLink } from '@/types/catalog';

withDefaults(
    defineProps<{
        links?: PaginationLink[];
    }>(),
    {
        links: () => [],
    },
);
</script>

<template>
    <nav
        v-if="Array.isArray(links) && links.length > 3"
        aria-label="Catalog Pagination"
        class="mt-16 flex items-center justify-center space-x-2"
    >
        <template v-for="(link, index) in links" :key="index">
            <Link
                v-if="link.url"
                :href="link.url"
                class="flex h-8 min-w-[2rem] items-center justify-center border px-2 text-xs transition"
                :class="
                    link.active
                        ? 'border-aura-slate bg-aura-slate text-white'
                        : 'border-aura-sage bg-transparent text-aura-slate hover:border-aura-slate'
                "
                v-html="link.label"
            />
            <span
                v-else
                class="flex h-8 min-w-[2rem] cursor-not-allowed items-center justify-center border border-aura-sage/50 px-2 text-xs text-aura-moss/60"
                v-html="link.label"
            />
        </template>
    </nav>
</template>
