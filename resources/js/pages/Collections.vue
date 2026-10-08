<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import CollectionCard from '@/components/catalog/CollectionCard.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { CollectionData } from '@/types/collection';

defineProps<{
    collections?: CollectionData[];
    selectedCollection?: CollectionData;
}>();
</script>

<template>
    <StoreLayout title="Curated Collections — Aura & Oak Atelier">
        <Head>
            <title>Curated Collections | Aura & Oak</title>
            <meta
                name="description"
                content="Cohesive wardrobe stories created with natural botanical dyes and sustainable weaves."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-16"
        >
            <span
                class="mb-4 block text-[10px] tracking-[0.3em] text-aura-accent uppercase"
            >
                Curated Capsules
            </span>
            <h1
                class="mb-4 font-serif text-4xl text-aura-slate md:text-5xl lg:text-6xl"
            >
                The Editorial Edits
            </h1>
            <p
                class="mx-auto max-w-xl text-xs font-light text-aura-moss sm:text-sm"
            >
                Cohesive wardrobe stories created with natural botanical dyes,
                sustainable linen weaves, and architectural tailoring.
            </p>
        </header>

        <!-- Collections List -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] space-y-16 px-6">
            <CollectionCard
                v-for="collection in collections ||
                (selectedCollection ? [selectedCollection] : [])"
                :key="collection.id"
                :collection="collection"
            />
        </main>
    </StoreLayout>
</template>
