<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

defineProps<{
    open: boolean;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
    (e: 'search', query: string): void;
}>();

const searchQuery = ref('');

function onSubmit(): void {
    if (!searchQuery.value.trim()) {
        return;
    }
    emit('search', searchQuery.value.trim());
}
</script>

<template>
    <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-start justify-center bg-aura-slate/50 px-4 pt-20 backdrop-blur-sm"
        @click.self="emit('close')"
    >
        <div
            class="w-full max-w-2xl rounded-2xl border border-aura-sage bg-white p-6 shadow-2xl md:p-8"
        >
            <div
                class="mb-6 flex items-center justify-between border-b border-aura-sage pb-4"
            >
                <span
                    class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
                >
                    Search The Atelier
                </span>
                <button
                    type="button"
                    class="cursor-pointer p-1 text-aura-moss hover:text-aura-slate"
                    aria-label="Close search"
                    @click="emit('close')"
                >
                    <i class="fa-solid fa-xmark text-sm"></i>
                </button>
            </div>

            <form class="relative mb-6" @submit.prevent="onSubmit">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search linen shirts, canvas totes, knitwear..."
                    class="w-full rounded border border-aura-accent/60 bg-aura-bg px-4 py-3.5 text-sm text-aura-slate placeholder-aura-moss focus:border-aura-slate focus:ring-1 focus:ring-aura-slate focus:outline-none"
                    autofocus
                />
                <button
                    type="submit"
                    class="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer px-2 py-1 text-aura-moss hover:text-aura-slate"
                    aria-label="Submit search"
                >
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                </button>
            </form>

            <!-- Quick Tags -->
            <div>
                <span
                    class="mb-2 block text-[9px] font-medium tracking-widest text-aura-moss uppercase"
                >
                    Popular Categories
                </span>
                <div class="flex flex-wrap gap-2 text-xs">
                    <Link
                        href="/shop?category=organic-linens"
                        class="rounded-full bg-aura-sage/50 px-3 py-1.5 text-[11px] text-aura-slate transition hover:bg-aura-slate hover:text-white"
                        @click="emit('close')"
                    >
                        Organic Linen
                    </Link>
                    <Link
                        href="/shop?search=Tote"
                        class="rounded-full bg-aura-sage/50 px-3 py-1.5 text-[11px] text-aura-slate transition hover:bg-aura-slate hover:text-white"
                        @click="emit('close')"
                    >
                        Canvas Totes
                    </Link>
                    <Link
                        href="/shop?search=Knitwear"
                        class="rounded-full bg-aura-sage/50 px-3 py-1.5 text-[11px] text-aura-slate transition hover:bg-aura-slate hover:text-white"
                        @click="emit('close')"
                    >
                        Artisanal Knitwear
                    </Link>
                    <Link
                        href="/shop?badge=new"
                        class="rounded-full bg-aura-sage/50 px-3 py-1.5 text-[11px] text-aura-slate transition hover:bg-aura-slate hover:text-white"
                        @click="emit('close')"
                    >
                        New Arrivals
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
