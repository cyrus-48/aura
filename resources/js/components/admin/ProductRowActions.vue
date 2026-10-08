<script setup lang="ts">
import { Link } from '@inertiajs/vue3';

defineProps<{
    product: { id: number; name: string };
}>();

const emit = defineEmits<{
    (e: 'duplicate'): void;
    (e: 'delete'): void;
}>();
</script>

<template>
    <div class="flex items-center justify-end space-x-1" @click.stop>
        <Link
            :href="`/admin/products/${product.id}/edit`"
            class="flex h-7 w-7 items-center justify-center rounded text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate"
            title="Edit"
        >
            <i class="fa-regular fa-pen-to-square text-xs" />
        </Link>
        <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded text-aura-moss transition hover:bg-aura-sage/40 hover:text-aura-slate cursor-pointer"
            title="Duplicate"
            @click="emit('duplicate')"
        >
            <i class="fa-regular fa-copy text-xs" />
        </button>
        <button
            type="button"
            class="flex h-7 w-7 items-center justify-center rounded text-red-500 transition hover:bg-red-50 hover:text-red-700 cursor-pointer"
            title="Delete"
            @click="emit('delete')"
        >
            <i class="fa-regular fa-trash-can text-xs" />
        </button>
    </div>
</template>
