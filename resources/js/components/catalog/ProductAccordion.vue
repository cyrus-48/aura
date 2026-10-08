<script setup lang="ts">
import { ref } from 'vue';
import type { ProductDetailSpecifications } from '@/types/product';

withDefaults(
    defineProps<{
        description?: string;
        specs?: ProductDetailSpecifications;
    }>(),
    {
        description: '',
        specs: () => ({
            dimensions: null,
            materialsCare: null,
            origin: null,
        }),
    },
);

const activeTab = ref<'description' | 'materials' | 'shipping'>('description');
</script>

<template>
    <div class="mt-12">
        <div
            class="no-scrollbar flex space-x-8 overflow-x-auto border-b border-aura-sage md:space-x-12"
        >
            <button
                type="button"
                class="pb-4 text-[11px] font-medium tracking-widest whitespace-nowrap uppercase transition"
                :class="
                    activeTab === 'description'
                        ? 'border-b-2 border-aura-slate text-aura-slate'
                        : 'text-aura-moss hover:text-aura-slate'
                "
                @click="activeTab = 'description'"
            >
                Description
            </button>
            <button
                type="button"
                class="pb-4 text-[11px] font-medium tracking-widest whitespace-nowrap uppercase transition"
                :class="
                    activeTab === 'materials'
                        ? 'border-b-2 border-aura-slate text-aura-slate'
                        : 'text-aura-moss hover:text-aura-slate'
                "
                @click="activeTab = 'materials'"
            >
                Materials & Care
            </button>
            <button
                type="button"
                class="pb-4 text-[11px] font-medium tracking-widest whitespace-nowrap uppercase transition"
                :class="
                    activeTab === 'shipping'
                        ? 'border-b-2 border-aura-slate text-aura-slate'
                        : 'text-aura-moss hover:text-aura-slate'
                "
                @click="activeTab = 'shipping'"
            >
                Shipping & Returns
            </button>
        </div>

        <div
            class="max-w-3xl py-8 text-sm leading-relaxed font-light text-aura-moss"
        >
            <div v-if="activeTab === 'description'">
                <p>{{ description }}</p>
                <p v-if="specs.dimensions" class="mt-4">
                    <strong class="font-medium text-aura-slate"
                        >Dimensions:</strong
                    >
                    {{ specs.dimensions }}
                </p>
                <p v-if="specs.origin" class="mt-2">
                    <strong class="font-medium text-aura-slate">Origin:</strong>
                    {{ specs.origin }}
                </p>
            </div>

            <div v-else-if="activeTab === 'materials'">
                <p>
                    {{
                        specs.materialsCare ||
                        'Crafted with 100% natural, sustainable materials sourced ethically from trusted artisan cooperatives.'
                    }}
                </p>
                <p class="mt-4">
                    Machine wash on gentle cold cycle with eco-friendly
                    detergent. Line dry away from direct sunlight to preserve
                    fibers.
                </p>
            </div>

            <div v-else>
                <p>
                    We offer carbon-neutral delivery on all orders worldwide.
                    Standard dispatch within 1–2 business days.
                </p>
                <p class="mt-4">
                    Complimentary 45-day returns and exchanges for all unworn
                    pieces in original condition with atelier tags intact.
                </p>
            </div>
        </div>
    </div>
</template>
