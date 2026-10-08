<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div
        class="rounded-2xl border border-dashed border-aura-sage py-20 text-center"
    >
        <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
        >
            <i class="fa-solid fa-bag-shopping text-2xl"></i>
        </div>
        <h2 class="mt-4 font-serif text-2xl font-medium text-aura-slate">
            Your shopping bag is empty
        </h2>
        <p class="mx-auto mt-2 max-w-sm text-sm font-light text-aura-moss">
            Discover our curated collection of artisanal essentials, mindfully
            crafted for modern living.
        </p>
        <div class="mt-6">
            <Link
                href="/shop"
                class="inline-flex items-center rounded bg-aura-slate px-8 py-3.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
            >
                Explore Collection
            </Link>
        </div>
    </div>
</template>
