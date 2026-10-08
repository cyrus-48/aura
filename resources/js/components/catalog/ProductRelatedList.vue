<script setup lang="ts">
import ProductCardComponent from '@/components/storefront/ProductCard.vue';
import type { ProductCard } from '@/types/product';

defineProps<{
    products: ProductCard[];
}>();
</script>

<template>
    <section
        v-if="products.length > 0"
        class="mt-24 border-t border-aura-sage pt-16"
    >
        <div class="mb-10 text-center">
            <span
                class="text-[10px] tracking-[0.2em] text-aura-accent uppercase"
                >Curated For You</span
            >
            <h2 class="mt-2 font-serif text-2xl text-aura-slate md:text-3xl">
                Complete the Look
            </h2>
        </div>

        <div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            <ProductCardComponent
                v-for="item in products"
                :key="item.id"
                :product="item"
            />
        </div>
    </section>
</template>
