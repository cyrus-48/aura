<script setup lang="ts">
// StoryHero presentational component
</script>

<template>
    <section class="mx-auto mb-16 max-w-[1400px] px-4 md:mb-24 md:px-6">
        <div
            class="relative flex h-[50vh] items-center justify-center overflow-hidden rounded-[1.5rem] md:h-[60vh] md:rounded-[2rem]"
        >
            <img
                src="https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2000&auto=format&fit=crop"
                alt="Aura & Oak Atelier"
                class="absolute inset-0 h-full w-full object-cover object-center"
            />
            <div class="absolute inset-0 bg-aura-slate/50 mix-blend-multiply" />
            <div class="relative z-10 mx-auto max-w-3xl px-6 text-center">
                <span
                    class="mb-4 block text-[10px] tracking-[0.4em] text-white/80 uppercase md:mb-6 md:text-xs"
                >
                    Our Roots
                </span>
                <h1
                    class="font-serif text-4xl leading-tight text-white md:text-6xl lg:text-7xl"
                >
                    Crafting a Better <br />Tomorrow
                </h1>
            </div>
        </div>
    </section>
</template>
