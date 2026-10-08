<script setup lang="ts">
interface Testimonial {
    id: number;
    quote: string;
    author: string;
    title: string;
    piece: string;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: 'The pleated linen dress is simply transcendent. The weight of the flax fabric drapes with architectural poise yet feels weightless in midsummer humidity.',
        author: 'Elena Vance',
        title: 'Vogue Atelier Contributor',
        piece: 'Pleated Linen Maxi Dress',
    },
    {
        id: 2,
        quote: 'Finding genuinely zero-synthetic garments with this caliber of finish is nearly impossible today. Aura & Oak sets a new benchmark for thoughtful luxury.',
        author: 'Julian Moreau',
        title: 'Architectural Digest Patron',
        piece: 'Tailored Wool Trench',
    },
    {
        id: 3,
        quote: 'From the plastic-free unboxing to the hand-stitched French seams, every touchpoint reflects quiet reverence for artisanal slow fashion.',
        author: 'Sophia Chen',
        title: 'Conscious Wardrobe Curator',
        piece: 'Artisan Canvas Tote',
    },
];
</script>

<template>
    <section class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6">
        <div class="mb-10 text-center md:mb-14">
            <span class="mb-2 block text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                Acclaim & Patrons
            </span>
            <h2 class="font-serif text-2xl leading-tight text-aura-slate md:text-3xl lg:text-4xl">
                Quiet Luxury, Confirmed
            </h2>
            <p class="mx-auto mt-2 max-w-lg text-xs leading-relaxed text-aura-moss md:text-sm">
                Reflections from our community of mindful collectors and slow fashion advocates.
            </p>
        </div>

        <div class="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
            <div
                v-for="item in testimonials"
                :key="item.id"
                class="flex flex-col justify-between rounded-2xl border border-aura-sage bg-white/70 p-6 shadow-soft backdrop-blur-xs transition duration-300 hover:border-aura-accent/60 md:p-8"
            >
                <div>
                    <!-- Star Rating -->
                    <div class="mb-4 flex space-x-1 text-aura-slate">
                        <i v-for="i in 5" :key="i" class="fa-solid fa-star text-[10px]"></i>
                    </div>

                    <p class="font-serif text-sm leading-relaxed text-aura-slate italic md:text-base">
                        "{{ item.quote }}"
                    </p>
                </div>

                <div class="mt-6 border-t border-aura-sage/60 pt-4">
                    <h4 class="text-xs font-semibold tracking-wider text-aura-slate uppercase">
                        {{ item.author }}
                    </h4>
                    <p class="text-[10px] text-aura-moss">
                        {{ item.title }}
                    </p>
                    <span class="mt-2 inline-block rounded bg-aura-sage/50 px-2 py-0.5 text-[9px] text-aura-slate">
                        Verified acquisition: {{ item.piece }}
                    </span>
                </div>
            </div>
        </div>
    </section>
</template>
