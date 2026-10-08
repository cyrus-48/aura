<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import TermsContentBody from '@/components/storefront/TermsContentBody.vue';
import TermsTableOfContents, {
    type TermsSectionItem,
} from '@/components/storefront/TermsTableOfContents.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';

const sections: TermsSectionItem[] = [
    { id: 'introduction', title: '1. Introduction' },
    { id: 'use-of-website', title: '2. Use of Website' },
    { id: 'products-pricing', title: '3. Products & Pricing' },
    { id: 'orders-payment', title: '4. Orders & Payment' },
    { id: 'shipping-delivery', title: '5. Shipping & Delivery' },
    { id: 'returns-refunds', title: '6. Returns & Refunds' },
    { id: 'intellectual-property', title: '7. Intellectual Property' },
    { id: 'privacy', title: '8. Privacy Policy' },
    { id: 'limitation-liability', title: '9. Limitation of Liability' },
    { id: 'governing-law', title: '10. Governing Law' },
    { id: 'contact', title: '11. Contact Us' },
];
</script>

<template>
    <StoreLayout title="Terms & Conditions — Aura & Oak">
        <Head>
            <title>Terms & Conditions | Aura & Oak</title>
            <meta
                name="description"
                content="Please read these terms and conditions carefully before using our website or placing an order."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-20"
        >
            <span
                class="mb-4 block text-[10px] tracking-[0.3em] text-aura-accent uppercase"
                >Legal</span
            >
            <h1
                class="mb-6 font-serif text-4xl text-aura-slate md:text-5xl lg:text-6xl"
            >
                Terms & Conditions
            </h1>
            <p
                class="mx-auto max-w-xl text-sm font-light text-aura-moss md:text-base"
            >
                Please read these terms and conditions carefully before using
                our website or placing an order.
            </p>
            <p
                class="mt-6 text-[10px] tracking-widest text-aura-moss uppercase"
            >
                Last Updated: October 12, 2024
            </p>
        </header>

        <!-- Main Content -->
        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <TermsTableOfContents :sections="sections" />
                <TermsContentBody />
            </div>
        </main>
    </StoreLayout>
</template>
