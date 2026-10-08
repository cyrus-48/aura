<script setup lang="ts">
import { Head } from '@inertiajs/vue3';
import CheckoutContactStep from '@/components/checkout/CheckoutContactStep.vue';
import CheckoutPaymentStep from '@/components/checkout/CheckoutPaymentStep.vue';
import CheckoutShippingStep from '@/components/checkout/CheckoutShippingStep.vue';
import CheckoutSidebarSummary from '@/components/checkout/CheckoutSidebarSummary.vue';
import CheckoutStepsHeader from '@/components/checkout/CheckoutStepsHeader.vue';
import { useCheckout } from '@/composables/useCheckout';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { CartData } from '@/types/cart';
import type { OrderAddressData } from '@/types/order';

const props = defineProps<{
    cart: CartData;
    addresses?: OrderAddressData[];
    defaultAddress?: OrderAddressData | null;
}>();

const {
    currentStep,
    shippingOptions,
    form,
    shippingCost,
    taxAmount,
    totalAmount,
    nextStep,
    prevStep,
    submitOrder,
} = useCheckout(props.cart, props.defaultAddress || null);
</script>

<template>
    <StoreLayout title="Express Checkout — Aura & Oak">
        <Head>
            <title>Checkout | Aura & Oak</title>
            <meta
                name="description"
                content="Complete your purchase with encrypted, carbon-neutral checkout."
            />
        </Head>

        <!-- Main Content -->
        <main
            class="mx-auto w-full max-w-[1400px] flex-grow px-6 py-12 md:py-16"
        >
            <CheckoutStepsHeader
                :current-step="currentStep"
                @step-click="setStep"
            />

            <div class="flex flex-col gap-12 lg:flex-row lg:gap-20">
                <div class="w-full lg:w-3/5">
                    <CheckoutContactStep
                        v-if="currentStep === 1"
                        :form="form"
                        :errors="form.errors"
                        @next="nextStep"
                    />

                    <CheckoutShippingStep
                        v-if="currentStep === 2"
                        :options="shippingOptions"
                        :selected-id="form.shippingMethod"
                        :notes="form.notes"
                        @update:selected-id="(id) => (form.shippingMethod = id)"
                        @update:notes="(notes) => (form.notes = notes)"
                        @next="nextStep"
                        @prev="prevStep"
                    />

                    <CheckoutPaymentStep
                        v-if="currentStep === 3"
                        :form="form"
                        :is-submitting="form.processing"
                        :errors="form.errors"
                        @update:payment-method="
                            (method) => (form.paymentMethod = method)
                        "
                        @submit="submitOrder"
                        @prev="prevStep"
                    />
                </div>

                <div class="w-full lg:w-2/5">
                    <CheckoutSidebarSummary
                        :items="cart.items"
                        :subtotal="cart.subtotal"
                        :shipping-cost="shippingCost"
                        :tax-amount="taxAmount"
                        :total="totalAmount"
                    />
                </div>
            </div>
        </main>
    </StoreLayout>
</template>
