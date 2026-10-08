<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { JournalArticle } from '@/types/journal';

withDefaults(
    defineProps<{
        article?: JournalArticle | null;
    }>(),
    {
        article: null,
    },
);
</script>

<template>
    <section class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6">
        <div class="mb-8 flex flex-col items-start justify-between gap-4 md:mb-12 md:flex-row md:items-end">
            <div>
                <span class="mb-2 block text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                    From the Atelier
                </span>
                <h2 class="font-serif text-2xl leading-tight text-aura-slate md:text-3xl lg:text-4xl">
                    The Journal
                </h2>
                <p class="mt-2 max-w-xl text-xs leading-relaxed text-aura-moss md:text-sm">
                    Dispatches on conscious textile origins, fabric care rituals, and architectural dressing.
                </p>
            </div>
            <Link
                href="/journal"
                class="inline-flex items-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:text-aura-moss md:text-xs"
            >
                Read All Entries
                <i class="fa-solid fa-arrow-right ml-2 text-[8px] md:text-[10px]"></i>
            </Link>
        </div>

        <!-- Featured Dispatch Hero Card -->
        <article
            v-if="article"
            class="group overflow-hidden rounded-[1.5rem] border border-aura-sage bg-white shadow-soft transition hover:border-aura-accent/50 md:rounded-[2rem]"
        >
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="relative aspect-[16/10] overflow-hidden bg-aura-sage md:aspect-auto">
                    <img
                        :src="article.featuredImage || 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop'"
                        :alt="article.title"
                        class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                        loading="lazy"
                    />
                </div>

                <div class="flex flex-col justify-between p-6 sm:p-8 md:p-12 lg:p-16">
                    <div>
                        <div class="mb-4 flex items-center space-x-3 text-[10px] tracking-wider text-aura-moss uppercase">
                            <span v-if="article.category" class="rounded bg-aura-sage/80 px-2.5 py-0.5 text-aura-slate font-medium">
                                {{ article.category }}
                            </span>
                            <span v-if="article.readingTime">{{ article.readingTime }}</span>
                            <span v-if="article.publishedAt">• {{ article.publishedAt }}</span>
                        </div>

                        <h3 class="mb-4 font-serif text-2xl leading-snug text-aura-slate transition group-hover:text-aura-moss md:text-3xl">
                            <Link :href="`/journal/${article.slug}`">
                                {{ article.title }}
                            </Link>
                        </h3>

                        <p class="text-xs leading-relaxed text-aura-moss line-clamp-3 md:text-sm">
                            {{ article.excerpt }}
                        </p>
                    </div>

                    <div class="mt-8 pt-6 border-t border-aura-sage/60 flex items-center justify-between">
                        <Link
                            :href="`/journal/${article.slug}`"
                            class="inline-flex items-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:text-aura-moss"
                        >
                            Read Full Dispatch
                            <i class="fa-solid fa-arrow-right ml-2 text-[8px]"></i>
                        </Link>
                        <span class="text-[10px] tracking-widest text-aura-moss uppercase">
                            Issue No. 04
                        </span>
                    </div>
                </div>
            </div>
        </article>

        <!-- Fallback if no article seeded -->
        <article
            v-else
            class="group overflow-hidden rounded-[1.5rem] border border-aura-sage bg-white shadow-soft md:rounded-[2rem]"
        >
            <div class="grid grid-cols-1 md:grid-cols-2">
                <div class="relative aspect-[16/10] overflow-hidden bg-aura-sage md:aspect-auto">
                    <img
                        src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=1200&auto=format&fit=crop"
                        alt="Linen weave close-up"
                        class="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />
                </div>
                <div class="flex flex-col justify-between p-6 sm:p-8 md:p-12">
                    <div>
                        <div class="mb-4 flex items-center space-x-3 text-[10px] tracking-wider text-aura-moss uppercase">
                            <span class="rounded bg-aura-sage/80 px-2.5 py-0.5 text-aura-slate font-medium">Textile Sourcing</span>
                            <span>5 min read</span>
                        </div>
                        <h3 class="mb-4 font-serif text-2xl leading-snug text-aura-slate md:text-3xl">
                            The Flax of Normandy: Why French Linen Ages with Grace
                        </h3>
                        <p class="text-xs leading-relaxed text-aura-moss md:text-sm">
                            Grown along coastal microclimates, our raw flax fibers require zero chemical irrigation and soften continuously through decades of wear.
                        </p>
                    </div>
                    <div class="mt-8 pt-6 border-t border-aura-sage/60">
                        <Link
                            href="/journal"
                            class="inline-flex items-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:text-aura-moss"
                        >
                            Explore All Journal Essays
                            <i class="fa-solid fa-arrow-right ml-2 text-[8px]"></i>
                        </Link>
                    </div>
                </div>
            </div>
        </article>
    </section>
</template>
