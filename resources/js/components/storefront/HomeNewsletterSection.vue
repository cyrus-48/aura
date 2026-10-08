<script setup lang="ts">
import { ref } from 'vue';

const email = ref('');
const isSubscribed = ref(false);

function handleSubmit(): void {
    if (!email.value || !email.value.includes('@')) {
        return;
    }
    isSubscribed.value = true;
    email.value = '';
}
</script>

<template>
    <section class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6">
        <div
            class="relative overflow-hidden rounded-[1.5rem] bg-aura-slate px-6 py-12 text-center text-white shadow-soft md:rounded-[2rem] md:px-16 md:py-20"
        >
            <!-- Decorative Subtle Floral/Leaf watermark -->
            <div class="pointer-events-none absolute -right-12 -top-12 text-white/5">
                <i class="fa-solid fa-feather text-[16rem]"></i>
            </div>

            <div class="relative z-10 mx-auto max-w-2xl">
                <span class="mb-3 block text-[10px] tracking-[0.35em] text-aura-sage uppercase md:text-xs">
                    The Atelier Society
                </span>
                <h2 class="font-serif text-3xl leading-tight font-light md:text-4xl lg:text-5xl">
                    Conscious Dressing, <br class="hidden sm:inline" />
                    Delivered with Care.
                </h2>
                <p class="mt-4 text-xs leading-relaxed text-white/80 md:text-sm">
                    Receive intimate invitations to private capsule releases, behind-the-scenes textile archives, and a 10% consideration on your inaugural order.
                </p>

                <!-- Feedback or Form -->
                <div v-if="isSubscribed" class="mt-8 rounded-xl bg-white/10 p-4 text-xs tracking-wider text-aura-sage uppercase backdrop-blur-xs">
                    <i class="fa-solid fa-circle-check mr-2"></i>
                    Welcome to the Atelier Society. We have recorded your invitation.
                </div>

                <form
                    v-else
                    class="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
                    @submit.prevent="handleSubmit"
                >
                    <input
                        v-model="email"
                        type="email"
                        required
                        placeholder="Enter your email address"
                        class="w-full rounded-none border border-white/30 bg-white/10 px-5 py-3.5 text-xs text-white placeholder-white/50 backdrop-blur-xs focus:border-white focus:bg-white/20 focus:outline-hidden sm:max-w-md"
                    />
                    <button
                        type="submit"
                        class="bg-white px-8 py-3.5 text-center text-[10px] font-semibold tracking-widest text-aura-slate uppercase transition hover:bg-aura-sage sm:w-auto"
                    >
                        Request Access
                    </button>
                </form>

                <p class="mt-4 text-[9px] tracking-wider text-white/50 uppercase">
                    Zero spam. Mindful dispatches only. You may withdraw anytime.
                </p>
            </div>
        </div>
    </section>
</template>
