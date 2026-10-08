<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { JournalArticle } from '@/types/journal';

defineProps<{
    post: JournalArticle;
}>();
</script>

<template>
    <section class="mb-20">
        <div
            class="relative overflow-hidden rounded-[1.5rem] bg-aura-slate text-white md:rounded-[2rem]"
        >
            <div class="grid grid-cols-1 lg:grid-cols-12">
                <div
                    class="relative aspect-[16/10] overflow-hidden lg:col-span-7 lg:aspect-auto"
                >
                    <img
                        v-if="post.featuredImage"
                        :src="post.featuredImage"
                        :alt="post.title"
                        class="h-full w-full object-cover transition duration-700 hover:scale-105"
                    />
                </div>
                <div
                    class="flex flex-col justify-center p-8 lg:col-span-5 lg:p-16"
                >
                    <div
                        class="mb-4 flex items-center space-x-3 text-[10px] tracking-widest text-aura-accent uppercase"
                    >
                        <span v-if="post.category">{{ post.category }}</span>
                        <span>•</span>
                        <span>{{ post.readingTime || '5 min read' }}</span>
                    </div>
                    <h2
                        class="mb-4 font-serif text-2xl md:text-3xl lg:text-4xl"
                    >
                        <Link
                            :href="`/journal/${post.slug}`"
                            class="transition hover:text-aura-sage"
                        >
                            {{ post.title }}
                        </Link>
                    </h2>
                    <p
                        class="mb-6 text-xs leading-relaxed font-light text-gray-300 md:text-sm"
                    >
                        {{ post.excerpt }}
                    </p>
                    <Link
                        :href="`/journal/${post.slug}`"
                        class="flex items-center text-[10px] font-medium tracking-widest text-white uppercase transition hover:text-aura-sage"
                    >
                        Read Story
                        <i class="fa-solid fa-arrow-right ml-2 text-[9px]"></i>
                    </Link>
                </div>
            </div>
        </div>
    </section>
</template>
