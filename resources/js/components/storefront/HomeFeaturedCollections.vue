<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { CollectionData } from '@/types/collection';

withDefaults(
    defineProps<{
        collections?: CollectionData[];
    }>(),
    {
        collections: () => [],
    },
);
</script>

<template>
    <section
        v-if="collections && collections.length > 0"
        class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6"
    >
        <div class="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
                <span class="mb-2 block text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                    Curated Capsules
                </span>
                <h2 class="font-serif text-2xl leading-tight text-aura-slate md:text-3xl lg:text-4xl">
                    Seasonal Collections
                </h2>
                <p class="mt-2 max-w-xl text-xs leading-relaxed text-aura-moss md:text-sm">
                    Harmonious groupings of pieces designed to be effortlessly styled together across seasons.
                </p>
            </div>
            <Link
                href="/collections"
                class="inline-flex items-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:text-aura-moss md:text-xs"
            >
                View All Collections
                <i class="fa-solid fa-arrow-right ml-2 text-[8px] md:text-[10px]"></i>
            </Link>
        </div>

        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8">
            <Link
                v-for="collection in collections"
                :key="collection.id"
                :href="`/collections/${collection.slug}`"
                class="group relative overflow-hidden rounded-[1.5rem] bg-aura-sage/80 shadow-soft transition-all duration-300 hover:-translate-y-1"
            >
                <div class="relative aspect-[4/5] w-full overflow-hidden bg-aura-sage">
                    <img
                        v-if="collection.heroImage"
                        :src="collection.heroImage"
                        :alt="collection.name"
                        class="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                    <div
                        v-else
                        class="flex h-full w-full items-center justify-center bg-aura-sage text-aura-moss"
                    >
                        <i class="fa-solid fa-gem text-3xl"></i>
                    </div>

                    <div
                        class="absolute inset-0 bg-gradient-to-t from-aura-slate/90 via-aura-slate/30 to-transparent transition-opacity duration-300"
                    ></div>

                    <div class="absolute inset-x-0 bottom-0 p-6 md:p-8 text-white">
                        <span
                            class="mb-1.5 inline-block rounded-full bg-white/20 px-2.5 py-0.5 text-[9px] font-medium tracking-widest text-white uppercase backdrop-blur-xs"
                        >
                            {{ collection.productsCount }} {{ collection.productsCount === 1 ? 'Piece' : 'Pieces' }}
                        </span>
                        <h3 class="font-serif text-xl leading-snug font-medium text-white md:text-2xl">
                            {{ collection.name }}
                        </h3>
                        <p
                            v-if="collection.tagline || collection.description"
                            class="mt-2 line-clamp-2 text-xs leading-relaxed text-white/80"
                        >
                            {{ collection.tagline || collection.description }}
                        </p>
                        <span
                            class="mt-4 inline-flex items-center text-[10px] font-medium tracking-wider text-white uppercase transition-colors group-hover:text-aura-sage"
                        >
                            Explore Capsule
                            <i class="fa-solid fa-arrow-right ml-2 text-[8px] transition-transform duration-300 group-hover:translate-x-1"></i>
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    </section>
</template>
