<script setup lang="ts">
import { ref, watch } from 'vue';

export interface FilterOption {
    label: string;
    value: string;
}

export interface FilterDefinition {
    key: string;
    label: string;
    options: FilterOption[];
    selected: string;
}

const props = withDefaults(
    defineProps<{
        search?: string;
        searchPlaceholder?: string;
        filters?: FilterDefinition[];
        showClear?: boolean;
    }>(),
    {
        search: '',
        searchPlaceholder: 'Search...',
        filters: () => [],
        showClear: false,
    },
);

const emit = defineEmits<{
    (e: 'update:search', val: string): void;
    (e: 'update:filter', key: string, val: string): void;
    (e: 'clear'): void;
}>();

const localSearch = ref(props.search);
let debounceTimeout: ReturnType<typeof setTimeout> | null = null;

watch(
    () => props.search,
    (newVal) => {
        if (newVal !== localSearch.value) {
            localSearch.value = newVal;
        }
    },
);

const onSearchInput = (e: Event) => {
    const val = (e.target as HTMLInputElement).value;
    localSearch.value = val;
    if (debounceTimeout) clearTimeout(debounceTimeout);
    debounceTimeout = setTimeout(() => {
        emit('update:search', val);
    }, 300);
};
</script>

<template>
    <div class="flex flex-wrap items-center justify-between gap-3 border-b border-aura-sage bg-white px-5 py-3.5">
        <div class="flex flex-1 flex-wrap items-center gap-3">
            <!-- Search Input -->
            <div class="relative min-w-[220px] max-w-sm flex-1">
                <i class="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-aura-moss" />
                <input
                    :value="localSearch"
                    type="text"
                    :placeholder="searchPlaceholder"
                    autofocus
                    class="w-full rounded-lg border border-aura-sage bg-aura-bg/40 py-2 pr-3 pl-9 text-xs text-aura-slate placeholder:text-aura-moss focus:border-aura-slate focus:bg-white focus:outline-none"
                    @input="onSearchInput"
                />
            </div>

            <!-- Dropdown Filters -->
            <div v-for="flt in filters" :key="flt.key" class="flex items-center">
                <select
                    :value="flt.selected"
                    class="rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate outline-none focus:border-aura-slate cursor-pointer"
                    @change="emit('update:filter', flt.key, ($event.target as HTMLSelectElement).value)"
                >
                    <option value="">
                        All {{ flt.label }}
                    </option>
                    <option v-for="opt in flt.options" :key="opt.value" :value="opt.value">
                        {{ opt.label }}
                    </option>
                </select>
            </div>

            <!-- Clear Filters Link -->
            <button
                v-if="showClear"
                type="button"
                class="flex items-center text-xs font-medium text-aura-moss transition hover:text-aura-slate cursor-pointer"
                @click="emit('clear')"
            >
                <i class="fa-solid fa-xmark mr-1.5 text-[10px]" /> Clear filters
            </button>
        </div>

        <!-- Optional Right Slot for Extra Actions -->
        <div v-if="$slots.actions" class="flex items-center space-x-2">
            <slot name="actions" />
        </div>
    </div>
</template>
