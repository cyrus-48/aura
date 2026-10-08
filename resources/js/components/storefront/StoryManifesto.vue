<script setup lang="ts">
// StoryManifesto presentational component
</script>

<template>
    <div class="space-y-24 md:space-y-32">
        <!-- Brand Manifesto -->
        <section class="mx-auto max-w-[1400px] px-6">
            <div class="mx-auto max-w-4xl text-center">
                <i
                    class="fa-solid fa-leaf mb-8 block text-3xl text-aura-accent"
                ></i>
                <h2
                    class="mb-8 font-serif text-3xl leading-relaxed text-aura-slate md:text-4xl md:leading-relaxed lg:text-5xl"
                >
                    "We believe that fashion should not cost the earth. Every
                    garment we create is a promise—to you, to the artisans who
                    make it, and to the planet we all share."
                </h2>
                <p
                    class="text-[10px] font-semibold tracking-widest text-aura-moss uppercase"
                >
                    — The Aura & Oak Founders
                </p>
            </div>
        </section>

        <!-- Founding Story (Split Layout) -->
        <section class="mx-auto max-w-[1400px] px-6">
            <div
                class="flex flex-col items-center gap-12 lg:flex-row lg:gap-20"
            >
                <!-- Image Side -->
                <div class="relative w-full lg:w-1/2">
                    <div
                        class="relative z-10 aspect-[4/5] overflow-hidden rounded-2xl bg-aura-sage"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=800&auto=format&fit=crop"
                            alt="The Beginning"
                            class="h-full w-full object-cover mix-blend-multiply"
                        />
                    </div>
                    <!-- Decorative element -->
                    <div
                        class="absolute -right-6 -bottom-6 z-0 h-48 w-48 rounded-full bg-aura-accent/20 blur-3xl"
                    />
                </div>

                <!-- Text Side -->
                <div class="w-full lg:w-1/2">
                    <span
                        class="mb-4 block text-[10px] tracking-widest text-aura-accent uppercase"
                    >
                        The Beginning
                    </span>
                    <h2
                        class="mb-6 font-serif text-4xl leading-[1.1] text-aura-slate md:text-5xl"
                    >
                        A Journey Rooted <br />in Nature
                    </h2>
                    <div
                        class="space-y-6 text-sm leading-relaxed font-light text-aura-moss md:text-base"
                    >
                        <p>
                            Aura & Oak was born in 2018 from a simple
                            frustration: it was nearly impossible to find
                            clothing that was both beautifully designed and
                            genuinely sustainable. Fast fashion was dominating
                            the industry, and the environmental cost was
                            staggering.
                        </p>
                        <p>
                            We started with a single, small collection of
                            organic linen shirts, crafted by a family-run
                            atelier we met during a trip through the
                            countryside. The response was overwhelming. People
                            wanted clothes that told a story, that felt good to
                            wear, and that didn't harm the planet.
                        </p>
                        <p>
                            Today, we work with a network of artisans across the
                            globe, combining traditional techniques with modern,
                            low-impact materials. We are still small, still
                            independent, and still guided by the same principle:
                            <strong class="font-medium text-aura-slate"
                                >less, but better.</strong
                            >
                        </p>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
