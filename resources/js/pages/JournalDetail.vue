<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import JournalArticleHeader from '@/components/journal/JournalArticleHeader.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { JournalArticle } from '@/types/journal';

defineProps<{
    post: JournalArticle;
    relatedPosts: JournalArticle[];
}>();
</script>

<template>
    <StoreLayout :title="`${post.title} — Aura & Oak Journal`">
        <Head>
            <title>{{ post.title }} | Aura & Oak Journal</title>
            <meta name="description" :content="post.excerpt" />
        </Head>

        <!-- Breadcrumbs -->
        <div class="mx-auto w-full max-w-[1400px] px-6 py-6">
            <nav
                class="flex text-[10px] tracking-widest text-aura-moss uppercase"
            >
                <Link href="/" class="transition hover:text-aura-slate"
                    >Home</Link
                >
                <span class="mx-2">/</span>
                <Link href="/journal" class="transition hover:text-aura-slate"
                    >Journal</Link
                >
                <span class="mx-2">/</span>
                <span class="text-aura-slate">{{ post.title }}</span>
            </nav>
        </div>

        <article class="mx-auto mb-24 w-full max-w-4xl px-6">
            <JournalArticleHeader
                :title="post.title"
                :excerpt="post.excerpt"
                :category="post.category"
                :reading-time="post.readingTime"
                :published-at="post.publishedAt"
            />

            <!-- Featured Cover Image -->
            <div
                v-if="post.featuredImage"
                class="mb-12 overflow-hidden rounded-2xl bg-aura-sage shadow-soft"
            >
                <img
                    :src="post.featuredImage"
                    :alt="post.title"
                    class="h-[360px] w-full object-cover mix-blend-multiply md:h-[500px]"
                />
            </div>

            <!-- Body Content -->
            <div
                class="mx-auto max-w-3xl text-sm leading-relaxed font-light text-aura-slate md:text-base"
            >
                <div class="leading-loose whitespace-pre-line">
                    {{ post.content }}
                </div>
            </div>

            <!-- Return link -->
            <div class="mt-16 border-t border-aura-sage pt-8 text-center">
                <Link
                    href="/journal"
                    class="inline-flex items-center rounded bg-aura-slate px-8 py-3.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                >
                    <i class="fa-solid fa-arrow-left mr-2 text-[10px]"></i>
                    Return to All Stories
                </Link>
            </div>
        </article>
    </StoreLayout>
</template>
