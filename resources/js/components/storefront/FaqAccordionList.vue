<script setup lang="ts">
import { computed } from 'vue';
import type { FaqItem } from '@/types/faq';

const props = defineProps<{
    faqs: FaqItem[];
    openItems: Record<number, boolean>;
}>();

const emit = defineEmits<{
    (e: 'toggle', id: number): void;
}>();

const distinctCategories = computed(() => {
    const set = new Set<string>();
    props.faqs.forEach((faq) => set.add(faq.category));
    return Array.from(set);
});

function itemsForCategory(cat: string): FaqItem[] {
    return props.faqs.filter((faq) => faq.category === cat);
}
</script>

<template>
    <div class="flex-1 space-y-16">
        <section v-for="cat in distinctCategories" :key="cat">
            <h2
                class="mb-8 border-b border-aura-sage pb-4 font-serif text-3xl text-aura-slate"
            >
                {{ cat }}
            </h2>
            <div class="space-y-0">
                <div
                    v-for="item in itemsForCategory(cat)"
                    :key="item.id"
                    class="border-b border-aura-sage py-6"
                >
                    <button
                        type="button"
                        class="group flex w-full items-center justify-between text-left"
                        @click="emit('toggle', item.id)"
                    >
                        <h3
                            class="pr-4 text-sm font-medium text-aura-slate transition group-hover:text-aura-accent"
                        >
                            {{ item.question }}
                        </h3>
                        <i
                            class="fa-solid shrink-0 text-xs text-aura-moss transition-transform duration-300"
                            :class="openItems[item.id] ? 'fa-minus' : 'fa-plus'"
                        ></i>
                    </button>
                    <div
                        v-show="openItems[item.id]"
                        class="mt-4 text-sm leading-relaxed font-light text-aura-moss"
                    >
                        {{ item.answer }}
                    </div>
                </div>
            </div>
        </section>

        <div
            v-if="faqs.length === 0"
            class="py-16 text-center text-sm font-light text-aura-moss"
        >
            No questions matched your search query. Try another term or contact
            our concierge.
        </div>
    </div>
</template>
