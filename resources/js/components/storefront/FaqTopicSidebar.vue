<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    categories: string[];
    selectedCategory: string;
}>();

const emit = defineEmits<{
    (e: 'select', category: string): void;
}>();
</script>

<template>
    <aside class="w-full shrink-0 lg:w-64">
        <div class="sticky top-24">
            <h3
                class="mb-6 border-b border-aura-sage pb-4 text-[11px] font-semibold tracking-widest text-aura-slate uppercase"
            >
                Categories
            </h3>
            <ul class="space-y-4 text-sm">
                <li v-for="cat in categories" :key="cat">
                    <button
                        type="button"
                        class="group flex w-full items-center justify-between text-left transition"
                        :class="
                            selectedCategory === cat
                                ? 'font-medium text-aura-slate'
                                : 'text-aura-moss hover:text-aura-slate'
                        "
                        @click="emit('select', cat)"
                    >
                        <span>{{ cat }}</span>
                        <i
                            class="fa-solid fa-chevron-right text-[10px] transition"
                            :class="
                                selectedCategory === cat
                                    ? 'text-aura-accent opacity-100'
                                    : 'opacity-0 group-hover:opacity-100'
                            "
                        ></i>
                    </button>
                </li>
            </ul>

            <!-- Support CTA in Sidebar -->
            <div class="mt-12 rounded-2xl bg-aura-sage p-6">
                <i
                    class="fa-regular fa-comments mb-4 block text-2xl text-aura-slate"
                ></i>
                <h4 class="mb-2 font-serif text-lg text-aura-slate">
                    Still need help?
                </h4>
                <p class="mb-4 text-xs font-light text-aura-moss">
                    Our concierge team is available to assist you.
                </p>
                <Link
                    href="/contact"
                    class="inline-flex items-center border-b border-aura-slate pb-1 text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:border-aura-accent hover:text-aura-accent"
                >
                    Contact Us
                    <i class="fa-solid fa-arrow-right ml-2 text-[8px]"></i>
                </Link>
            </div>
        </div>
    </aside>
</template>
