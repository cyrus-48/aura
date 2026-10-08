<script setup lang="ts">
import { ref } from 'vue';
import type { ProductCategory } from '@/types/product';

const props = withDefaults(
    defineProps<{
        categories?: ProductCategory[];
        materials?: string[];
        selectedCategory?: string | null;
        selectedMaterial?: string | null;
        minPrice?: number | null;
        maxPrice?: number | null;
    }>(),
    {
        categories: () => [],
        materials: () => [],
        selectedCategory: null,
        selectedMaterial: null,
        minPrice: null,
        maxPrice: null,
    },
);

const emit = defineEmits<{
    (e: 'update:category', category: string | null): void;
    (e: 'update:material', material: string | null): void;
    (e: 'update:minPrice', price: number | null): void;
    (e: 'update:maxPrice', price: number | null): void;
    (e: 'apply'): void;
    (e: 'clear'): void;
}>();

const mobileOpen = ref(false);

interface PriceTier {
    label: string;
    min: number | null;
    max: number | null;
}

const priceTiers: PriceTier[] = [
    { label: 'Under $75', min: null, max: 75 },
    { label: '$75 - $150', min: 75, max: 150 },
    { label: '$150 - $250', min: 150, max: 250 },
    { label: 'Over $250', min: 250, max: null },
];

function isPriceSelected(tier: PriceTier): boolean {
    return props.minPrice === tier.min && props.maxPrice === tier.max;
}

function selectPriceTier(tier: PriceTier): void {
    if (isPriceSelected(tier)) {
        emit('update:minPrice', null);
        emit('update:maxPrice', null);
    } else {
        emit('update:minPrice', tier.min);
        emit('update:maxPrice', tier.max);
    }
    emit('apply');
}
</script>

<template>
    <aside class="w-full shrink-0 lg:block lg:w-64">
        <!-- Mobile Filter Toggle -->
        <button
            type="button"
            class="mb-6 flex w-full items-center justify-between border border-aura-sage bg-white px-4 py-3 text-xs font-medium tracking-wider text-aura-slate uppercase lg:hidden"
            @click="mobileOpen = !mobileOpen"
        >
            <span><i class="fa-solid fa-sliders mr-2"></i> Filters</span>
            <i
                class="fa-solid text-[10px]"
                :class="mobileOpen ? 'fa-chevron-up' : 'fa-chevron-down'"
            ></i>
        </button>

        <div :class="[mobileOpen ? 'block' : 'hidden', 'space-y-8 lg:block']">
            <!-- Categories -->
            <div>
                <div class="mb-4 flex items-center justify-between">
                    <h3
                        class="text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
                    >
                        Categories
                    </h3>
                    <button
                        v-if="
                            selectedCategory ||
                            selectedMaterial ||
                            minPrice !== null ||
                            maxPrice !== null
                        "
                        type="button"
                        class="text-[10px] tracking-wider text-aura-moss uppercase hover:text-aura-slate"
                        @click="emit('clear')"
                    >
                        Reset
                    </button>
                </div>
                <ul class="space-y-3 text-sm text-aura-moss">
                    <li
                        class="flex cursor-pointer items-center justify-between transition"
                        :class="
                            selectedCategory === null
                                ? 'font-medium text-aura-slate'
                                : 'hover:text-aura-slate'
                        "
                        @click="
                            emit('update:category', null);
                            emit('apply');
                        "
                    >
                        <span>All Items</span>
                        <i
                            v-if="selectedCategory === null"
                            class="fa-solid fa-check text-[10px] text-aura-slate"
                        ></i>
                    </li>
                    <li
                        v-for="cat in categories"
                        :key="cat.id"
                        class="flex cursor-pointer items-center justify-between transition"
                        :class="
                            selectedCategory === cat.slug
                                ? 'font-medium text-aura-slate'
                                : 'hover:text-aura-slate'
                        "
                        @click="
                            emit('update:category', cat.slug);
                            emit('apply');
                        "
                    >
                        <span>{{ cat.name }}</span>
                        <span
                            v-if="cat.productsCount"
                            class="rounded-full bg-aura-sage px-2 py-0.5 text-[10px] text-aura-slate"
                        >
                            {{ cat.productsCount }}
                        </span>
                    </li>
                </ul>
            </div>

            <!-- Price Range -->
            <div>
                <h3
                    class="mb-4 text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
                >
                    Price Range
                </h3>
                <div class="space-y-3 text-sm text-aura-moss">
                    <label
                        v-for="tier in priceTiers"
                        :key="tier.label"
                        class="flex cursor-pointer items-center space-x-3"
                    >
                        <input
                            type="checkbox"
                            class="custom-checkbox"
                            :checked="isPriceSelected(tier)"
                            @change="selectPriceTier(tier)"
                        />
                        <span
                            :class="{
                                'font-medium text-aura-slate':
                                    isPriceSelected(tier),
                            }"
                        >
                            {{ tier.label }}
                        </span>
                    </label>
                </div>
            </div>

            <!-- Materials -->
            <div v-if="materials && materials.length > 0">
                <h3
                    class="mb-4 text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
                >
                    Materials
                </h3>
                <div class="flex flex-wrap gap-2">
                    <button
                        v-for="mat in materials"
                        :key="mat"
                        type="button"
                        class="rounded-sm border px-3 py-1 text-[11px] uppercase transition"
                        :class="
                            selectedMaterial === mat
                                ? 'border-aura-slate bg-aura-slate text-white'
                                : 'border-aura-sage bg-white text-aura-moss hover:border-aura-slate hover:text-aura-slate'
                        "
                        @click="
                            emit(
                                'update:material',
                                selectedMaterial === mat ? null : mat,
                            );
                            emit('apply');
                        "
                    >
                        {{ mat }}
                    </button>
                </div>
            </div>
        </div>
    </aside>
</template>
