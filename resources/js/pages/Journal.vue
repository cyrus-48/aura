<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import JournalCategoryFilter from '@/components/journal/JournalCategoryFilter.vue';
import JournalGrid from '@/components/journal/JournalGrid.vue';
import JournalHeroFeatured from '@/components/journal/JournalHeroFeatured.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { PaginatedCollection } from '@/types/catalog';
import type { JournalArticle } from '@/types/journal';

defineProps<{
    featuredPost: JournalArticle | null;
    posts: PaginatedCollection<JournalArticle>;
    categories: string[];
    selectedCategory: string | null;
}>();
</script>

<template>
    <StoreLayout title="The Journal — Aura & Oak">
        <Head>
            <title>The Journal | Aura & Oak</title>
            <meta
                name="description"
                content="Essays on intentional design, natural fibers, and mindful living."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-20"
        >
            <span
                class="mb-4 block text-[10px] tracking-[0.3em] text-aura-accent uppercase"
            >
                Stories & Inspiration
            </span>
            <h1
                class="mb-6 font-serif text-4xl text-aura-slate md:text-5xl lg:text-7xl"
            >
                The Journal
            </h1>
            <p
                class="mx-auto max-w-xl text-sm font-light text-aura-moss md:text-base"
            >
                Exploring the intersection of slow fashion, sustainable living,
                and the art of intentional dressing.
            </p>
        </header>

        <!-- Main Content -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <JournalHeroFeatured
                v-if="featuredPost && !selectedCategory"
                :post="featuredPost"
            />

            <JournalCategoryFilter
                :categories="categories"
                :selected-category="selectedCategory"
            />

            <JournalGrid :posts="posts.data" />
        </main>
    </StoreLayout>
</template>
