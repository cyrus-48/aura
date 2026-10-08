<script setup lang="ts">
import type { CheckoutFormData } from '@/types/checkout';

defineProps<{
    form: CheckoutFormData;
    isSubmitting: boolean;
    errors: Record<string, string>;
}>();

const emit = defineEmits<{
    (e: 'update:paymentMethod', method: string): void;
    (e: 'submit'): void;
    (e: 'prev'): void;
}>();
</script>

<template>
    <div class="space-y-8">
        <div>
            <div class="mb-4 flex items-end justify-between">
                <h2 class="font-serif text-2xl text-aura-slate">Payment</h2>
                <span class="flex items-center text-[10px] text-aura-moss">
                    <i class="fa-solid fa-lock mr-1.5 text-aura-accent"></i>
                    Encrypted & Secure
                </span>
            </div>

            <!-- Payment Method Tiles -->
            <div class="grid grid-cols-2 gap-4 sm:grid-cols-4">
                <button
                    type="button"
                    class="flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all"
                    :class="
                        form.paymentMethod === 'mpesa'
                            ? 'border-aura-slate bg-white shadow-soft'
                            : 'border-aura-sage bg-transparent hover:border-aura-accent'
                    "
                    @click="emit('update:paymentMethod', 'mpesa')"
                >
                    <div class="text-xl text-emerald-700">
                        <i class="fa-solid fa-mobile-screen"></i>
                    </div>
                    <span class="mt-2 block text-xs font-medium text-aura-slate">
                        M-Pesa STK
                    </span>
                    <span class="text-[9px] text-aura-moss">Safaricom Push</span>
                </button>

                <button
                    type="button"
                    class="flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all"
                    :class="
                        form.paymentMethod === 'card' || form.paymentMethod === 'stripe'
                            ? 'border-aura-slate bg-white shadow-soft'
                            : 'border-aura-sage bg-transparent hover:border-aura-accent'
                    "
                    @click="emit('update:paymentMethod', 'card')"
                >
                    <div class="flex items-center space-x-1.5 text-lg text-aura-slate">
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                    </div>
                    <span class="mt-2 block text-xs font-medium text-aura-slate">
                        Credit / Debit
                    </span>
                    <span class="text-[9px] text-aura-moss">Stripe Gateway</span>
                </button>

                <button
                    type="button"
                    class="flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all"
                    :class="
                        form.paymentMethod === 'airtel'
                            ? 'border-aura-slate bg-white shadow-soft'
                            : 'border-aura-sage bg-transparent hover:border-aura-accent'
                    "
                    @click="emit('update:paymentMethod', 'airtel')"
                >
                    <div class="text-xl text-red-600">
                        <i class="fa-solid fa-money-bill-transfer"></i>
                    </div>
                    <span class="mt-2 block text-xs font-medium text-aura-slate">
                        Airtel Money
                    </span>
                    <span class="text-[9px] text-aura-moss">Mobile Wallet</span>
                </button>

                <button
                    type="button"
                    class="flex flex-col items-center justify-center rounded-xl border p-4 text-center transition-all"
                    :class="
                        form.paymentMethod === 'cod'
                            ? 'border-aura-slate bg-white shadow-soft'
                            : 'border-aura-sage bg-transparent hover:border-aura-accent'
                    "
                    @click="emit('update:paymentMethod', 'cod')"
                >
                    <div class="text-xl text-aura-moss">
                        <i class="fa-solid fa-hand-holding-dollar"></i>
                    </div>
                    <span class="mt-2 block text-xs font-medium text-aura-slate">
                        Cash on Delivery
                    </span>
                    <span class="text-[9px] text-aura-moss">Pay on Courier</span>
                </button>
            </div>
        </div>

        <!-- M-Pesa Form Panel -->
        <div
            v-if="form.paymentMethod === 'mpesa'"
            class="rounded-xl border border-aura-sage bg-white p-6 shadow-soft"
        >
            <div class="mb-4 flex items-center gap-2">
                <span class="rounded bg-emerald-100 px-2 py-0.5 text-[10px] font-semibold text-emerald-800">
                    Safaricom M-Pesa Express
                </span>
            </div>
            <label for="mpesa-phone-input" class="form-label">
                M-Pesa Mobile Number *
            </label>
            <input
                id="mpesa-phone-input"
                v-model="form.mpesaPhone"
                type="tel"
                placeholder="254712345678"
                class="form-input"
            />
            <p v-if="errors.mpesa_phone" class="mt-1 text-xs text-red-600">
                {{ errors.mpesa_phone }}
            </p>
            <p class="mt-3 text-xs leading-relaxed text-aura-moss">
                An instant STK Push prompt will appear on your Safaricom mobile handset. Enter your M-Pesa PIN to securely authorize the payment.
            </p>
        </div>

        <!-- Credit Card Form Panel -->
        <div
            v-if="form.paymentMethod === 'card' || form.paymentMethod === 'stripe'"
            class="space-y-4 rounded-xl border border-aura-sage bg-white p-6 shadow-soft"
        >
            <div>
                <label for="card-number-input" class="form-label">
                    Card Number *
                </label>
                <div class="relative">
                    <input
                        id="card-number-input"
                        v-model="form.cardNumber"
                        type="text"
                        placeholder="4111 2222 3333 4444"
                        class="form-input pr-12"
                    />
                    <div class="absolute top-1/2 right-3 -translate-y-1/2 space-x-1 text-aura-moss">
                        <i class="fa-brands fa-cc-visa"></i>
                        <i class="fa-brands fa-cc-mastercard"></i>
                    </div>
                </div>
                <p v-if="errors.card_token" class="mt-1 text-xs text-red-600">
                    {{ errors.card_token }}
                </p>
            </div>
            <div class="grid grid-cols-2 gap-4">
                <div>
                    <label for="card-expiry-input" class="form-label">
                        Expiration (MM / YY) *
                    </label>
                    <input
                        id="card-expiry-input"
                        v-model="form.cardExpiry"
                        type="text"
                        placeholder="MM / YY"
                        class="form-input"
                    />
                </div>
                <div>
                    <label for="card-cvc-input" class="form-label">
                        Security Code (CVC) *
                    </label>
                    <input
                        id="card-cvc-input"
                        v-model="form.cardCvc"
                        type="text"
                        placeholder="123"
                        class="form-input"
                    />
                </div>
            </div>
            <div>
                <label for="card-name-input" class="form-label">
                    Cardholder Name
                </label>
                <input
                    id="card-name-input"
                    v-model="form.cardName"
                    type="text"
                    placeholder="Jane Doe"
                    class="form-input"
                />
            </div>
            <p class="text-[11px] text-aura-moss">
                Transactions are processed via Paysasa with 256-bit bank-grade TLS encryption.
            </p>
        </div>

        <!-- Airtel Money Form Panel -->
        <div
            v-if="form.paymentMethod === 'airtel'"
            class="rounded-xl border border-aura-sage bg-white p-6 shadow-soft"
        >
            <div class="mb-4 flex items-center gap-2">
                <span class="rounded bg-red-100 px-2 py-0.5 text-[10px] font-semibold text-red-800">
                    Airtel Money
                </span>
            </div>
            <label for="airtel-phone-input" class="form-label">
                Airtel Mobile Number *
            </label>
            <input
                id="airtel-phone-input"
                v-model="form.airtelPhone"
                type="tel"
                placeholder="254733123456"
                class="form-input"
            />
            <p v-if="errors.airtel_phone" class="mt-1 text-xs text-red-600">
                {{ errors.airtel_phone }}
            </p>
            <p class="mt-3 text-xs leading-relaxed text-aura-moss">
                You will receive a USSD payment authorization prompt on your Airtel line. Enter your PIN to complete the transaction.
            </p>
        </div>

        <!-- Cash on Delivery Panel -->
        <div
            v-if="form.paymentMethod === 'cod'"
            class="rounded-xl border border-aura-sage bg-white p-6 shadow-soft"
        >
            <div class="flex items-start gap-4">
                <div class="rounded-full bg-aura-sage p-3 text-aura-slate">
                    <i class="fa-solid fa-truck-ramp-box text-xl"></i>
                </div>
                <div>
                    <h3 class="text-sm font-semibold text-aura-slate">
                        Cash or Mobile Money upon Arrival
                    </h3>
                    <p class="mt-1 text-xs leading-relaxed text-aura-moss">
                        No online payment is required right now. Your order will be prepared and dispatched with a courier who will accept cash or M-Pesa upon doorstep delivery.
                    </p>
                </div>
            </div>
        </div>

        <div class="flex items-center justify-between pt-4">
            <button
                type="button"
                class="flex items-center text-[11px] font-medium tracking-widest text-aura-moss uppercase transition hover:text-aura-slate"
                @click="emit('prev')"
            >
                <i class="fa-solid fa-arrow-left mr-2 text-[10px]"></i>
                Back to Shipping
            </button>
            <button
                type="button"
                :disabled="isSubmitting"
                class="flex items-center justify-center rounded bg-aura-slate px-8 py-4 text-[11px] font-medium tracking-widest text-white uppercase transition duration-300 hover:bg-aura-moss disabled:opacity-50"
                @click="emit('submit')"
            >
                <i class="fa-solid fa-lock mr-2 text-[10px]"></i>
                <span v-if="isSubmitting">Authorizing Order...</span>
                <span v-else>Pay & Complete Order</span>
            </button>
        </div>
    </div>
</template>
