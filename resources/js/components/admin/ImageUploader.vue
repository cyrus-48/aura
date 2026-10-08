<script setup lang="ts">
import { ref } from 'vue';

const props = withDefaults(
    defineProps<{
        modelValue?: string | null;
        multiple?: boolean;
        label?: string;
        hint?: string;
        compact?: boolean;
    }>(),
    {
        modelValue: '',
        multiple: false,
        label: 'Click or drag image to upload',
        hint: 'PNG, JPG, WEBP, AVIF up to 10MB',
        compact: false,
    }
);

const emit = defineEmits<{
    (e: 'update:modelValue', url: string): void;
    (e: 'uploaded', url: string): void;
    (e: 'uploaded-multiple', urls: string[]): void;
}>();

const fileInput = ref<HTMLInputElement | null>(null);
const isDragging = ref(false);
const isUploading = ref(false);
const uploadError = ref<string | null>(null);

const getCsrfToken = (): string => {
    const meta = document.querySelector('meta[name="csrf-token"]');
    if (meta) {
        const content = meta.getAttribute('content');
        if (content) return content;
    }
    const match = document.cookie.match(/XSRF-TOKEN=([^;]+)/);
    return match ? decodeURIComponent(match[1]) : '';
};

const handleFiles = async (files: FileList | File[]) => {
    if (!files || files.length === 0) return;
    uploadError.value = null;
    isUploading.value = true;

    const urls: string[] = [];
    const token = getCsrfToken();

    for (const file of Array.from(files)) {
        if (!file.type.startsWith('image/')) {
            uploadError.value = `"${file.name}" is not an image file.`;
            continue;
        }

        const formData = new FormData();
        formData.append('image', file);

        try {
            const response = await fetch('/admin/media/upload', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'X-CSRF-TOKEN': token,
                    'X-XSRF-TOKEN': token,
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: formData,
            });

            if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || `Upload failed with status ${response.status}`);
            }

            const data = await response.json();
            if (data.url) {
                urls.push(data.url);
                emit('uploaded', data.url);
                if (!props.multiple) {
                    emit('update:modelValue', data.url);
                }
            }
        } catch (err: any) {
            uploadError.value = err.message || 'Failed to upload image. Please try again.';
        }
    }

    if (urls.length > 0 && props.multiple) {
        emit('uploaded-multiple', urls);
    }

    isUploading.value = false;
    if (fileInput.value) {
        fileInput.value.value = '';
    }
};

const onDrop = (e: DragEvent) => {
    isDragging.value = false;
    if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files);
    }
};

const onFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (target.files) {
        handleFiles(target.files);
    }
};

const triggerFileInput = () => {
    fileInput.value?.click();
};

const removeSingleImage = () => {
    emit('update:modelValue', '');
};
</script>

<template>
    <div class="w-full">
        <input
            ref="fileInput"
            type="file"
            accept="image/png,image/jpeg,image/webp,image/avif,image/gif"
            :multiple="multiple"
            class="hidden"
            @change="onFileSelect"
        />

        <div
            v-if="!multiple && modelValue"
            class="group relative overflow-hidden rounded-xl border border-aura-sage bg-aura-bg"
            :class="compact ? 'h-32' : 'h-48'"
        >
            <img :src="modelValue" alt="Uploaded preview" class="h-full w-full object-cover" />
            <div class="absolute inset-0 flex items-center justify-center gap-2 bg-aura-slate/60 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    type="button"
                    class="rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-aura-slate shadow-xs hover:bg-aura-sage cursor-pointer"
                    @click="triggerFileInput"
                >
                    <i class="fa-solid fa-arrows-rotate mr-1" /> Replace
                </button>
                <button
                    type="button"
                    class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white shadow-xs hover:bg-red-700 cursor-pointer"
                    @click="removeSingleImage"
                >
                    <i class="fa-solid fa-trash-can mr-1" /> Remove
                </button>
            </div>
        </div>

        <div
            v-else
            class="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed transition cursor-pointer select-none"
            :class="[
                compact ? 'p-4' : 'p-6',
                isDragging ? 'border-aura-slate bg-aura-sage/30 scale-[1.01]' : 'border-aura-sage/80 bg-aura-bg/40 hover:border-aura-slate hover:bg-aura-sage/10',
                isUploading ? 'pointer-events-none opacity-70' : '',
            ]"
            @dragover.prevent="isDragging = true"
            @dragleave.prevent="isDragging = false"
            @drop.prevent="onDrop"
            @click="triggerFileInput"
        >
            <div v-if="isUploading" class="flex flex-col items-center py-2 text-aura-slate">
                <i class="fa-solid fa-circle-notch fa-spin text-2xl text-aura-moss" />
                <span class="mt-2 text-xs font-medium">Uploading image{{ multiple ? 's' : '' }}...</span>
            </div>

            <div v-else class="flex flex-col items-center text-center">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-xs text-aura-moss mb-2">
                    <i class="fa-solid fa-cloud-arrow-up text-base" />
                </div>
                <p class="text-xs font-medium text-aura-slate">{{ label }}</p>
                <p class="mt-1 text-[11px] text-aura-moss">{{ hint }}</p>
            </div>
        </div>

        <p v-if="uploadError" class="mt-1.5 text-xs text-red-600">
            <i class="fa-solid fa-circle-exclamation mr-1" />{{ uploadError }}
        </p>
    </div>
</template>
