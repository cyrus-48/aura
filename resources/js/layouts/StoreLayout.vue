<script setup lang="ts">
import AppHeader from '@/components/storefront/AppHeader.vue';
import AppFooter from '@/components/storefront/AppFooter.vue';
import Sonner from '@/components/ui/sonner/Sonner.vue';
</script>

<template>
    <div
        class="flex min-h-screen flex-col bg-aura-bg font-sans text-aura-slate antialiased selection:bg-aura-slate selection:text-white"
    >
        <!-- Global Storefront Header -->
        <AppHeader />

        <!-- Main Storefront Page View -->
        <main class="w-full flex-grow">
            <slot />
        </main>

        <!-- Global Storefront Footer -->
        <AppFooter />

        <!-- Toast Notifications -->
        <Sonner position="top-right" :duration="3500" />
    </div>
</template>
