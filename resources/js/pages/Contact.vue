<script setup lang="ts">
import { Head, useForm } from '@inertiajs/vue3';
import { toast } from 'vue-sonner';
import ContactForm from '@/components/storefront/ContactForm.vue';
import ContactInfoCards from '@/components/storefront/ContactInfoCards.vue';
import ContactTradeCard from '@/components/storefront/ContactTradeCard.vue';
import StoreLayout from '@/layouts/StoreLayout.vue';

const form = useForm({
    name: '',
    email: '',
    subject: '',
    message: '',
});

function submitMessage(): void {
    form.post('/contact', {
        preserveScroll: true,
        onSuccess: () => {
            form.reset();
            toast.success(
                'Your message has been received. Our concierge will be in touch shortly.',
            );
        },
        onError: () => {
            toast.error('Please check the form for errors.');
        },
    });
}
</script>

<template>
    <StoreLayout title="Contact Us — Aura & Oak">
        <Head>
            <title>Contact Atelier | Aura & Oak</title>
            <meta
                name="description"
                content="Connect with the Aura & Oak concierge team for bespoke orders, trade inquiries, and product care."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-16"
        >
            <span
                class="mb-4 block text-[10px] tracking-[0.3em] text-aura-accent uppercase"
            >
                Get in Touch
            </span>
            <h1
                class="mb-6 font-serif text-4xl text-aura-slate md:text-5xl lg:text-6xl"
            >
                We'd Love to Hear From You
            </h1>
            <p
                class="mx-auto max-w-xl text-sm font-light text-aura-moss md:text-base"
            >
                Whether you have a question about sizing, an order, or our
                sustainability practices, our concierge team is here to help.
            </p>
        </header>

        <main class="mx-auto mb-24 w-full max-w-[1400px] flex-grow px-6">
            <ContactInfoCards />

            <div class="flex flex-col gap-16 lg:flex-row lg:gap-24">
                <div class="w-full lg:w-3/5">
                    <ContactForm
                        :form="form"
                        :processing="form.processing"
                        :errors="form.errors"
                        @submit="submitMessage"
                    />
                </div>
                <div class="w-full lg:w-2/5">
                    <ContactTradeCard />
                </div>
            </div>
        </main>
    </StoreLayout>
</template>
