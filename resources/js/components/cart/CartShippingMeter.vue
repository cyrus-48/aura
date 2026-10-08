<script setup lang="ts">
import { formatPrice } from '@/utils';

defineProps<{
    amountToFreeShipping: number;
    progress: number;
    isEligible: boolean;
}>();
</script>

<template>
    <div
        class="bg-aura-cream/50 mb-8 rounded-xl border border-aura-sage/30 p-4"
    >
        <div
            class="mb-2 flex items-center justify-between text-xs tracking-wider uppercase"
        >
            <span v-if="!isEligible" class="text-aura-slate">
                Add
                <span class="font-bold text-aura-moss">{{
                    formatPrice(amountToFreeShipping)
                }}</span>
                more for complimentary shipping
            </span>
            <span v-else class="font-medium text-aura-moss">
                ✨ Complimentary carbon-neutral shipping unlocked
            </span>
            <span class="font-medium text-aura-slate">{{ progress }}%</span>
        </div>
        <div class="h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
            <div
                class="h-full rounded-full bg-aura-moss transition-all duration-500 ease-out"
                :style="{ width: `${progress}%` }"
            />
        </div>
    </div>
</template>
