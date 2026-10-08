<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <section class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6">
        <div
            class="relative flex flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-aura-sage/70 via-aura-bg to-aura-sage/40 p-6 shadow-soft md:flex-row md:items-center md:rounded-[2rem] md:p-12 lg:p-16"
        >
            <!-- Left Editorial Text -->
            <div class="flex flex-col justify-center md:w-1/2 md:pr-10 lg:pr-16">
                <span class="mb-3 text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                    Our Philosophy
                </span>
                <h2 class="mb-4 font-serif text-3xl leading-[1.15] text-aura-slate md:text-4xl lg:text-[2.75rem]">
                    Slow Craft. <br class="hidden sm:inline" />
                    Pure Fibers. <br class="hidden sm:inline" />
                    Quiet Elegance.
                </h2>
                <p class="mb-6 text-xs leading-relaxed text-aura-moss md:text-sm">
                    At Aura & Oak, we reject the cycles of disposable fashion. Every garment is cut in limited, artisanal batches from certified Normandy flax linen, unbleached organic cotton, and responsibly shorn merino wool.
                </p>

                <!-- Value Highlights -->
                <div class="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div class="flex items-start space-x-3">
                        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aura-slate text-xs text-white">
                            <i class="fa-solid fa-seedling text-[10px]"></i>
                        </span>
                        <div>
                            <h4 class="text-[11px] font-medium text-aura-slate uppercase tracking-wider">
                                100% Botanical Fibers
                            </h4>
                            <p class="text-[10px] text-aura-moss leading-normal">
                                Zero synthetic polyesters, nylon, or petroleum blends.
                            </p>
                        </div>
                    </div>

                    <div class="flex items-start space-x-3">
                        <span class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-aura-slate text-xs text-white">
                            <i class="fa-solid fa-scissors text-[10px]"></i>
                        </span>
                        <div>
                            <h4 class="text-[11px] font-medium text-aura-slate uppercase tracking-wider">
                                Small-Batch Atelier
                            </h4>
                            <p class="text-[10px] text-aura-moss leading-normal">
                                French seams and hand-stitched detailing on every hem.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
                    <Link
                        href="/story"
                        class="inline-block bg-aura-slate px-8 py-3.5 text-center text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                    >
                        Our Atelier Story
                    </Link>
                    <Link
                        href="/shop"
                        class="inline-block border border-aura-slate px-8 py-3.5 text-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:bg-aura-slate hover:text-white"
                    >
                        Explore Sustainable Edit
                    </Link>
                </div>
            </div>

            <!-- Right Image with Floating Atelier Card -->
            <div class="relative mt-8 md:mt-0 md:w-1/2">
                <div class="relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[5/4]">
                    <img
                        src="https://images.unsplash.com/photo-1544441893-675973e31985?q=80&w=1000&auto=format&fit=crop"
                        alt="Atelier fabric and tailoring craft"
                        class="h-full w-full object-cover object-center"
                        loading="lazy"
                    />
                    <div class="absolute inset-0 bg-aura-slate/10"></div>
                </div>

                <!-- Floating Quote Card -->
                <div
                    class="mt-4 rounded-xl border border-white/60 bg-white/90 p-4 shadow-soft backdrop-blur-md sm:absolute sm:-bottom-6 sm:-left-6 sm:mt-0 sm:max-w-xs md:p-5"
                >
                    <span class="mb-1 block font-script text-xl text-aura-accent">
                        Atelier Note
                    </span>
                    <p class="text-[11px] leading-relaxed italic text-aura-slate">
                        "Clothes created to breathe with you, soften with each laundering, and become lifelong wardrobe heirlooms."
                    </p>
                    <span class="mt-2 block text-[8px] tracking-[0.2em] text-aura-moss uppercase">
                        Aura & Oak Design Studio
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
