<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

interface Testimonial {
    id: number;
    quote: string;
    author: string;
    initials: string;
    title: string;
    piece: string;
    rating: number;
}

const testimonials: Testimonial[] = [
    {
        id: 1,
        quote: 'The pleated linen dress is simply transcendent. The weight of the flax fabric drapes with architectural poise yet feels weightless in midsummer humidity.',
        author: 'Elena Vance',
        initials: 'EV',
        title: 'Vogue Atelier Contributor',
        piece: 'Pleated Linen Maxi Dress',
        rating: 5,
    },
    {
        id: 2,
        quote: 'Finding genuinely zero-synthetic garments with this caliber of finish is nearly impossible today. Aura & Oak sets a new benchmark for thoughtful luxury.',
        author: 'Julian Moreau',
        initials: 'JM',
        title: 'Architectural Digest Patron',
        piece: 'Tailored Wool Trench',
        rating: 5,
    },
    {
        id: 3,
        quote: 'From the plastic-free unboxing to the hand-stitched French seams, every touchpoint reflects quiet reverence for artisanal slow fashion.',
        author: 'Sophia Chen',
        initials: 'SC',
        title: 'Conscious Wardrobe Curator',
        piece: 'Artisan Canvas Tote',
        rating: 5,
    },
    {
        id: 4,
        quote: 'The raw linen weave has an unmistakable heirloom quality. It breathes effortlessly and holds its refined structure with understated elegance.',
        author: 'Marcus Sterling',
        initials: 'MS',
        title: 'Monocle Lifestyle Editor',
        piece: 'Relaxed Flax Overshirt',
        rating: 5,
    },
    {
        id: 5,
        quote: 'In an era of disposable trends, Aura & Oak creates timeless silhouettes that age like fine wine and feel like second skin against the body.',
        author: 'Camille Laurent',
        initials: 'CL',
        title: 'Minimalist Aesthetician',
        piece: 'Sculpted Silk Trousers',
        rating: 5,
    },
    {
        id: 6,
        quote: 'True sustainability without an ounce of compromise on silhouette or tactile luxury. This is the gold standard for mindful wardrobe curation.',
        author: 'Henrik Lindqvist',
        initials: 'HL',
        title: 'Sustainable Design Critic',
        piece: 'Organic Cotton Cardigan',
        rating: 5,
    },
];

const sectionRef = ref<HTMLElement | null>(null);
const carouselRef = ref<HTMLElement | null>(null);
const activeIndex = ref(0);
const canScrollPrev = ref(false);
const canScrollNext = ref(true);
let autoPlayInterval: number | null = null;
const isHovered = ref(false);
const isVisible = ref(false);
let observer: IntersectionObserver | null = null;

const updateScrollState = (): void => {
    if (!carouselRef.value) return;
    const { scrollLeft, scrollWidth, clientWidth } = carouselRef.value;
    canScrollPrev.value = scrollLeft > 10;
    canScrollNext.value = scrollLeft < scrollWidth - clientWidth - 10;

    const cards = carouselRef.value.querySelectorAll<HTMLElement>('.testimonial-card');
    if (!cards.length) return;
    let closestIndex = 0;
    let minDiff = Infinity;
    cards.forEach((card, idx) => {
        const diff = Math.abs(card.offsetLeft - carouselRef.value!.offsetLeft - scrollLeft);
        if (diff < minDiff) {
            minDiff = diff;
            closestIndex = idx;
        }
    });
    activeIndex.value = closestIndex;
};

const scrollToIndex = (index: number): void => {
    if (!carouselRef.value) return;
    const cards = carouselRef.value.querySelectorAll<HTMLElement>('.testimonial-card');
    const safeIndex = Math.min(Math.max(index, 0), testimonials.length - 1);
    const targetCard = cards[safeIndex];
    if (targetCard) {
        // Horizontal container scroll only — never touches window scroll position
        const targetLeft = targetCard.offsetLeft - carouselRef.value.offsetLeft;
        carouselRef.value.scrollTo({ left: targetLeft, behavior: 'smooth' });
    }
};

const nextSlide = (): void => {
    if (!carouselRef.value) return;
    if (canScrollNext.value) {
        scrollToIndex(activeIndex.value + 1);
    } else {
        scrollToIndex(0);
    }
};

const prevSlide = (): void => {
    if (!carouselRef.value) return;
    if (canScrollPrev.value) {
        scrollToIndex(activeIndex.value - 1);
    } else {
        scrollToIndex(testimonials.length - 1);
    }
};

const startAutoPlay = (): void => {
    stopAutoPlay();
    autoPlayInterval = window.setInterval(() => {
        // Only advance when the section is actively visible in the viewport and not hovered
        if (!isHovered.value && isVisible.value) {
            nextSlide();
        }
    }, 6000);
};

const stopAutoPlay = (): void => {
    if (autoPlayInterval) {
        clearInterval(autoPlayInterval);
        autoPlayInterval = null;
    }
};

