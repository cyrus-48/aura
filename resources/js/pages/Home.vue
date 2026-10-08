<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import HomeArtisanalValues from '@/components/storefront/HomeArtisanalValues.vue';
import HomeBrandStatement from '@/components/storefront/HomeBrandStatement.vue';
import HomeCategories from '@/components/storefront/HomeCategories.vue';
import HomeEditorialStory from '@/components/storefront/HomeEditorialStory.vue';
import HomeFeaturedCollections from '@/components/storefront/HomeFeaturedCollections.vue';
import HomeHeroSection from '@/components/storefront/HomeHeroSection.vue';
import HomeJournalPreview from '@/components/storefront/HomeJournalPreview.vue';
import HomeNewArrivals from '@/components/storefront/HomeNewArrivals.vue';
import HomeNewsletterSection from '@/components/storefront/HomeNewsletterSection.vue';
import HomeTestimonials from '@/components/storefront/HomeTestimonials.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { CollectionData } from '@/types/collection';
import type { JournalArticle } from '@/types/journal';
import type { ProductCategory, ProductCard } from '@/types/product';

withDefaults(
    defineProps<{
        categories?: ProductCategory[];
        newArrivals?: ProductCard[];
        heroProduct?: ProductCard | null;
        featuredCollections?: CollectionData[];
        featuredArticle?: JournalArticle | null;
    }>(),
    {
        categories: () => [],
        newArrivals: () => [],
        heroProduct: null,
        featuredCollections: () => [],
        featuredArticle: null,
    },
);
</script>

<template>
    <StoreLayout title="Aura & Oak | Consciously Crafted Fashion">
        <Head>
            <title>Aura & Oak | Consciously Crafted Fashion</title>
            <meta
                name="description"
                content="Discover our latest collection of sustainable, artisanal pieces designed for the conscious modern wardrobe."
            />
        </Head>

        <div>
            <!-- 1. Hero Section -->
            <HomeHeroSection />

            <!-- 2. Value Pillars (Carbon neutral, Easy exchanges, Secure payment) -->
            <HomeArtisanalValues />

            <!-- 3. Curated Wardrobe Categories -->
            <HomeCategories :categories="categories" />

            <!-- 4. New Arrivals Grid -->
            <HomeNewArrivals :products="newArrivals" />

            <!-- 5. Seasonal Capsule Collections -->
            <HomeFeaturedCollections :collections="featuredCollections" />

            <!-- 6. Atelier Craftsmanship & Story Spotlight -->
            <HomeEditorialStory />

            <!-- 7. Dispatches from the Atelier Journal -->
            <HomeJournalPreview :article="featuredArticle" />

            <!-- 8. Patron Reviews & Acclaim -->
            <HomeTestimonials />

            <!-- 9. Private Atelier Newsletter -->
            <HomeNewsletterSection />

            <!-- 10. Brand Typography Statement -->
            <HomeBrandStatement />
        </div>
    </StoreLayout>
</template>
