<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

interface Props {
    eyebrow?: string;
    title: string;
    description?: string;
    linkText?: string;
    linkHref?: string;
    centered?: boolean;
}

withDefaults(defineProps<Props>(), {
    eyebrow: '',
    description: '',
    linkText: '',
    linkHref: '',
    centered: false,
});
</script>

<template>
    <div
        :class="[
            'w-full',
            centered
                ? 'mx-auto mb-12 max-w-2xl text-center md:mb-16'
                : 'mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-end md:mb-10',
        ]"
    >
        <div :class="centered ? '' : 'max-w-xl'">
            <span
                v-if="eyebrow"
                class="mb-2 block text-[10px] font-medium tracking-[0.3em] text-aura-moss uppercase md:text-[11px]"
            >
                {{ eyebrow }}
            </span>
            <h2
                class="font-serif text-2xl tracking-tight text-aura-slate md:text-3xl lg:text-4xl"
            >
                {{ title }}
            </h2>
            <p
                v-if="description"
                class="mt-2 text-xs leading-relaxed font-light text-aura-moss md:text-sm"
            >
                {{ description }}
            </p>
        </div>

        <Link
            v-if="linkText && linkHref && !centered"
            :href="linkHref"
            class="group flex shrink-0 items-center self-start text-[10px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate sm:self-auto"
        >
            <span>{{ linkText }}</span>
            <i
                class="fa-solid fa-arrow-right ml-2 transform text-[8px] transition duration-200 group-hover:translate-x-1"
            ></i>
        </Link>
    </div>
</template>
