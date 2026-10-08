<script setup lang="ts">
import { computed, ref } from 'vue';

const props = withDefaults(
    defineProps<{
        activeImage: string;
        primaryImage: string | null;
        gallery?: string[];
        badge?: string | null;
        productName?: string;
    }>(),
    {
        gallery: () => [],
        badge: null,
        productName: 'Product',
    },
);

const emit = defineEmits<{
    (e: 'selectImage', imageUrl: string): void;
    (e: 'wishlistToggle'): void;
}>();

const wishlisted = ref(false);

const allImages = computed(() => {
    const list: string[] = [];
    if (props.primaryImage) {
        list.push(props.primaryImage);
    }
    props.gallery.forEach((img) => {
        if (!list.includes(img)) {
            list.push(img);
        }
    });
    return list;
});

function onWishlist(): void {
    wishlisted.value = !wishlisted.value;
    emit('wishlistToggle');
}
</script>

<template>
    <div class="flex w-full flex-col-reverse gap-4 md:flex-row">
        <!-- Thumbnails -->
        <div
            v-if="allImages.length > 1"
            class="no-scrollbar flex shrink-0 gap-4 overflow-x-auto md:w-24 md:flex-col md:overflow-y-auto"
        >
            <button
                v-for="(img, idx) in allImages"
                :key="idx"
                type="button"
                class="h-24 w-20 shrink-0 overflow-hidden rounded-lg border-2 bg-aura-sage transition md:h-32 md:w-full"
                :class="
                    activeImage === img
                        ? 'border-aura-slate'
                        : 'border-transparent hover:border-aura-accent'
                "
                @click="emit('selectImage', img)"
            >
                <img
                    :src="img"
                    :alt="`Thumbnail ${idx + 1}`"
                    class="h-full w-full object-cover mix-blend-multiply"
                />
            </button>
        </div>

        <!-- Main Image -->
        <div
            class="relative aspect-[4/5] flex-1 overflow-hidden rounded-2xl bg-aura-sage"
        >
            <img
                v-if="activeImage"
                :src="activeImage"
                :alt="productName || 'Product photo'"
                class="h-full w-full object-cover mix-blend-multiply transition duration-300"
            />
            <button
                type="button"
                class="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-aura-slate backdrop-blur transition hover:bg-white"
                :class="{ 'bg-aura-slate text-white': wishlisted }"
                aria-label="Wishlist"
                @click="onWishlist"
            >
                <i
                    :class="
                        wishlisted ? 'fa-solid fa-heart' : 'fa-regular fa-heart'
                    "
                    class="text-sm"
                ></i>
            </button>
            <span
                v-if="badge"
                class="absolute top-4 left-4 bg-aura-slate px-3 py-1.5 text-[9px] tracking-wider text-white uppercase"
            >
                {{ badge }}
            </span>
        </div>
    </div>
</template>
