<script setup lang="ts">
import JournalCard from '@/components/journal/JournalCard.vue';
import type { JournalArticle } from '@/types/journal';

defineProps<{
    posts: JournalArticle[];
}>();
</script>

<template>
    <div class="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        <JournalCard v-for="post in posts" :key="post.id" :post="post" />
    </div>
</template>
