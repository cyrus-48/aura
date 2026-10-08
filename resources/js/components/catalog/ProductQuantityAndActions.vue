<script setup lang="ts">
defineProps<{
    quantity: number;
    isAvailable: boolean;
    isAdding: boolean;
    addSuccess: boolean;
}>();

const emit = defineEmits<{
    (e: 'increment'): void;
    (e: 'decrement'): void;
    (e: 'addToCart'): void;
    (e: 'buyNow'): void;
}>();
</script>

<template>
    <div class="mb-8">
        <div class="flex flex-col gap-4 sm:flex-row">
            <!-- Quantity -->
            <div
                class="flex w-full items-center justify-between rounded border border-aura-sage bg-white px-4 py-3.5 sm:w-auto sm:justify-center"
            >
                <button
                    type="button"
                    class="px-1 text-sm text-aura-moss hover:text-aura-slate"
                    aria-label="Decrease quantity"
                    @click="emit('decrement')"
                >
                    -
                </button>
                <span class="px-6 text-sm text-aura-slate">{{ quantity }}</span>
                <button
                    type="button"
                    class="px-1 text-sm text-aura-moss hover:text-aura-slate"
                    aria-label="Increase quantity"
                    @click="emit('increment')"
                >
                    +
                </button>
            </div>

            <!-- Add to Cart Button -->
            <button
                type="button"
                :disabled="!isAvailable || isAdding"
                class="flex flex-1 items-center justify-center rounded bg-aura-slate py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss disabled:cursor-not-allowed disabled:opacity-40"
                @click="emit('addToCart')"
            >
                <i class="fa-solid fa-cart-plus mr-2 text-[10px]"></i>
                <span v-if="isAdding">Adding to Bag...</span>
                <span v-else-if="addSuccess">Added to Bag ✓</span>
                <span v-else-if="!isAvailable">Sold Out</span>
                <span v-else>Add to Bag</span>
            </button>
        </div>

        <!-- Buy It Now Button -->
        <button
            type="button"
            :disabled="!isAvailable || isAdding"
            class="mt-3 w-full rounded border border-aura-slate bg-white py-4 text-[11px] font-medium tracking-widest text-aura-slate uppercase transition duration-300 hover:bg-aura-slate hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            @click="emit('buyNow')"
        >
            Buy It Now
        </button>

        <!-- Trust Badges -->
        <div class="mt-8 space-y-4 border-t border-aura-sage pt-8">
            <div class="flex items-center space-x-3 text-aura-moss">
                <i class="fa-solid fa-leaf w-5 text-aura-accent"></i>
                <span class="text-[11px] font-light"
                    >Mindfully crafted from organic & artisanal materials.</span
                >
            </div>
            <div class="flex items-center space-x-3 text-aura-moss">
                <i class="fa-solid fa-truck w-5 text-aura-accent"></i>
                <span class="text-[11px] font-light"
                    >Free carbon-neutral shipping on orders over $99.</span
                >
            </div>
            <div class="flex items-center space-x-3 text-aura-moss">
                <i
                    class="fa-solid fa-arrow-rotate-left w-5 text-aura-accent"
                ></i>
                <span class="text-[11px] font-light"
                    >45-day easy returns & exchanges.</span
                >
            </div>
        </div>
    </div>
</template>
