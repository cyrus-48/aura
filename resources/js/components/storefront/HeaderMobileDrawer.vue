<script setup lang="ts">
import { Link } from '@inertiajs/vue3';
import type { StorefrontNavItem } from '@/types/navigation';

defineProps<{
    open: boolean;
    navLinks: StorefrontNavItem[];
    currentUrl: string;
    authUserName?: string | null;
}>();

const emit = defineEmits<{
    (e: 'close'): void;
}>();

function isActive(href: string, currentUrl: string): boolean {
    if (href === '/') {
        return currentUrl === '/' || currentUrl === '';
    }
    return currentUrl.startsWith(href);
}
</script>

<template>
    <div v-if="open" class="fixed inset-0 z-50 flex lg:hidden">
        <!-- Backdrop -->
        <div
            class="fixed inset-0 bg-aura-slate/60 backdrop-blur-xs transition-opacity"
            @click="emit('close')"
        />

        <!-- Drawer Content -->
        <div
            class="relative z-10 flex h-full w-full max-w-xs flex-col justify-between overflow-y-auto bg-aura-bg p-6 shadow-2xl"
        >
            <div>
                <!-- Header -->
                <div
                    class="mb-6 flex items-center justify-between border-b border-aura-sage pb-6"
                >
                    <div class="flex flex-col">
                        <span
                            class="font-serif text-lg tracking-[0.2em] text-aura-slate uppercase"
                            >Aura & Oak</span
                        >
                        <span
                            class="text-[8px] tracking-[0.4em] text-aura-moss uppercase"
                            >Atelier</span
                        >
                    </div>
                    <button
                        type="button"
                        class="p-2 text-aura-slate hover:text-aura-moss"
                        aria-label="Close menu"
                        @click="emit('close')"
                    >
                        <i class="fa-solid fa-xmark text-lg"></i>
                    </button>
                </div>

                <!-- Nav Links -->
                <nav
                    class="flex flex-col space-y-4 text-xs font-medium tracking-[0.2em] uppercase"
                >
                    <Link
                        v-for="link in navLinks"
                        :key="link.href"
                        :href="link.href"
                        class="py-2 transition"
                        :class="
                            isActive(link.href, currentUrl)
                                ? 'border-l-2 border-aura-slate pl-2 font-semibold text-aura-slate'
                                : 'pl-2 text-aura-moss hover:text-aura-slate'
                        "
                        @click="emit('close')"
                    >
                        {{ link.title }}
                    </Link>
                </nav>
            </div>

            <!-- Footer -->
            <div class="mt-6 space-y-3 border-t border-aura-sage pt-6">
                <div v-if="authUserName" class="space-y-2">
                    <Link
                        href="/account"
                        class="block py-1 text-xs font-medium tracking-wider text-aura-slate uppercase hover:text-aura-accent"
                        @click="emit('close')"
                    >
                        <i class="fa-regular fa-user mr-2"></i> Account ({{
                            authUserName
                        }})
                    </Link>
                    <Link
                        href="/logout"
                        method="post"
                        as="button"
                        class="block w-full py-1 text-left text-xs tracking-wider text-aura-moss uppercase hover:text-red-600"
                        @click="emit('close')"
                    >
                        Log Out
                    </Link>
                </div>
                <div v-else class="space-y-2">
                    <Link
                        href="/login"
                        class="block w-full rounded-sm bg-aura-slate py-3 text-center text-[10px] font-medium tracking-widest text-white uppercase"
                        @click="emit('close')"
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/register"
                        class="block w-full rounded-sm border border-aura-slate py-3 text-center text-[10px] font-medium tracking-widest text-aura-slate uppercase"
                        @click="emit('close')"
                    >
                        Create Account
                    </Link>
                </div>
            </div>
        </div>
    </div>
</template>
