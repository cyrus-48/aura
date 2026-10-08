<script setup lang="ts">
import FooterBottomBar from '@/components/storefront/FooterBottomBar.vue';
import FooterNavColumns from '@/components/storefront/FooterNavColumns.vue';
import FooterNewsletter from '@/components/storefront/FooterNewsletter.vue';

const currentYear = new Date().getFullYear();
</script>

<template>
    <footer class="mt-auto bg-aura-slate pt-16 pb-8 text-white">
        <div class="mx-auto max-w-[1400px] px-6">
            <!-- Top Section: Newsletter & Links -->
            <div class="mb-16 grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-24">
                <FooterNewsletter />
                <FooterNavColumns />
            </div>

            <!-- Middle & Bottom Sections -->
            <FooterBottomBar :current-year="currentYear" />
        </div>
    </footer>
</template>
