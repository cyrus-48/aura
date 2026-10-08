<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { UserProfile } from '@/types/account';

defineProps<{
    user: UserProfile;
}>();
</script>

<template>
    <header class="mx-auto w-full max-w-[1400px] px-6 py-8 md:py-12">
        <div
            class="flex flex-col justify-between gap-4 sm:flex-row sm:items-center"
        >
            <div>
                <h1
                    class="mb-2 font-serif text-3xl text-aura-slate md:text-4xl lg:text-5xl"
                >
                    Welcome Back, {{ user.name }}
                </h1>
                <p class="text-xs font-light text-aura-moss md:text-sm">
                    Manage your orders, addresses, and account settings from
                    your personal atelier dashboard.
                </p>
            </div>
            <Link
                href="/logout"
                method="post"
                as="button"
                class="rounded border border-aura-sage bg-white px-6 py-3 text-[10px] font-medium tracking-widest text-aura-slate uppercase transition hover:border-aura-slate"
            >
                Sign Out
            </Link>
        </div>
    </header>
</template>
