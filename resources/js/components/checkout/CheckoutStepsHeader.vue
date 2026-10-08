<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    currentStep: number;
}>();

const emit = defineEmits<{
    (e: 'stepClick', step: number): void;
}>();
</script>

<template>
    <div class="mb-12 flex items-center justify-center md:mb-16">
        <div class="flex items-center space-x-4 md:space-x-8">
            <!-- Step 1: Bag (Completed) -->
            <Link href="/cart" class="flex items-center space-x-2">
                <div
                    class="flex h-6 w-6 items-center justify-center rounded-full bg-aura-sage text-[10px] text-aura-slate transition hover:bg-aura-slate hover:text-white"
                >
                    <i class="fa-solid fa-check"></i>
                </div>
                <span
                    class="hidden text-[10px] font-medium tracking-widest text-aura-moss uppercase sm:block"
                >
                    Bag
                </span>
            </Link>
            <div class="h-px w-8 bg-aura-sage md:w-16"></div>

            <!-- Step 2: Information -->
            <button
                type="button"
                class="flex items-center space-x-2 focus:outline-none"
                :class="currentStep > 1 ? 'cursor-pointer' : 'cursor-default'"
                @click="currentStep > 1 && emit('stepClick', 1)"
            >
                <div
                    class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium transition"
                    :class="
                        currentStep === 1
                            ? 'bg-aura-slate text-white'
                            : currentStep > 1
                              ? 'bg-aura-sage text-aura-slate hover:bg-aura-accent/40'
                              : 'border border-aura-sage text-aura-moss'
                    "
                >
                    <i v-if="currentStep > 1" class="fa-solid fa-check"></i>
                    <span v-else>2</span>
                </div>
                <span
                    class="hidden text-[10px] font-medium tracking-widest uppercase sm:block"
                    :class="
                        currentStep === 1 ? 'text-aura-slate' : 'text-aura-moss'
                    "
                >
                    Information
                </span>
            </button>
            <div class="h-px w-8 bg-aura-sage md:w-16"></div>

            <!-- Step 3: Shipping -->
            <button
                type="button"
                class="flex items-center space-x-2 focus:outline-none"
                :class="currentStep > 2 ? 'cursor-pointer' : 'cursor-default'"
                @click="currentStep > 2 && emit('stepClick', 2)"
            >
                <div
                    class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium transition"
                    :class="
                        currentStep === 2
                            ? 'bg-aura-slate text-white'
                            : currentStep > 2
                              ? 'bg-aura-sage text-aura-slate hover:bg-aura-accent/40'
                              : 'border border-aura-sage text-aura-moss'
                    "
                >
                    <i v-if="currentStep > 2" class="fa-solid fa-check"></i>
                    <span v-else>3</span>
                </div>
                <span
                    class="hidden text-[10px] font-medium tracking-widest uppercase sm:block"
                    :class="
                        currentStep === 2 ? 'text-aura-slate' : 'text-aura-moss'
                    "
                >
                    Shipping
                </span>
            </button>
            <div class="h-px w-8 bg-aura-sage md:w-16"></div>

            <!-- Step 4: Payment -->
            <div class="flex items-center space-x-2">
                <div
                    class="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-medium"
                    :class="
                        currentStep === 3
                            ? 'bg-aura-slate text-white'
                            : 'border border-aura-sage text-aura-moss'
                    "
                >
                    4
                </div>
                <span
                    class="hidden text-[10px] font-medium tracking-widest uppercase sm:block"
                    :class="
                        currentStep === 3 ? 'text-aura-slate' : 'text-aura-moss'
                    "
                >
                    Payment
                </span>
            </div>
        </div>
    </div>
</template>
