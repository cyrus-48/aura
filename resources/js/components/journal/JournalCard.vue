<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { JournalArticle } from '@/types/journal';

defineProps<{
    post: JournalArticle;
}>();
</script>

<template>
    <article class="group flex flex-col">
        <div
            class="relative mb-6 aspect-[16/10] overflow-hidden rounded-2xl bg-aura-sage"
        >
            <img
                v-if="post.featuredImage"
                :src="post.featuredImage"
                :alt="post.title"
                class="h-full w-full object-cover mix-blend-multiply transition duration-500 group-hover:scale-105"
            />
        </div>
        <div
            class="mb-3 flex items-center space-x-3 text-[10px] tracking-widest text-aura-moss uppercase"
        >
            <span v-if="post.category">{{ post.category }}</span>
            <span>•</span>
            <span>{{ post.readingTime || '5 min read' }}</span>
        </div>
        <h3
            class="mb-3 font-serif text-xl text-aura-slate transition group-hover:text-aura-accent"
        >
            <Link :href="`/journal/${post.slug}`">
                {{ post.title }}
            </Link>
        </h3>
        <p
            class="mb-6 line-clamp-2 text-xs leading-relaxed font-light text-aura-moss"
        >
            {{ post.excerpt }}
        </p>
        <Link
            :href="`/journal/${post.slug}`"
            class="mt-auto flex items-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition group-hover:text-aura-accent"
        >
            Read Story
            <i class="fa-solid fa-arrow-right ml-2 text-[9px]"></i>
        </Link>
    </article>
</template>
