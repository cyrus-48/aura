<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import type { ProductCategory } from '@/types/product';

withDefaults(
    defineProps<{
        categories?: ProductCategory[];
    }>(),
    {
        categories: () => [],
    },
);

const scrollContainer = ref<HTMLElement | null>(null);
const canScrollLeft = ref(false);
const canScrollRight = ref(true);

function updateScrollButtons(): void {
    if (!scrollContainer.value) {
        return;
    }
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value;
    canScrollLeft.value = scrollLeft > 10;
    canScrollRight.value = scrollLeft < scrollWidth - clientWidth - 10;
}

function scroll(direction: 'left' | 'right'): void {
    if (!scrollContainer.value) {
        return;
    }
    const offset = direction === 'left' ? -280 : 280;
    scrollContainer.value.scrollBy({ left: offset, behavior: 'smooth' });
}

onMounted(() => {
    updateScrollButtons();
});
</script>

<template>
    <section
        v-if="categories && categories.length > 0"
        class="mx-auto mb-16 max-w-[1400px] px-4 md:mb-24 md:px-6"
    >
        <!-- Header with Title & Carousel Arrows -->
        <div class="mb-6 flex items-end justify-between md:mb-8">
            <div>
                <span class="mb-1.5 block text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                    Curated Wardrobe
                </span>
                <h2 class="font-serif text-xl leading-tight text-aura-slate md:text-2xl lg:text-3xl">
                    Shop by Category
                </h2>
            </div>

            <!-- Carousel Nav Controls -->
            <div class="flex items-center space-x-2">
                <button
                    type="button"
                    aria-label="Scroll left"
                    :disabled="!canScrollLeft"
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-aura-sage bg-white text-aura-slate transition duration-200 hover:border-aura-slate hover:bg-aura-slate hover:text-white disabled:opacity-25 disabled:pointer-events-none md:h-9 md:w-9"
                    @click="scroll('left')"
                >
                    <i class="fa-solid fa-chevron-left text-[9px] md:text-[10px]"></i>
                </button>
                <button
                    type="button"
                    aria-label="Scroll right"
                    :disabled="!canScrollRight"
                    class="flex h-8 w-8 items-center justify-center rounded-full border border-aura-sage bg-white text-aura-slate transition duration-200 hover:border-aura-slate hover:bg-aura-slate hover:text-white disabled:opacity-25 disabled:pointer-events-none md:h-9 md:w-9"
                    @click="scroll('right')"
                >
                    <i class="fa-solid fa-chevron-right text-[9px] md:text-[10px]"></i>
                </button>
            </div>
        </div>

        <!-- Carousel Track (Circular Thumbnails) -->
        <div
            ref="scrollContainer"
            class="flex items-start space-x-6 overflow-x-auto scroll-smooth py-3 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:space-x-8 md:space-x-10 snap-x"
            @scroll.passive="updateScrollButtons"
        >
            <!-- 1. All Items Circle -->
            <Link
                href="/shop"
                class="group flex flex-col items-center shrink-0 snap-start text-center focus:outline-hidden"
            >
                <div
                    class="relative rounded-full border border-aura-sage/80 bg-white/80 p-1 transition-all duration-300 group-hover:border-aura-slate group-hover:scale-105 group-hover:shadow-soft"
                >
                    <div
                        class="relative flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-aura-slate text-white sm:h-24 sm:w-24 md:h-28 md:w-28"
                    >
                        <i class="fa-solid fa-shapes text-xl sm:text-2xl transition duration-300 group-hover:scale-110"></i>
                    </div>
                </div>
                <span
                    class="mt-3 block max-w-[100px] truncate font-serif text-xs font-medium text-aura-slate transition-colors group-hover:text-aura-moss sm:max-w-[120px] md:text-sm"
                >
                    All Pieces
                </span>
                <span class="mt-0.5 text-[9px] tracking-widest text-aura-moss/70 uppercase">
                    View Catalog
                </span>
            </Link>

            <!-- 2. Individual Category Circles -->
            <Link
                v-for="cat in categories"
                :key="cat.id"
                :href="`/shop?category=${cat.slug}`"
                class="group flex flex-col items-center shrink-0 snap-start text-center focus:outline-hidden"
            >
                <div
                    class="relative rounded-full border border-aura-sage/80 bg-white/80 p-1 transition-all duration-300 group-hover:border-aura-slate group-hover:scale-105 group-hover:shadow-soft"
                >
                    <div
                        class="relative h-20 w-20 overflow-hidden rounded-full bg-aura-sage sm:h-24 sm:w-24 md:h-28 md:w-28"
                    >
                        <img
                            v-if="cat.image"
                            :src="cat.image"
                            :alt="cat.name"
                            class="h-full w-full object-cover object-center transition duration-500 ease-out group-hover:scale-110"
                            loading="lazy"
                        />
                        <div
                            v-else
                            class="flex h-full w-full items-center justify-center bg-aura-sage text-aura-moss"
                        >
                            <i class="fa-solid fa-layer-group text-lg"></i>
                        </div>
                        <div
                            class="absolute inset-0 bg-aura-slate/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        ></div>
                    </div>
                </div>

                <span
                    class="mt-3 block max-w-[100px] truncate font-serif text-xs font-medium text-aura-slate transition-colors group-hover:text-aura-moss sm:max-w-[120px] md:text-sm"
                >
                    {{ cat.name }}
                </span>
                <span
                    v-if="cat.productsCount !== undefined && cat.productsCount !== null"
                    class="mt-0.5 text-[9px] tracking-widest text-aura-moss/70 uppercase"
                >
                    {{ cat.productsCount }} {{ cat.productsCount === 1 ? 'Design' : 'Designs' }}
                </span>
            </Link>
        </div>
    </section>
</template>
