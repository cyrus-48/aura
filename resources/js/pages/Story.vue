<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import StoryHero from '@/components/storefront/StoryHero.vue';
import StoryManifesto from '@/components/storefront/StoryManifesto.vue';
import StoryPillars from '@/components/storefront/StoryPillars.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
</script>

<template>
    <StoreLayout title="Our Story — Aura & Oak">
        <Head>
            <title>Our Story | Aura & Oak</title>
            <meta
                name="description"
                content="Discover the philosophy, sustainable craftsmanship, and artisanal roots of Aura & Oak Atelier."
            />
        </Head>

        <main class="w-full flex-grow space-y-24 py-8 md:py-12">
            <StoryHero />
            <StoryManifesto />
            <StoryPillars />
        </main>
    </StoreLayout>
</template>
