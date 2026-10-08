<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
    defineProps<{
        currentPage: number;
        lastPage: number;
        perPage: number;
        total: number;
        from?: number;
        to?: number;
        perPageOptions?: number[];
    }>(),
    {
        from: 0,
        to: 0,
        perPageOptions: () => [10, 25, 50, 100],
    },
);

const emit = defineEmits<{
    (e: 'change-page', page: number): void;
    (e: 'change-per-page', perPage: number): void;
}>();

const visiblePages = computed(() => {
    const current = props.currentPage;
    const total = props.lastPage;
    const pages: (number | string)[] = [];

    if (total <= 7) {
        for (let i = 1; i <= total; i++) pages.push(i);
        return pages;
    }

    pages.push(1);
    if (current > 3) pages.push('...');

    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    for (let i = start; i <= end; i++) pages.push(i);

    if (current < total - 2) pages.push('...');
    pages.push(total);

    return pages;
});
</script>

<template>
    <div class="flex flex-col items-center justify-between gap-4 border-t border-aura-sage px-5 py-4 text-xs sm:flex-row">
        <!-- Count Summary & Per Page Selector -->
        <div class="flex items-center space-x-3 text-aura-moss">
            <span>
                Showing <strong class="font-medium text-aura-slate">{{ from }}</strong> to
                <strong class="font-medium text-aura-slate">{{ to }}</strong> of
                <strong class="font-medium text-aura-slate">{{ total }}</strong> results
            </span>
            <div class="flex items-center space-x-1.5">
                <span class="text-[10px] tracking-wider uppercase">Per page:</span>
                <select
                    :value="perPage"
                    class="rounded border border-aura-sage bg-white px-2 py-1 text-xs text-aura-slate outline-none focus:border-aura-slate"
                    @change="emit('change-per-page', Number(($event.target as HTMLSelectElement).value))"
                >
                    <option v-for="opt in perPageOptions" :key="opt" :value="opt">
                        {{ opt }}
                    </option>
                </select>
            </div>
        </div>

        <!-- Page Buttons -->
        <div class="flex items-center space-x-1">
            <button
                type="button"
                :disabled="currentPage <= 1"
                class="flex h-8 w-8 items-center justify-center rounded-md border border-aura-sage bg-white text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Previous page"
                @click="emit('change-page', currentPage - 1)"
            >
                <i class="fa-solid fa-chevron-left text-[10px]" />
            </button>

            <template v-for="(p, idx) in visiblePages" :key="idx">
                <span v-if="p === '...'" class="px-2 text-aura-moss">...</span>
                <button
                    v-else
                    type="button"
                    :class="[
                        'flex h-8 min-w-[2rem] items-center justify-center rounded-md px-2 text-xs font-medium transition cursor-pointer',
                        p === currentPage
                            ? 'bg-aura-slate text-white'
                            : 'border border-aura-sage bg-white text-aura-moss hover:bg-aura-sage/40 hover:text-aura-slate',
                    ]"
                    @click="emit('change-page', Number(p))"
                >
                    {{ p }}
                </button>
            </template>

            <button
                type="button"
                :disabled="currentPage >= lastPage"
                class="flex h-8 w-8 items-center justify-center rounded-md border border-aura-sage bg-white text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate disabled:cursor-not-allowed disabled:opacity-40"
                aria-label="Next page"
                @click="emit('change-page', currentPage + 1)"
            >
                <i class="fa-solid fa-chevron-right text-[10px]" />
            </button>
        </div>
    </div>
</template>
