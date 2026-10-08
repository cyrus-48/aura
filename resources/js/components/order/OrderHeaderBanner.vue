<script setup lang="ts">
defineProps<{
    orderNumber: string;
    statusLabel: string;
    statusColor: string;
    email: string;
}>();
</script>

<template>
    <div class="text-center">
        <div
            class="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-aura-sage text-aura-slate shadow-soft"
        >
            <i class="fa-solid fa-check text-2xl"></i>
        </div>
        <span
            class="mt-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
            :class="statusColor"
        >
            {{ statusLabel }}
        </span>
        <h1
            class="mt-3 font-serif text-3xl font-normal text-aura-slate md:text-4xl"
        >
            Thank You for Your Order
        </h1>
        <p class="mt-2 text-sm font-light text-aura-moss">
            Order
            <span class="font-medium text-aura-slate">#{{ orderNumber }}</span>
            has been confirmed. We have sent a dispatch receipt to
            <span class="font-medium text-aura-slate">{{ email }}</span
            >.
        </p>
    </div>
</template>
