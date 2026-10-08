<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    currentYear: number;
}>();
</script>

<template>
    <div>
        <!-- Middle Section: Socials & Payment -->
        <div
            class="flex flex-col items-center justify-between gap-6 border-t border-white/10 py-8 md:flex-row"
        >
            <!-- Social Media -->
            <div class="flex items-center space-x-6">
                <span
                    class="text-[10px] font-semibold tracking-widest text-gray-500 uppercase"
                    >Follow Us</span
                >
                <div class="flex space-x-4 text-lg">
                    <a
                        href="#"
                        aria-label="Instagram"
                        class="text-gray-400 transition hover:text-white"
                    >
                        <i class="fa-brands fa-instagram"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="Pinterest"
                        class="text-gray-400 transition hover:text-white"
                    >
                        <i class="fa-brands fa-pinterest"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="Facebook"
                        class="text-gray-400 transition hover:text-white"
                    >
                        <i class="fa-brands fa-facebook-f"></i>
                    </a>
                    <a
                        href="#"
                        aria-label="TikTok"
                        class="text-gray-400 transition hover:text-white"
                    >
                        <i class="fa-brands fa-tiktok"></i>
                    </a>
                </div>
            </div>

            <!-- Payment Icons -->
            <div class="flex items-center space-x-3 text-2xl text-gray-400">
                <i class="fa-brands fa-cc-visa transition hover:text-white"></i>
                <i
                    class="fa-brands fa-cc-mastercard transition hover:text-white"
                ></i>
                <i class="fa-brands fa-cc-amex transition hover:text-white"></i>
                <i
                    class="fa-brands fa-cc-paypal transition hover:text-white"
                ></i>
                <i
                    class="fa-brands fa-apple-pay transition hover:text-white"
                ></i>
            </div>
        </div>

        <!-- Bottom Section: Copyright & Legal -->
        <div
            class="flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row"
        >
            <p
                class="text-[10px] font-light tracking-wider text-gray-500 uppercase"
            >
                &copy; {{ currentYear }} Aura & Oak Atelier. All rights
                reserved.
            </p>
            <div
                class="flex space-x-6 text-[10px] font-light tracking-wider text-gray-500 uppercase"
            >
                <Link href="/terms" class="transition hover:text-white"
                    >Privacy Policy</Link
                >
                <Link href="/terms" class="transition hover:text-white"
                    >Terms of Service</Link
                >
                <a href="#" class="transition hover:text-white"
                    >Cookie Policy</a
                >
            </div>
        </div>
    </div>
</template>
