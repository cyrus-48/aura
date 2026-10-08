<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { CartItemData } from '@/types/cart';
import { formatPrice } from '@/utils';

const props = defineProps<{
    item: CartItemData;
    isUpdating: boolean;
}>();

const emit = defineEmits<{
    (e: 'updateQuantity', quantity: number): void;
    (e: 'remove'): void;
}>();

function onIncrement(): void {
    emit('updateQuantity', props.item.quantity + 1);
}

function onDecrement(): void {
    if (props.item.quantity > 1) {
        emit('updateQuantity', props.item.quantity - 1);
    }
}
</script>

<template>
    <div
        class="grid grid-cols-1 items-center gap-4 border-b border-aura-sage py-6 md:grid-cols-12"
        :class="{ 'pointer-events-none opacity-50': isUpdating }"
    >
        <!-- Product Info -->
        <div
            class="col-span-1 flex items-center space-x-4 md:col-span-6 md:space-x-6"
        >
            <div
                class="relative h-32 w-24 shrink-0 overflow-hidden rounded-xl bg-aura-sage"
            >
                <img
                    v-if="item.product.primaryImage"
                    :src="item.product.primaryImage"
                    :alt="item.product.name"
                    class="h-full w-full object-cover mix-blend-multiply"
                />
            </div>
            <div>
                <h3
                    class="mb-1 text-sm font-medium text-aura-slate transition hover:text-aura-accent"
                >
                    <Link :href="`/products/${item.product.slug}`">
                        {{ item.product.name }}
                    </Link>
                </h3>
                <p
                    v-if="item.variant?.color"
                    class="mb-1 text-xs text-aura-moss"
                >
                    Color: {{ item.variant.color }}
                </p>
                <p
                    v-if="item.variant?.size"
                    class="mb-2 text-xs text-aura-moss"
                >
                    Size: {{ item.variant.size }}
                </p>
                <button
                    type="button"
                    class="flex items-center text-[10px] text-aura-moss transition hover:text-red-500"
                    aria-label="Remove item"
                    @click="emit('remove')"
                >
                    <i class="fa-regular fa-trash-can mr-1"></i>
                    Remove
                </button>
            </div>
        </div>

        <!-- Price -->
        <div
            class="col-span-1 mt-4 text-left md:col-span-2 md:mt-0 md:text-center"
        >
            <span
                class="mb-1 block text-[10px] font-semibold tracking-widest text-aura-moss uppercase md:hidden"
            >
                Price
            </span>
            <span class="text-sm text-aura-slate">
                {{ formatPrice(item.unitPrice) }}
            </span>
        </div>

        <!-- Quantity -->
        <div
            class="col-span-1 mt-4 flex justify-start md:col-span-2 md:mt-0 md:justify-center"
        >
            <div
                class="flex w-max items-center rounded border border-aura-sage bg-white px-3 py-1.5"
            >
                <button
                    type="button"
                    class="px-1 text-xs text-aura-moss hover:text-aura-slate"
                    aria-label="Decrease quantity"
                    @click="onDecrement"
                >
                    -
                </button>
                <span class="px-3 text-xs text-aura-slate">{{
                    item.quantity
                }}</span>
                <button
                    type="button"
                    class="px-1 text-xs text-aura-moss hover:text-aura-slate"
                    aria-label="Increase quantity"
                    @click="onIncrement"
                >
                    +
                </button>
            </div>
        </div>

        <!-- Total -->
        <div
            class="col-span-1 mt-4 text-left md:col-span-2 md:mt-0 md:text-right"
        >
            <span
                class="mb-1 block text-[10px] font-semibold tracking-widest text-aura-moss uppercase md:hidden"
            >
                Total
            </span>
            <span class="text-sm font-medium text-aura-slate">
                {{ formatPrice(item.lineTotal) }}
            </span>
        </div>
    </div>
</template>
