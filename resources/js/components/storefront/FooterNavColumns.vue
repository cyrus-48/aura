<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

const columns = [
    {
        title: 'Shop',
        links: [
            { label: 'New Arrivals', href: '/shop' },
            { label: 'All Garments', href: '/shop' },
            { label: 'Curated Collections', href: '/collections' },
            { label: 'Artisanal Objects', href: '/shop' },
        ],
    },
    {
        title: 'About',
        links: [
            { label: 'Our Story', href: '/our-story' },
            { label: 'The Journal', href: '/journal' },
            { label: 'Artisans & Ethics', href: '/our-story' },
            { label: 'Trade Inquiries', href: '/contact' },
        ],
    },
    {
        title: 'Support',
        links: [
            { label: 'Concierge Desk', href: '/contact' },
            { label: 'FAQ & Guidance', href: '/faq' },
            { label: 'Shipping & Returns', href: '/faq' },
            { label: 'Terms of Service', href: '/terms' },
        ],
    },
];
</script>

<template>
    <div class="grid grid-cols-2 gap-8 sm:grid-cols-3">
        <div v-for="col in columns" :key="col.title">
            <h4
                class="mb-6 text-[11px] font-semibold tracking-widest text-aura-accent uppercase"
            >
                {{ col.title }}
            </h4>
            <ul class="space-y-3 text-sm font-light text-gray-400">
                <li v-for="link in col.links" :key="link.label">
                    <Link :href="link.href" class="transition hover:text-white">
                        {{ link.label }}
                    </Link>
                </li>
            </ul>
        </div>
    </div>
</template>
