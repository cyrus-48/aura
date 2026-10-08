<script setup lang="ts">
import { computed, ref } from 'vue';
import { Link, usePage } from '@inertiajs/vue3';
import HeaderMobileDrawer from '@/components/storefront/HeaderMobileDrawer.vue';
import HeaderSearchModal from '@/components/storefront/HeaderSearchModal.vue';
import type { StorefrontNavItem } from '@/types/navigation';
import type { User } from '@/types/auth';

const navLinks: StorefrontNavItem[] = [
    { title: 'Home', href: '/' },
    { title: 'Shop', href: '/shop' },
    { title: 'Collections', href: '/collections' },
    { title: 'Journal', href: '/journal' },
    { title: 'Our Story', href: '/our-story' },
    { title: 'Contact', href: '/contact' },
];

const page = usePage();
const currentUrl = computed(() => page.url);

const authUser = computed<User | null>(() => {
    const props = page.props as { auth?: { user?: User } };
    return props.auth?.user || null;
});

const cartCount = computed<number>(() => {
    const props = page.props as {
        cart?: { totalItems?: number };
        cartCount?: number;
    };
    return props.cart?.totalItems ?? props.cartCount ?? 0;
});

const mobileMenuOpen = ref(false);
const searchModalOpen = ref(false);

function isLinkActive(href: string): boolean {
    if (href === '/') {
        return currentUrl.value === '/' || currentUrl.value === '';
    }
    return currentUrl.value.startsWith(href);
}

function handleSearch(query: string): void {
    searchModalOpen.value = false;
    window.location.href = `/shop?search=${encodeURIComponent(query)}`;
}
</script>

<template>
    <nav
        class="relative z-50 mx-auto flex w-full max-w-[1400px] items-center justify-between px-6 py-6"
    >
        <!-- Logo -->
        <div class="flex flex-col items-center">
            <Link href="/" class="flex flex-col items-center">
                <h1
                    class="font-serif text-xl tracking-[0.2em] text-aura-slate uppercase md:text-2xl"
                >
                    Aura & Oak
                </h1>
                <span
                    class="mt-1 text-[8px] tracking-[0.4em] text-aura-moss uppercase md:text-[9px]"
                >
                    Atelier
                </span>
            </Link>
        </div>

        <!-- Desktop Links -->
        <div
            class="hidden space-x-10 text-[11px] font-medium tracking-widest uppercase lg:flex"
        >
            <Link
                v-for="link in navLinks"
                :key="link.href"
                :href="link.href"
                :class="[
                    'transition',
                    isLinkActive(link.href)
                        ? 'border-b border-aura-slate pb-1 text-aura-slate'
                        : 'text-aura-moss hover:text-aura-slate',
                ]"
            >
                {{ link.title }}
            </Link>
        </div>

        <!-- Icons -->
        <div class="flex items-center space-x-5 text-lg md:space-x-6">
            <button
                type="button"
                class="cursor-pointer text-aura-moss transition hover:text-aura-accent"
                aria-label="Search the atelier"
                @click="searchModalOpen = true"
            >
                <i class="fa-solid fa-magnifying-glass"></i>
            </button>

            <Link
                v-if="authUser"
                href="/account"
                class="hidden text-aura-moss transition hover:text-aura-accent sm:block"
                aria-label="My Account"
            >
                <i class="fa-regular fa-user"></i>
            </Link>
            <Link
                v-else
                href="/login"
                class="hidden text-aura-moss transition hover:text-aura-accent sm:block"
                aria-label="Sign In"
            >
                <i class="fa-regular fa-user"></i>
            </Link>

            <Link
                href="/cart"
                class="relative text-aura-moss transition hover:text-aura-accent"
                aria-label="Shopping Bag"
            >
                <i class="fa-solid fa-bag-shopping"></i>
                <span
                    v-if="cartCount > 0"
                    class="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-aura-slate text-[9px] text-white"
                >
                    {{ cartCount }}
                </span>
            </Link>

            <!-- Mobile Menu Toggle -->
            <button
                type="button"
                class="ml-2 cursor-pointer text-aura-moss transition hover:text-aura-accent lg:hidden"
                aria-label="Open mobile menu"
                @click="mobileMenuOpen = true"
            >
                <i class="fa-solid fa-bars"></i>
            </button>
        </div>

        <!-- Mobile Drawer -->
        <HeaderMobileDrawer
            :open="mobileMenuOpen"
            :nav-links="navLinks"
            :current-url="currentUrl"
            :auth-user-name="authUser?.name"
            @close="mobileMenuOpen = false"
        />

        <!-- Search Modal -->
        <HeaderSearchModal
            :open="searchModalOpen"
            @close="searchModalOpen = false"
            @search="handleSearch"
        />
    </nav>
</template>
