<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div>
        <!-- Core Values Grid -->
        <section class="mb-24 bg-aura-sage py-24 md:py-32">
            <div class="mx-auto max-w-[1400px] px-6">
                <div class="mb-16 text-center">
                    <span
                        class="mb-4 block text-[10px] tracking-widest text-aura-accent uppercase"
                    >
                        What Drives Us
                    </span>
                    <h2 class="font-serif text-4xl text-aura-slate md:text-5xl">
                        Our Core Values
                    </h2>
                </div>

                <div class="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
                    <!-- Value 1 -->
                    <div
                        class="rounded-2xl bg-aura-bg p-8 text-center shadow-soft md:p-10"
                    >
                        <div
                            class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
                        >
                            <i class="fa-solid fa-seedling text-lg"></i>
                        </div>
                        <h3 class="mb-4 font-serif text-2xl text-aura-slate">
                            Planet First
                        </h3>
                        <p
                            class="text-sm leading-relaxed font-light text-aura-moss"
                        >
                            We use exclusively organic, recycled, and low-impact
                            materials. Our packaging is plastic-free, and we
                            offset 100% of our carbon emissions.
                        </p>
                    </div>

                    <!-- Value 2 -->
                    <div
                        class="rounded-2xl bg-aura-bg p-8 text-center shadow-soft md:p-10"
                    >
                        <div
                            class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
                        >
                            <i
                                class="fa-solid fa-hands-holding-circle text-lg"
                            ></i>
                        </div>
                        <h3 class="mb-4 font-serif text-2xl text-aura-slate">
                            Ethical Craft
                        </h3>
                        <p
                            class="text-sm leading-relaxed font-light text-aura-moss"
                        >
                            We partner directly with artisans and small-scale
                            manufacturers who share our values. We guarantee
                            fair wages, safe working conditions, and no child
                            labor.
                        </p>
                    </div>

                    <!-- Value 3 -->
                    <div
                        class="rounded-2xl bg-aura-bg p-8 text-center shadow-soft md:p-10"
                    >
                        <div
                            class="mx-auto mb-6 flex h-12 w-12 items-center justify-center rounded-full bg-aura-sage text-aura-slate"
                        >
                            <i class="fa-solid fa-gem text-lg"></i>
                        </div>
                        <h3 class="mb-4 font-serif text-2xl text-aura-slate">
                            Timeless Quality
                        </h3>
                        <p
                            class="text-sm leading-relaxed font-light text-aura-moss"
                        >
                            We reject the trend cycle. Our pieces are designed
                            to be worn for decades, not seasons. We prioritize
                            durability, comfort, and enduring style.
                        </p>
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA Section -->
        <section class="mx-auto mb-24 max-w-[1400px] px-6 text-center">
            <h2
                class="font-serif text-3xl font-medium text-aura-slate md:text-4xl"
            >
                Experience the Atelier
            </h2>
            <p
                class="mx-auto mt-2 mb-8 max-w-md text-xs font-light text-aura-moss sm:text-sm"
            >
                Explore our current seasonal release of handcrafted stoneware
                and bespoke organic textiles.
            </p>
            <Link
                href="/shop"
                class="inline-block rounded bg-aura-slate px-8 py-3.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
            >
                Explore Shop Collection
                <i class="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
            </Link>
        </section>
    </div>
</template>
