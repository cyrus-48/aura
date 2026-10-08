<script setup lang="ts">
import type { ProductVariant } from '@/types/product';

defineProps<{
    variants: ProductVariant[];
    selectedVariantId: number | null;
}>();

const emit = defineEmits<{
    (e: 'selectVariant', variant: ProductVariant): void;
}>();
</script>

<template>
    <div v-if="variants.length > 0" class="mb-8 space-y-6">
        <div>
            <div class="mb-3 flex items-end justify-between">
                <h3
                    class="text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
                >
                    Variant / Size
                </h3>
            </div>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="variant in variants"
                    :key="variant.id"
                    type="button"
                    :disabled="!variant.inStock"
                    class="size-btn transition"
                    :class="[
                        selectedVariantId === variant.id ? 'active' : '',
                        !variant.inStock
                            ? 'cursor-not-allowed line-through opacity-40'
                            : '',
                    ]"
                    @click="emit('selectVariant', variant)"
                >
                    <span v-if="variant.size">{{ variant.size }}</span>
                    <span v-else-if="variant.color">{{ variant.color }}</span>
                    <span v-else-if="variant.material">{{
                        variant.material
                    }}</span>
                    <span v-else>{{ variant.sku }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
