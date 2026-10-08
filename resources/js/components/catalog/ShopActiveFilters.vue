<script setup lang="ts">
defineProps<{
    category: string | null;
    material: string | null;
    search: string;
    minPrice: number | null;
    maxPrice: number | null;
    hasActiveFilters: boolean;
}>();

const emit = defineEmits<{
    (e: 'clearCategory'): void;
    (e: 'clearMaterial'): void;
    (e: 'clearSearch'): void;
    (e: 'clearPrice'): void;
    (e: 'clearAll'): void;
}>();
</script>

<template>
    <div v-if="hasActiveFilters" class="mb-6 flex flex-wrap items-center gap-2">
        <span class="text-xs font-medium text-aura-moss">Filters:</span>

        <span
            v-if="category"
            class="inline-flex items-center gap-1.5 rounded-sm bg-aura-sage px-2.5 py-1 text-[11px] text-aura-slate"
        >
            Category: {{ category }}
            <button
                type="button"
                class="hover:text-aura-moss"
                aria-label="Remove category filter"
                @click="emit('clearCategory')"
            >
                <i class="fa-solid fa-xmark text-[9px]"></i>
            </button>
        </span>

        <span
            v-if="material"
            class="inline-flex items-center gap-1.5 rounded-sm bg-aura-sage px-2.5 py-1 text-[11px] text-aura-slate"
        >
            Material: {{ material }}
            <button
                type="button"
                class="hover:text-aura-moss"
                aria-label="Remove material filter"
                @click="emit('clearMaterial')"
            >
                <i class="fa-solid fa-xmark text-[9px]"></i>
            </button>
        </span>

        <span
            v-if="search"
            class="inline-flex items-center gap-1.5 rounded-sm bg-aura-sage px-2.5 py-1 text-[11px] text-aura-slate"
        >
            Search: "{{ search }}"
            <button
                type="button"
                class="hover:text-aura-moss"
                aria-label="Remove search filter"
                @click="emit('clearSearch')"
            >
                <i class="fa-solid fa-xmark text-[9px]"></i>
            </button>
        </span>

        <span
            v-if="minPrice !== null || maxPrice !== null"
            class="inline-flex items-center gap-1.5 rounded-sm bg-aura-sage px-2.5 py-1 text-[11px] text-aura-slate"
        >
            Price: ${{ minPrice || 0 }} - ${{ maxPrice || '∞' }}
            <button
                type="button"
                class="hover:text-aura-moss"
                aria-label="Remove price filter"
                @click="emit('clearPrice')"
            >
                <i class="fa-solid fa-xmark text-[9px]"></i>
            </button>
        </span>

        <button
            type="button"
            class="text-xs text-aura-moss underline hover:text-aura-slate"
            @click="emit('clearAll')"
        >
            Clear all
        </button>
    </div>
</template>
