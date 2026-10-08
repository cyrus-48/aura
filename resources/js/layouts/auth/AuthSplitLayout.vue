<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import { home } from '@/routes';

defineProps<{
    title?: string;
    description?: string;
}>();
</script>

<template>
    <div
        class="relative grid min-h-screen flex-col items-center justify-center bg-aura-bg px-6 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
        <div
            class="relative hidden h-full flex-col justify-between border-r border-aura-sage bg-aura-slate p-12 text-white lg:flex"
        >
            <Link :href="home()" class="flex flex-col items-start">
                <span class="font-serif text-2xl tracking-[0.25em] text-white uppercase">
                    Aura & Oak
                </span>
                <span class="mt-1 text-[9px] tracking-[0.45em] text-aura-sage uppercase">
                    Atelier
                </span>
            </Link>
            <div class="space-y-3">
                <p class="font-serif text-xl italic text-aura-bg/90">
                    "Timeless silhouettes crafted with quiet intentionality."
                </p>
                <p class="text-xs tracking-widest text-aura-sage/70 uppercase">
                    Nairobi &bull; Stockholm &bull; Tokyo
                </p>
            </div>
            <p class="text-[10px] tracking-widest text-aura-sage/50 uppercase">
                &copy; {{ new Date().getFullYear() }} Aura & Oak Atelier.
            </p>
        </div>
        <div class="flex items-center justify-center p-6 lg:p-12">
            <div
                class="w-full max-w-md rounded-2xl border border-aura-sage bg-white p-8 shadow-soft sm:p-10"
            >
                <div v-if="title || description" class="mb-6 text-center">
                    <h1
                        v-if="title"
                        class="font-serif text-2xl tracking-wide text-aura-slate md:text-3xl"
                    >
                        {{ title }}
                    </h1>
                    <p
                        v-if="description"
                        class="mt-1.5 text-xs tracking-wider text-aura-moss"
                    >
                        {{ description }}
                    </p>
                </div>
                <slot />
            </div>
        </div>
    </div>
</template>
