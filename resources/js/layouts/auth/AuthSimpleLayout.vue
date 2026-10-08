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
        class="flex min-h-screen flex-col items-center justify-center bg-aura-bg px-4 py-12 selection:bg-aura-slate selection:text-white sm:px-6 lg:px-8"
    >
        <div class="w-full max-w-md">
            <!-- Brand Atelier Header -->
            <div class="mb-8 flex flex-col items-center text-center">
                <Link
                    :href="home()"
                    class="group flex flex-col items-center transition-opacity hover:opacity-90"
                >
                    <span
                        class="font-serif text-2xl tracking-[0.25em] text-aura-slate uppercase transition-colors group-hover:text-aura-moss md:text-3xl"
                    >
                        Aura & Oak
                    </span>
                    <span
                        class="mt-1 text-[9px] tracking-[0.45em] text-aura-moss uppercase"
                    >
                        Atelier
                    </span>
                </Link>
            </div>

            <!-- Elevated Auth Card -->
            <div
                class="rounded-2xl border border-aura-sage bg-white p-8 shadow-soft sm:p-10"
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

            <!-- Return to Storefront -->
            <div class="mt-6 text-center">
                <Link
                    :href="home()"
                    class="inline-flex items-center gap-2 text-xs font-medium tracking-widest text-aura-moss uppercase transition-colors hover:text-aura-slate"
                >
                    <i class="fa-solid fa-arrow-left text-[10px]"></i>
                    Return to Atelier
                </Link>
            </div>
        </div>
    </div>
</template>
