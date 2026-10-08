<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';
import type { ProductCard } from '@/types/product';
import { formatPrice } from '@/utils';

const props = defineProps<{
    product: ProductCard;
}>();

const emit = defineEmits<{
    (e: 'wishlist-toggle', productId: number, isWishlisted: boolean): void;
    (e: 'quick-add', productId: number): void;
}>();

const wishlisted = ref(false);

function toggleWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    wishlisted.value = !wishlisted.value;
    emit('wishlist-toggle', props.product.id, wishlisted.value);
}

function handleQuickAdd(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    emit('quick-add', props.product.id);
}
</script>

<template>
    <div class="group cursor-pointer">
        <!-- Image Container -->
        <div
            class="relative mb-4 aspect-[3/4] overflow-hidden rounded-2xl bg-aura-sage"
        >
            <!-- Badges -->
            <div
                v-if="product.badge || product.comparePrice"
                class="absolute top-3 left-3 z-10 flex flex-col gap-1"
            >
                <span
                    v-if="product.badge"
                    class="rounded-sm bg-aura-slate px-2 py-0.5 text-[8px] font-semibold tracking-widest text-white uppercase shadow-sm"
                >
                    {{ product.badge }}
                </span>
                <span
                    v-if="product.comparePrice"
                    class="rounded-sm bg-aura-moss px-2 py-0.5 text-[8px] font-semibold tracking-widest text-white uppercase shadow-sm"
                >
                    Sale
                </span>
            </div>

            <!-- Quick Action Buttons -->
            <div
                class="absolute top-4 right-4 z-10 flex flex-col space-y-2 opacity-90 transition duration-300 md:opacity-0 md:group-hover:opacity-100"
            >
                <button
                    type="button"
                    class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-aura-slate hover:text-white"
                    :class="{ 'bg-aura-slate text-white': wishlisted }"
                    aria-label="Toggle wishlist"
                    @click="toggleWishlist"
                >
                    <i
                        :class="
                            wishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                        "
                        class="text-xs"
                    />
                </button>
                <button
                    type="button"
                    class="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/90 backdrop-blur transition hover:bg-aura-slate hover:text-white"
                    aria-label="Quick add to bag"
                    @click="handleQuickAdd"
                >
                    <i class="fa-solid fa-cart-plus text-xs" />
                </button>
            </div>

            <!-- Product Link -->
            <Link
                :href="`/products/${product.slug}`"
                class="block h-full w-full"
            >
                <img
                    v-if="product.primaryImage"
                    :src="product.primaryImage"
                    :alt="product.name"
                    class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    loading="lazy"
                />
            </Link>
        </div>

        <!-- Meta -->
        <div>
            <h3
                class="mb-1 text-[10px] font-medium text-aura-slate transition group-hover:text-aura-accent md:text-xs"
            >
                <Link :href="`/products/${product.slug}`">
                    {{ product.name }}
                </Link>
            </h3>
            <div class="flex items-center space-x-2">
                <p class="text-[10px] text-aura-moss md:text-xs">
                    {{ formatPrice(product.basePrice) }}
                </p>
                <p
                    v-if="product.comparePrice"
                    class="text-[9px] text-aura-accent line-through md:text-[10px]"
                >
                    {{ formatPrice(product.comparePrice) }}
                </p>
            </div>
        </div>
    </div>
</template>
