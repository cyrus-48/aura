<script setup lang="ts">
import type { LinkComponentBaseProps, Method } from '@inertiajs/core';
import { Link } from '@inertiajs/vue3';

type Props = {
    href: LinkComponentBaseProps['href'];
    tabindex?: number;
    method?: Method;
    as?: string;
};

defineProps<Props>();
</script>

<template>
    <Link
        :href="href"
        :tabindex="tabindex"
        :method="method"
        :as="as"
        class="text-aura-slate underline decoration-aura-accent underline-offset-4 transition-colors duration-300 hover:text-aura-moss hover:decoration-aura-slate"
    >
        <slot />
    </Link>
</template>
