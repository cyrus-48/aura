<script setup lang="ts">
import ProductCardComponent from '@/components/storefront/ProductCard.vue';
import type { ProductCard } from '@/types/product';

defineProps<{
    products: ProductCard[];
}>();

const emit = defineEmits<{
    (e: 'quickAdd', productId: number): void;
}>();
</script>

<template>
    <div>
        <div
            v-if="products.length === 0"
            class="rounded-2xl border border-dashed border-aura-sage py-16 text-center"
        >
            <h3 class="font-serif text-lg font-medium text-aura-slate">
                No matching items found
            </h3>
            <p class="mt-1 text-xs text-aura-moss">
                Try adjusting your filters or search keywords.
            </p>
        </div>

        <div
            v-else
            class="grid grid-cols-2 gap-4 md:grid-cols-3 md:gap-6 lg:gap-6 xl:grid-cols-3"
        >
            <ProductCardComponent
                v-for="product in products"
                :key="product.id"
                :product="product"
                @quick-add="(id) => emit('quickAdd', id)"
            />
        </div>
    </div>
</template>
