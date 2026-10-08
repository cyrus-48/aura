<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { CartItemData } from '@/types/cart';
import CartItemRow from '@/components/cart/CartItemRow.vue';

defineProps<{
    items: CartItemData[];
    updatingItemId: number | null;
}>();

const emit = defineEmits<{
    (e: 'updateQuantity', payload: { id: number; quantity: number }): void;
    (e: 'removeItem', id: number): void;
}>();
</script>

<template>
    <div>
        <!-- Cart Header (Hidden on mobile) -->
        <div
            class="mb-6 hidden grid-cols-12 gap-4 border-b border-aura-sage pb-4 text-[10px] font-semibold tracking-widest text-aura-moss uppercase md:grid"
        >
            <div class="col-span-6">Product</div>
            <div class="col-span-2 text-center">Price</div>
            <div class="col-span-2 text-center">Quantity</div>
            <div class="col-span-2 text-right">Total</div>
        </div>

        <!-- Items list -->
        <div>
            <CartItemRow
                v-for="item in items"
                :key="item.id"
                :item="item"
                :is-updating="updatingItemId === item.id"
                @update-quantity="
                    (quantity) =>
                        emit('updateQuantity', { id: item.id, quantity })
                "
                @remove="() => emit('removeItem', item.id)"
            />
        </div>

        <!-- Cart Actions -->
        <div
            class="mt-8 flex flex-col items-center justify-between gap-4 sm:flex-row"
        >
            <Link
                href="/shop"
                class="flex items-center border-b border-aura-slate pb-1 text-[11px] font-medium tracking-widest text-aura-slate uppercase transition hover:border-aura-accent hover:text-aura-accent"
            >
                <i class="fa-solid fa-arrow-left mr-2 text-[10px]"></i>
                Continue Shopping
            </Link>
        </div>
    </div>
</template>
