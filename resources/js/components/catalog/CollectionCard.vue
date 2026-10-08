<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import ProductCardComponent from '@/components/storefront/ProductCard.vue';
import type { CollectionData } from '@/types/collection';

defineProps<{
    collection: CollectionData;
}>();
</script>

<template>
    <div
        class="rounded-2xl border border-aura-sage/50 bg-white p-6 shadow-soft sm:p-10 lg:p-12"
    >
        <div
            class="mb-10 grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-12"
        >
            <!-- Collection Hero Banner -->
            <div
                class="relative aspect-[4/3] overflow-hidden rounded-2xl bg-aura-sage lg:col-span-5"
            >
                <img
                    v-if="collection.heroImage"
                    :src="collection.heroImage"
                    :alt="collection.name"
                    class="h-full w-full object-cover mix-blend-multiply"
                />
                <div
                    class="absolute inset-0 bg-gradient-to-t from-aura-slate/60 to-transparent"
                />
                <div class="absolute bottom-6 left-6 text-white">
                    <span
                        class="mb-1 block text-[10px] tracking-widest text-aura-sage uppercase"
                    >
                        {{ collection.productsCount }} Pieces
                    </span>
                    <h2
                        class="font-serif text-2xl font-medium text-white md:text-3xl"
                    >
                        {{ collection.name }}
                    </h2>
                </div>
            </div>

            <!-- Collection Description & Action -->
            <div class="flex flex-col justify-center lg:col-span-7">
                <span
                    class="mb-2 text-[10px] tracking-widest text-aura-accent uppercase"
                >
                    Curated Capsule
                </span>
                <h3
                    class="mb-4 font-serif text-2xl text-aura-slate sm:text-3xl"
                >
                    {{ collection.name }}
                </h3>
                <p
                    class="mb-6 text-xs leading-relaxed font-light text-aura-moss sm:text-sm"
                >
                    {{ collection.description }}
                </p>
                <div>
                    <Link
                        :href="`/shop?collection=${collection.slug}`"
                        class="inline-flex items-center rounded bg-aura-slate px-8 py-3.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                    >
                        Explore This Capsule
                        <i class="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
                    </Link>
                </div>
            </div>
        </div>

        <!-- Preview Products in this Collection -->
        <div
            v-if="collection.products && collection.products.length > 0"
            class="border-t border-aura-sage/40 pt-8"
        >
            <span
                class="mb-6 block text-[10px] font-semibold tracking-widest text-aura-slate uppercase"
            >
                Featured Pieces In This Capsule
            </span>
            <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                <ProductCardComponent
                    v-for="product in collection.products"
                    :key="product.id"
                    :product="product"
                />
            </div>
        </div>
    </div>
</template>