onMounted(() => {
    updateScrollState();
    if (sectionRef.value && typeof IntersectionObserver !== 'undefined') {
        observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.value = entry.isIntersecting;
            },
            { threshold: 0.15 }
        );
        observer.observe(sectionRef.value);
    } else {
        isVisible.value = true;
    }
    startAutoPlay();
});

onUnmounted(() => {
    stopAutoPlay();
    observer?.disconnect();
});
</script>

<template>
    <section
        ref="sectionRef"
        class="mx-auto mb-20 max-w-[1400px] px-4 md:mb-28 md:px-6"
        @mouseenter="isHovered = true"
        @mouseleave="isHovered = false"
    >
        <!-- Header with Title & Carousel Nav Controls -->
        <div class="mb-8 flex flex-col items-center justify-between gap-4 text-center sm:flex-row sm:items-end sm:text-left md:mb-12">
            <div>
                <span class="mb-2 block text-[10px] tracking-[0.3em] text-aura-moss uppercase md:text-xs">
                    Acclaim & Patrons
                </span>
                <h2 class="font-serif text-2xl leading-tight text-aura-slate md:text-3xl lg:text-4xl">
                    Quiet Luxury, Confirmed
                </h2>
                <p class="mt-2 max-w-lg text-xs leading-relaxed text-aura-moss md:text-sm">
                    Reflections from our community of mindful collectors and slow fashion advocates.
                </p>
            </div>

            <!-- Navigation Controls -->
            <div class="flex items-center space-x-3">
                <button
                    type="button"
                    aria-label="Previous testimonial"
                    class="flex h-9 w-9 items-center justify-center rounded-full border border-aura-sage bg-white text-aura-slate shadow-xs transition hover:border-aura-slate hover:bg-aura-slate hover:text-white disabled:pointer-events-none disabled:opacity-30 md:h-10 md:w-10 cursor-pointer"
                    @click="prevSlide"
                >
                    <i class="fa-solid fa-chevron-left text-xs" />
                </button>
                <button
                    type="button"
                    aria-label="Next testimonial"
                    class="flex h-9 w-9 items-center justify-center rounded-full border border-aura-sage bg-white text-aura-slate shadow-xs transition hover:border-aura-slate hover:bg-aura-slate hover:text-white disabled:pointer-events-none disabled:opacity-30 md:h-10 md:w-10 cursor-pointer"
                    @click="nextSlide"
                >
                    <i class="fa-solid fa-chevron-right text-xs" />
                </button>
            </div>
        </div>

        <!-- Carousel Track -->
        <div
            ref="carouselRef"
            class="flex gap-6 overflow-x-auto scroll-smooth py-2 px-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
            @scroll.passive="updateScrollState"
        >
            <div
                v-for="item in testimonials"
                :key="item.id"
                class="testimonial-card flex w-[88vw] shrink-0 snap-start flex-col justify-between rounded-2xl border border-aura-sage/80 bg-white/80 p-6 shadow-soft backdrop-blur-xs transition-all duration-300 hover:border-aura-accent/60 hover:shadow-md sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] md:p-8"
            >
                <div>
                    <!-- Stars & Quotation Mark -->
                    <div class="mb-5 flex items-center justify-between">
                        <div class="flex space-x-1 text-aura-accent">
                            <i v-for="i in item.rating" :key="i" class="fa-solid fa-star text-xs" />
                        </div>
                        <i class="fa-solid fa-quote-right text-lg text-aura-sage/60" />
                    </div>

                    <p class="font-serif text-sm leading-relaxed text-aura-slate italic md:text-base">
                        "{{ item.quote }}"
                    </p>
                </div>

                <div class="mt-6 flex items-center justify-between border-t border-aura-sage/60 pt-4">
                    <div class="flex items-center space-x-3">
                        <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-aura-slate text-[11px] font-medium text-white">
                            {{ item.initials }}
                        </div>
                        <div>
                            <h4 class="text-xs font-semibold tracking-wider text-aura-slate uppercase">
                                {{ item.author }}
                            </h4>
                            <p class="text-[10px] text-aura-moss">
                                {{ item.title }}
                            </p>
                        </div>
                    </div>
                    <span class="hidden rounded-full bg-aura-sage/40 px-2.5 py-1 text-[9px] text-aura-slate sm:inline-block">
                        {{ item.piece }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Pagination Indicators -->
        <div class="mt-6 flex items-center justify-center space-x-2">
            <button
                v-for="(_, idx) in testimonials"
                :key="idx"
                type="button"
                :aria-label="`Go to slide ${idx + 1}`"
                class="h-1.5 rounded-full transition-all duration-300 cursor-pointer"
                :class="activeIndex === idx ? 'w-8 bg-aura-slate' : 'w-2 bg-aura-sage hover:bg-aura-moss/60'"
                @click="scrollToIndex(idx)"
            />
        </div>
    </section>
</template>
