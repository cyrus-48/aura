<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import FaqAccordionList from '@/components/storefront/FaqAccordionList.vue';
import FaqTopicSidebar from '@/components/storefront/FaqTopicSidebar.vue';
import { useFaq } from '@/composables/useFaq';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { FaqItem } from '@/types/faq';

const faqSeedData: FaqItem[] = [
    {
        id: 1,
        category: 'Orders & Shipping',
        question: 'How long will it take to receive my order?',
        answer: 'Domestic orders (within the US) typically arrive within 3-5 business days. International orders can take 7-14 business days depending on the destination and customs processing. You will receive a tracking number as soon as your order ships.',
    },
    {
        id: 2,
        category: 'Orders & Shipping',
        question: 'Do you offer free shipping?',
        answer: 'Yes! We offer free carbon-neutral shipping on all domestic orders over $99. For orders under $99, a flat rate of $8 applies.',
    },
    {
        id: 3,
        category: 'Orders & Shipping',
        question: 'Can I change or cancel my order after placing it?',
        answer: 'We process orders quickly to ensure fast delivery. If you need to make a change, please contact us within 2 hours of placing your order. Once an order has been shipped, it cannot be canceled or modified.',
    },
    {
        id: 4,
        category: 'Returns & Exchanges',
        question: 'What is your return policy?',
        answer: 'We offer a 45-day return policy on all unworn items with original tags attached. Returns are free within the US. Please visit our Returns Portal to initiate an exchange or return.',
    },
    {
        id: 5,
        category: 'Returns & Exchanges',
        question: 'How do I initiate a return or exchange?',
        answer: 'Simply log into your account, go to your order history, and select the item you wish to return. Follow the prompts to print your prepaid shipping label. Once we receive your return, we will process your refund or exchange within 3-5 business days.',
    },
    {
        id: 6,
        category: 'Returns & Exchanges',
        question: 'Are sale items final sale?',
        answer: 'Yes, items purchased during a final sale promotion are not eligible for return or exchange. This will be clearly marked on the product page and at checkout.',
    },
    {
        id: 7,
        category: 'Products & Sizing',
        question: 'How do I know what size to order?',
        answer: 'We provide detailed size guides on every product page. If you are between sizes, we generally recommend sizing up for a more relaxed fit, or sizing down for a more tailored look. Feel free to email us for specific measurements.',
    },
    {
        id: 8,
        category: 'Products & Sizing',
        question: 'How should I care for my linen and organic cotton pieces?',
        answer: 'We recommend washing linen and organic cotton in cold water on a gentle cycle, or hand washing. Lay flat to dry or tumble dry on low. Linen gets softer with every wash. Avoid bleach and fabric softeners.',
    },
    {
        id: 9,
        category: 'Sustainability',
        question: 'What materials do you use?',
        answer: 'We exclusively use organic, recycled, and low-impact materials. Our primary fabrics include GOTS-certified organic cotton, European flax linen, Tencel™ Lyocell, and vegetable-tanned leather.',
    },
    {
        id: 10,
        category: 'Sustainability',
        question: 'Is your packaging plastic-free?',
        answer: 'Yes! All of our packaging is 100% plastic-free. We use recycled cardboard boxes, paper tape, and compostable mailers. Even our garment bags are made from biodegradable materials.',
    },
    {
        id: 11,
        category: 'Account & Payment',
        question: 'What payment methods do you accept?',
        answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay.',
    },
    {
        id: 12,
        category: 'Account & Payment',
        question: 'How do I reset my password?',
        answer: 'Click on the "Account" icon in the top right corner, then select "Forgot Password". Enter your email address, and we will send you a link to reset your password.',
    },
];

const {
    categories,
    selectedCategory,
    searchQuery,
    openItems,
    filteredFaqs,
    toggleItem,
    setCategory,
} = useFaq(faqSeedData);
</script>

<template>
    <StoreLayout title="Frequently Asked Questions — Aura & Oak">
        <Head>
            <title>FAQ | Aura & Oak</title>
            <meta
                name="description"
                content="Find answers to common questions about our products, shipping, returns, and sustainability practices."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-20"
        >
            <span
                class="mb-4 block text-[10px] tracking-[0.3em] text-aura-accent uppercase"
                >Help Center</span
            >
            <h1
                class="mb-6 font-serif text-4xl text-aura-slate md:text-5xl lg:text-6xl"
            >
                Frequently Asked Questions
            </h1>
            <p
                class="mx-auto mb-10 max-w-xl text-sm font-light text-aura-moss md:text-base"
            >
                Find answers to common questions about our products, shipping,
                returns, and sustainability practices.
            </p>

            <!-- Search Bar -->
            <div class="relative mx-auto max-w-xl">
                <input
                    v-model="searchQuery"
                    type="text"
                    placeholder="Search for answers..."
                    class="w-full rounded-full border border-aura-sage bg-white px-6 py-4 text-sm placeholder-aura-moss shadow-soft transition focus:border-aura-slate focus:outline-none"
                />
                <button
                    type="button"
                    class="absolute top-1/2 right-2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-aura-slate text-white transition hover:bg-aura-moss"
                >
                    <i class="fa-solid fa-magnifying-glass text-sm"></i>
                </button>
            </div>
        </header>

        <!-- Main Content -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <FaqTopicSidebar
                    :categories="categories"
                    :selected-category="selectedCategory"
                    @select="setCategory"
                />

                <FaqAccordionList
                    :faqs="filteredFaqs"
                    :open-items="openItems"
                    @toggle="toggleItem"
                />
            </div>
        </main>
    </StoreLayout>
</template>
