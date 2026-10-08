<script setup lang="ts">
defineProps<{
    title: string;
    excerpt: string;
    category: string | null;
    readingTime: string | null;
    publishedAt: string | null;
}>();
</script>

<template>
    <header class="mb-10 text-center">
        <div
            class="mb-4 flex items-center justify-center space-x-3 text-[10px] tracking-widest text-aura-accent uppercase"
        >
            <span v-if="category">{{ category }}</span>
            <span>•</span>
            <span>{{ readingTime || '5 min read' }}</span>
            <span v-if="publishedAt">•</span>
            <span v-if="publishedAt">{{ publishedAt }}</span>
        </div>
        <h1
            class="font-serif text-3xl leading-tight text-aura-slate md:text-5xl lg:text-6xl"
        >
            {{ title }}
        </h1>
        <p
            class="mx-auto mt-6 max-w-2xl font-serif text-base leading-relaxed text-aura-moss md:text-lg"
        >
            {{ excerpt }}
        </p>
    </header>
</template>
