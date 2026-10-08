<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import ProductCardComponent from '@/components/storefront/ProductCard.vue';
import type { ProductCard } from '@/types/product';

defineProps<{
    products: ProductCard[];
}>();
</script>

<template>
    <section class="mx-auto mb-24 max-w-[1400px] px-6">
        <div class="mb-8 flex items-end justify-between md:mb-10">
            <h2
                class="text-xs font-semibold tracking-widest text-aura-slate uppercase"
            >
                New Arrivals
            </h2>
            <Link
                href="/shop"
                class="flex items-center text-[10px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
            >
                View All
                <i class="fa-solid fa-arrow-right ml-2 text-[8px]"></i>
            </Link>
        </div>

        <div class="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4 lg:gap-8">
            <ProductCardComponent
                v-for="product in products"
                :key="product.id"
                :product="product"
            />
        </div>
    </section>
</template>
