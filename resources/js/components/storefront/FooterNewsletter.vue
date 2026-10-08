<script setup lang="ts">
import { ref } from 'vue';
import { Link } from '@inertiajs/vue3';

const email = ref('');
const subscribed = ref(false);

function onSubmit(): void {
    if (!email.value) {
        return;
    }
    subscribed.value = true;
    email.value = '';
}
</script>

<template>
    <div>
        <h3 class="mb-4 font-serif text-2xl md:text-3xl">
            Join the Inner Circle
        </h3>
        <p class="mb-6 max-w-md text-sm font-light text-gray-400">
            Subscribe to receive early access to new edits, sustainable living
            tips, and exclusive atelier updates.
        </p>

        <div
            v-if="subscribed"
            class="mb-4 rounded-sm border border-white/20 bg-white/10 p-4 text-xs text-aura-sage"
        >
            Thank you for subscribing to our atelier. Welcome to the circle.
        </div>

        <form
            v-else
            class="flex max-w-md flex-col gap-3 sm:flex-row"
            @submit.prevent="onSubmit"
        >
            <input
                v-model="email"
                type="email"
                required
                placeholder="Your email address"
                class="flex-1 rounded-sm border border-white/20 bg-white/10 px-6 py-4 text-sm text-white placeholder-gray-400 transition focus:border-aura-accent focus:outline-none"
            />
            <button
                type="submit"
                class="rounded-sm bg-white px-8 py-4 text-[10px] font-medium tracking-widest whitespace-nowrap text-aura-slate uppercase transition hover:bg-aura-sage"
            >
                Subscribe
            </button>
        </form>
        <p class="mt-3 text-[9px] text-gray-500">
            By subscribing, you agree to our
            <Link href="/terms" class="underline hover:text-white"
                >Privacy Policy</Link
            >.
        </p>
    </div>
</template>
