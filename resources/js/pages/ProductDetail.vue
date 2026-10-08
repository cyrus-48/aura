<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import ProductAccordion from '@/components/catalog/ProductAccordion.vue';
import ProductGallery from '@/components/catalog/ProductGallery.vue';
import ProductQuantityAndActions from '@/components/catalog/ProductQuantityAndActions.vue';
import ProductRelatedList from '@/components/catalog/ProductRelatedList.vue';
import ProductVariantSelector from '@/components/catalog/ProductVariantSelector.vue';
import { useProductDetail } from '@/composables/useProductDetail';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { ProductCard, ProductDetail } from '@/types/product';
import { formatPrice } from '@/utils';

const props = defineProps<{
    product: ProductDetail;
    relatedProducts: ProductCard[];
}>();

const {
    selectedVariantId,
    quantity,
    activeImage,
    isAdding,
    addSuccess,
    currentPrice,
    isAvailable,
    maxStock,
    selectVariant,
    setActiveImage,
    incrementQuantity,
    decrementQuantity,
    addToCart,
    buyNow,
} = useProductDetail(props.product);
</script>

<template>
    <StoreLayout :title="`${product.name} — Aura & Oak`">
        <Head>
            <title>{{ product.name }} | Aura & Oak</title>
            <meta name="description" :content="product.description" />
        </Head>

        <!-- Breadcrumbs -->
        <div class="mx-auto w-full max-w-[1400px] px-6 py-6">
            <nav
                class="flex text-[10px] tracking-widest text-aura-moss uppercase"
            >
                <Link href="/" class="transition hover:text-aura-slate"
                    >Home</Link
                >
                <span class="mx-2">/</span>
                <Link href="/shop" class="transition hover:text-aura-slate"
                    >Shop</Link
                >
                <span v-if="product.category" class="mx-2">/</span>
                <Link
                    v-if="product.category"
                    :href="`/shop?category=${product.category.slug}`"
                    class="transition hover:text-aura-slate"
                >
                    {{ product.category.name }}
                </Link>
                <span class="mx-2">/</span>
                <span class="text-aura-slate">{{ product.name }}</span>
            </nav>
        </div>

        <!-- Main Product Section -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <!-- Gallery Section -->
                <div class="w-full lg:w-3/5">
                    <ProductGallery
                        :active-image="activeImage"
                        :primary-image="product.media?.primaryImage || (product as any).primaryImage"
                        :gallery="product.media?.gallery || (product as any).galleryImages || []"
                        :badge="product.badge"
                        :product-name="product.name"
                        @select-image="setActiveImage"
                    />
                </div>

                <!-- Product Info & Purchase Actions -->
                <div class="w-full lg:w-2/5">
                    <div class="sticky top-24">
                        <span
                            v-if="product.category"
                            class="mb-2 block text-[10px] tracking-widest text-aura-accent uppercase"
                        >
                            {{ product.category.name }}
                        </span>
                        <h1
                            class="mb-4 font-serif text-3xl text-aura-slate md:text-4xl"
                        >
                            {{ product.name }}
                        </h1>

                        <!-- Price -->
                        <div class="mb-8 flex items-center space-x-4">
                            <span class="font-serif text-2xl text-aura-slate">
                                {{ formatPrice(currentPrice) }}
                            </span>
                            <span
                                v-if="product.comparePrice"
                                class="text-sm text-aura-moss line-through"
                            >
                                {{ formatPrice(product.comparePrice) }}
                            </span>
                        </div>

                        <!-- Short Description -->
                        <p
                            class="mb-8 text-sm leading-relaxed font-light text-aura-moss"
                        >
                            {{ product.description }}
                        </p>

                        <ProductVariantSelector
                            :variants="product.variants"
                            :selected-variant-id="selectedVariantId"
                            @select-variant="selectVariant"
                        />

                        <ProductQuantityAndActions
                            :quantity="quantity"
                            :max-stock="maxStock"
                            :is-available="isAvailable"
                            :is-adding="isAdding"
                            :add-success="addSuccess"
                            @increment="incrementQuantity"
                            @decrement="decrementQuantity"
                            @add-to-cart="addToCart"
                            @buy-now="buyNow"
                        />
                    </div>
                </div>
            </div>

            <!-- Details Tabs -->
            <ProductAccordion
                :description="product.description || (product as any).shortDescription || ''"
                :specs="product.specs || {}"
            />

            <!-- Related Recommendations -->
            <ProductRelatedList :products="relatedProducts" />
        </main>
    </StoreLayout>
</template>
