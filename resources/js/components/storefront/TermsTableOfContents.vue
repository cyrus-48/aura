<script setup lang="ts">
export interface TermsSectionItem {
    id: string;
    title: string;
}

defineProps<{
    sections: TermsSectionItem[];
}>();
</script>

<template>
    <aside class="w-full shrink-0 lg:w-64">
        <div class="sticky top-24">
            <h3
                class="mb-6 border-b border-aura-sage pb-4 text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
            >
                Table of Contents
            </h3>
            <ul class="space-y-3 text-sm">
                <li v-for="sec in sections" :key="sec.id">
                    <a
                        :href="`#${sec.id}`"
                        class="block text-aura-moss transition hover:text-aura-slate"
                    >
                        {{ sec.title }}
                    </a>
                </li>
            </ul>
        </div>
    </aside>
</template>
