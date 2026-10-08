<script setup lang="ts">
defineProps<{
    total: number;
    search: string;
    sort: string;
}>();

const emit = defineEmits<{
    (e: 'update:search', search: string): void;
    (e: 'update:sort', sort: string): void;
    (e: 'search'): void;
}>();

const sortOptions = [
    { value: 'featured', label: 'Featured' },
    { value: 'newest', label: 'Newest' },
    { value: 'price_asc', label: 'Price: Low to High' },
    { value: 'price_desc', label: 'Price: High to Low' },
];
</script>

<template>
    <div
        class="mb-8 flex flex-col items-center justify-between gap-4 border-b border-aura-sage pb-4 sm:flex-row"
    >
        <p
            class="w-full text-center text-xs text-aura-moss sm:w-auto sm:text-left"
        >
            Showing
            <span class="font-medium text-aura-slate">{{ total }}</span> results
        </p>

        <div
            class="flex w-full items-center justify-center space-x-4 sm:w-auto sm:justify-end"
        >
            <div class="relative">
                <input
                    type="text"
                    placeholder="Search the atelier..."
                    :value="search"
                    class="w-44 border-b border-aura-accent bg-transparent pb-1.5 text-xs text-aura-slate placeholder-aura-moss transition focus:border-aura-slate focus:outline-none sm:w-56"
                    @input="
                        emit(
                            'update:search',
                            ($event.target as HTMLInputElement).value,
                        )
                    "
                    @keyup.enter="emit('search')"
                />
                <button
                    type="button"
                    class="absolute right-0 bottom-1.5 text-xs text-aura-moss hover:text-aura-slate"
                    aria-label="Submit search"
                    @click="emit('search')"
                >
                    <i class="fa-solid fa-magnifying-glass"></i>
                </button>
            </div>

            <div class="flex items-center space-x-2">
                <span class="hidden text-xs text-aura-moss md:block"
                    >Sort by:</span
                >
                <select
                    :value="sort"
                    class="relative cursor-pointer appearance-none border border-aura-sage bg-transparent px-3 py-2 pr-8 text-xs text-aura-slate focus:border-aura-slate focus:outline-none"
                    style="
                        background-image: url('data:image/svg+xml;charset=US-ASCII,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22292.4%22%20height%3D%22292.4%22%3E%3Cpath%20fill%3D%22%232C3634%22%20d%3D%22M287%2069.4a17.6%2017.6%200%200%200-13-5.4H18.4c-5%200-9.3%201.8-12.9%205.4A17.6%2017.6%200%200%200%200%2082.2c0%205%201.8%209.3%205.4%2012.9l128%20127.9c3.6%203.6%207.8%205.4%2012.8%205.4s9.2-1.8%2012.8-5.4L287%2095c3.5-3.5%205.4-7.8%205.4-12.8%200-5-1.9-9.2-5.5-12.8z%22%2F%3E%3C%2Fsvg%3E');
                        background-repeat: no-repeat;
                        background-position: right 0.7em top 50%;
                        background-size: 0.65em auto;
                    "
                    @change="
                        emit(
                            'update:sort',
                            ($event.target as HTMLSelectElement).value,
                        )
                    "
                >
                    <option
                        v-for="opt in sortOptions"
                        :key="opt.value"
                        :value="opt.value"
                    >
                        {{ opt.label }}
                    </option>
                </select>
            </div>
        </div>
    </div>
</template>
