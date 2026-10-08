<script setup lang="ts">
import type { CheckoutFormData } from '@/types/checkout';

defineProps<{
    form: CheckoutFormData;
    errors: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: 'next'): void;
}>();
</script>

<template>
    <div class="space-y-10">
        <!-- Contact Information -->
        <section>
            <div class="mb-4 flex items-end justify-between">
                <h2 class="font-serif text-2xl text-aura-slate">
                    Contact Information
                </h2>
                <span class="text-xs text-aura-moss">
                    Order notifications will be sent to this email & phone
                </span>
            </div>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="contact-email" class="form-label">
                        Email Address *
                    </label>
                    <input
                        id="contact-email"
                        v-model="form.email"
                        type="email"
                        required
                        placeholder="jane@example.com"
                        class="form-input"
                    />
                    <p v-if="errors.email" class="mt-1 text-xs text-red-600">
                        {{ errors.email }}
                    </p>
                </div>
                <div>
                    <label for="contact-phone" class="form-label">
                        Phone Number *
                    </label>
                    <input
                        id="contact-phone"
                        v-model="form.phone"
                        type="tel"
                        required
                        placeholder="+254 712 345 678"
                        class="form-input"
                    />
                    <p v-if="errors.phone" class="mt-1 text-xs text-red-600">
                        {{ errors.phone }}
                    </p>
                </div>
            </div>
        </section>

        <!-- Shipping Address -->
        <section class="border-t border-aura-sage pt-8">
            <h2 class="mb-4 font-serif text-2xl text-aura-slate">
                Shipping Address
            </h2>
            <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                    <label for="addr-first-name" class="form-label">
                        First Name *
                    </label>
                    <input
                        id="addr-first-name"
                        v-model="form.shippingAddress.firstName"
                        type="text"
                        required
                        placeholder="Jane"
                        class="form-input"
                    />
                    <p
                        v-if="errors.first_name || errors['shippingAddress.firstName']"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ errors.first_name || errors['shippingAddress.firstName'] }}
                    </p>
                </div>
                <div>
                    <label for="addr-last-name" class="form-label">
                        Last Name *
                    </label>
                    <input
                        id="addr-last-name"
                        v-model="form.shippingAddress.lastName"
                        type="text"
                        required
                        placeholder="Doe"
                        class="form-input"
                    />
                    <p
                        v-if="errors.last_name || errors['shippingAddress.lastName']"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ errors.last_name || errors['shippingAddress.lastName'] }}
                    </p>
                </div>
                <div class="sm:col-span-2">
                    <label for="addr-line1" class="form-label">
                        Street Address *
                    </label>
                    <input
                        id="addr-line1"
                        v-model="form.shippingAddress.addressLine1"
                        type="text"
                        required
                        placeholder="124 Greenway Blvd"
                        class="form-input"
                    />
                    <p
                        v-if="errors.address_line_1 || errors['shippingAddress.addressLine1']"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ errors.address_line_1 || errors['shippingAddress.addressLine1'] }}
                    </p>
                </div>
                <div class="sm:col-span-2">
                    <label for="addr-line2" class="form-label">
                        Apartment, Suite, Unit (Optional)
                    </label>
                    <input
                        id="addr-line2"
                        v-model="form.shippingAddress.addressLine2"
                        type="text"
                        placeholder="Suite 4B / Penthouse"
                        class="form-input"
                    />
                </div>
                <div>
                    <label for="addr-city" class="form-label">
                        City / Town *
                    </label>
                    <input
                        id="addr-city"
                        v-model="form.shippingAddress.city"
                        type="text"
                        required
                        placeholder="Nairobi"
                        class="form-input"
                    />
                    <p
                        v-if="errors.city || errors['shippingAddress.city']"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ errors.city || errors['shippingAddress.city'] }}
                    </p>
                </div>
                <div>
                    <label for="addr-postal" class="form-label">
                        Postal / ZIP Code *
                    </label>
                    <input
                        id="addr-postal"
                        v-model="form.shippingAddress.postalCode"
                        type="text"
                        required
                        placeholder="00100"
                        class="form-input"
                    />
                    <p
                        v-if="errors.postal_code || errors['shippingAddress.postalCode']"
                        class="mt-1 text-xs text-red-600"
                    >
                        {{ errors.postal_code || errors['shippingAddress.postalCode'] }}
                    </p>
                </div>
                <div>
                    <label for="addr-state" class="form-label">
                        State / County / Region
                    </label>
                    <input
                        id="addr-state"
                        v-model="form.shippingAddress.state"
                        type="text"
                        placeholder="Nairobi County"
                        class="form-input"
                    />
                </div>
                <div>
                    <label for="addr-country" class="form-label">
                        Country *
                    </label>
                    <input
                        id="addr-country"
                        v-model="form.shippingAddress.country"
                        type="text"
                        required
                        placeholder="Kenya"
                        class="form-input"
                    />
                </div>
            </div>
        </section>

        <div class="flex justify-end pt-4">
            <button
                type="button"
                class="flex w-full items-center justify-center rounded bg-aura-slate py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss sm:w-auto sm:px-8"
                @click="emit('next')"
            >
                Continue to Shipping
                <i class="fa-solid fa-arrow-right ml-2 text-[10px]"></i>
            </button>
        </div>
    </div>
</template>
