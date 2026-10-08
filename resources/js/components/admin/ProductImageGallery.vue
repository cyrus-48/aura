<script setup lang="ts">
import { ref } from 'vue';
import ImageUploader from '@/components/admin/ImageUploader.vue';

const props = defineProps<{
    primaryImage?: string | null;
    galleryImages: string[];
}>();

const emit = defineEmits<{
    (e: 'update:primaryImage', url: string): void;
    (e: 'update:galleryImages', images: string[]): void;
}>();

const showUrlInput = ref(false);
const newImageUrl = ref('');

const onUploadMultiple = (urls: string[]) => {
    const current = [...props.galleryImages, ...urls];
    emit('update:galleryImages', current);
    if (!props.primaryImage && current.length > 0) {
        emit('update:primaryImage', current[0]);
    }
};

const addUrlImage = () => {
    const url = newImageUrl.value.trim();
    if (!url) return;
    const current = [...props.galleryImages, url];
    emit('update:galleryImages', current);
    if (!props.primaryImage) {
        emit('update:primaryImage', url);
    }
    newImageUrl.value = '';
    showUrlInput.value = false;
};

const removeImage = (index: number) => {
    const url = props.galleryImages[index];
    const updated = props.galleryImages.filter((_, idx) => idx !== index);
    emit('update:galleryImages', updated);
    if (props.primaryImage === url) {
        emit('update:primaryImage', updated[0] || '');
    }
};

const setPrimary = (url: string) => {
    emit('update:primaryImage', url);
};
</script>

<template>
    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
        <div class="mb-4 flex items-center justify-between">
            <div>
                <h3 class="font-serif text-sm font-semibold text-aura-slate">Product Media</h3>
                <p class="text-[11px] text-aura-moss">Upload product shots or lookbook images. The first image is the primary cover.</p>
            </div>
            <button
                type="button"
                class="text-xs text-aura-moss underline hover:text-aura-slate cursor-pointer"
                @click="showUrlInput = !showUrlInput"
            >
                {{ showUrlInput ? 'Hide URL input' : 'Or paste URL' }}
            </button>
        </div>

        <div class="mb-4">
            <ImageUploader
                multiple
                label="Click to browse or drag & drop product photos"
                hint="Upload one or multiple images directly (JPG, PNG, WEBP up to 10MB)"
                compact
                @uploaded-multiple="onUploadMultiple"
            />
        </div>

        <div v-if="showUrlInput" class="mb-4 flex gap-2">
            <input
                v-model="newImageUrl"
                type="url"
                placeholder="Paste image URL (e.g. https://...)"
                class="flex-1 rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none"
                @keydown.enter.prevent="addUrlImage"
            />
            <button
                type="button"
                class="rounded-lg bg-aura-slate px-3.5 py-2 text-xs font-medium text-white transition hover:bg-aura-moss cursor-pointer"
                @click="addUrlImage"
            >
                Add Link
            </button>
        </div>

        <div v-if="galleryImages.length > 0" class="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div
                v-for="(img, idx) in galleryImages"
                :key="idx"
                class="group relative aspect-square overflow-hidden rounded-lg border border-aura-sage bg-aura-bg"
            >
                <img :src="img" alt="Product thumbnail" class="h-full w-full object-cover mix-blend-multiply" />
                <div class="absolute inset-0 flex flex-col justify-between bg-aura-slate/50 p-2 opacity-0 transition-opacity group-hover:opacity-100">
                    <div class="flex justify-between">
                        <button
                            type="button"
                            :class="[
                                'rounded px-1.5 py-0.5 text-[9px] font-semibold transition cursor-pointer',
                                primaryImage === img ? 'bg-aura-accent text-white' : 'bg-white/80 text-aura-slate hover:bg-white',
                            ]"
                            @click="setPrimary(img)"
                        >
                            {{ primaryImage === img ? 'Cover' : 'Set Cover' }}
                        </button>
                        <button
                            type="button"
                            class="flex h-5 w-5 items-center justify-center rounded bg-red-600 text-[10px] text-white hover:bg-red-700 cursor-pointer"
                            @click="removeImage(idx)"
                        >
                            <i class="fa-solid fa-xmark" />
                        </button>
                    </div>
                </div>
                <div v-if="primaryImage === img" class="absolute top-1.5 left-1.5 rounded bg-aura-slate px-1.5 py-0.5 text-[8px] font-bold text-white uppercase tracking-wider">
                    Cover
                </div>
            </div>
        </div>
        <div v-else class="flex flex-col items-center justify-center rounded-lg border border-dashed border-aura-sage p-4 text-center text-aura-moss">
            <p class="text-xs">No media uploaded yet. Drop photos above to start building the gallery.</p>
        </div>
    </div>
</template>
