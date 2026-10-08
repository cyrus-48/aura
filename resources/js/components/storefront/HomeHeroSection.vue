<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <section class="mx-auto mb-16 max-w-[1400px] px-4 md:mb-24 md:px-6">
        <div
            class="relative flex min-h-[500px] flex-col overflow-hidden rounded-[1.5rem] bg-gradient-to-r from-aura-sage to-aura-bg shadow-soft md:min-h-[600px] md:flex-row md:rounded-[2rem]"
        >
            <!-- Hero Content -->
            <div
                class="z-10 order-2 flex w-full flex-col justify-center p-8 md:order-1 md:w-1/2 md:p-16 lg:p-24"
            >
                <span
                    class="mb-4 text-[10px] tracking-widest text-aura-moss uppercase md:mb-6"
                >
                    The New Edit
                </span>
                <h1
                    class="mb-4 font-serif text-4xl leading-[1.1] text-aura-slate md:mb-6 md:text-5xl lg:text-[4rem]"
                >
                    Rooted in <br />
                    Nature, Worn <br />
                    with Grace.
                </h1>
                <p
                    class="mb-8 max-w-sm text-sm leading-relaxed font-light text-aura-moss md:mb-10"
                >
                    Discover our latest collection of sustainable, artisanal
                    pieces designed for the conscious modern wardrobe.
                </p>

                <div
                    class="flex flex-col space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4"
                >
                    <Link
                        href="/shop"
                        class="w-full bg-aura-slate px-8 py-4 text-center text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss sm:w-auto"
                    >
                        Shop The Edit
                    </Link>
                    <Link
                        href="/collections"
                        class="w-full border border-aura-slate px-8 py-4 text-center text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:bg-aura-slate hover:text-white sm:w-auto"
                    >
                        View Collections
                    </Link>
                </div>
            </div>

            <!-- Hero Image Area -->
            <div
                class="relative order-1 h-[400px] w-full md:order-2 md:h-auto md:w-1/2"
            >
                <img
                    src="https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop"
                    alt="Woman in sustainable fashion"
                    class="absolute inset-0 h-full w-full object-cover object-center md:object-top"
                />

                <!-- Trending Card Overlay -->
                <div
                    class="absolute right-6 bottom-6 flex max-w-[260px] items-center space-x-3 rounded-xl border border-white/40 bg-white/80 p-3 shadow-lg backdrop-blur-md md:right-10 md:bottom-10 md:max-w-[280px] md:space-x-4 md:p-4"
                >
                    <img
                        src="https://images.unsplash.com/photo-1591561954557-26941169b49e?q=80&w=200&auto=format&fit=crop"
                        alt="Canvas Tote"
                        class="h-12 w-12 rounded-md object-cover md:h-16 md:w-16"
                    />
                    <div>
                        <span
                            class="mb-1 block text-[7px] tracking-widest text-aura-moss uppercase md:text-[8px]"
                        >
                            Trending Now
                        </span>
                        <h4
                            class="mb-1 text-[10px] font-medium text-aura-slate md:text-xs"
                        >
                            Artisan Canvas Tote
                        </h4>
                        <p
                            class="mb-1 text-xs font-semibold text-aura-slate md:mb-2 md:text-sm"
                        >
                            $85.00
                        </p>
                        <Link
                            href="/shop"
                            class="border-b border-aura-slate pb-0.5 text-[8px] font-medium tracking-wider text-aura-slate uppercase transition hover:border-aura-accent hover:text-aura-accent md:text-[9px]"
                        >
                            Shop Now
                            <i
                                class="fa-solid fa-arrow-right ml-1 text-[7px] md:text-[8px]"
                            ></i>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>
