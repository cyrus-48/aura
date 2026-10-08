<script setup lang="ts">
// ContactInfoCards component
</script>

<template>
    <section class="mb-24 grid grid-cols-1 gap-8 md:grid-cols-3">
        <!-- Email Card -->
        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-8 text-center shadow-soft md:p-10"
        >
            <div
                class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
            >
                <i class="fa-regular fa-envelope text-lg"></i>
            </div>
            <h3 class="mb-3 font-serif text-xl text-aura-slate">Email Us</h3>
            <p class="mb-4 text-sm font-light text-aura-moss">
                Our team typically replies within 24 hours.
            </p>
            <a
                href="mailto:concierge@auraandoak.com"
                class="border-b border-aura-slate pb-1 text-[11px] font-medium tracking-widest text-aura-slate uppercase transition hover:border-aura-accent hover:text-aura-accent"
            >
                concierge@auraandoak.com
            </a>
        </div>

        <!-- Phone Card -->
        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-8 text-center shadow-soft md:p-10"
        >
            <div
                class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
            >
                <i class="fa-solid fa-phone text-lg"></i>
            </div>
            <h3 class="mb-3 font-serif text-xl text-aura-slate">Call Us</h3>
            <p class="mb-4 text-sm font-light text-aura-moss">
                Mon-Fri from 9am to 6pm EST.
            </p>
            <a
                href="tel:+18005550199"
                class="border-b border-aura-slate pb-1 text-[11px] font-medium tracking-widest text-aura-slate uppercase transition hover:border-aura-accent hover:text-aura-accent"
            >
                +1 (800) 555-0199
            </a>
        </div>

        <!-- Visit Card -->
        <div
            class="rounded-2xl border border-aura-sage/50 bg-white p-8 text-center shadow-soft md:p-10"
        >
            <div
                class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
            >
                <i class="fa-solid fa-location-dot text-lg"></i>
            </div>
            <h3 class="mb-3 font-serif text-xl text-aura-slate">
                Visit the Atelier
            </h3>
            <p class="mb-4 text-sm font-light text-aura-moss">
                By appointment only.
            </p>
            <span
                class="text-[11px] font-medium tracking-widest text-aura-slate uppercase"
            >
                124 Greenway Blvd, Portland, OR
            </span>
        </div>
    </section>
</template>
