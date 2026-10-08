<script setup lang="ts">
import { Head, router } from '@inertiajs/vue3';
import { ref } from 'vue';
import AdminMetricCard from '@/components/admin/AdminMetricCard.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import FilterBar from '@/components/admin/FilterBar.vue';
import ImageUploader from '@/components/admin/ImageUploader.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';
import type { AdminMediaItem } from '@/types/content_admin';

const props = defineProps<{
    media: AdminMediaItem[];
    filters: { search: string };
    stats: { total_assets: number; product_assets: number; editorial_assets: number };
}>();

const copiedId = ref<string | null>(null);
const showUploader = ref(false);

const copyUrl = (item: AdminMediaItem): void => {
    navigator.clipboard.writeText(item.url);
    copiedId.value = item.id;
    setTimeout(() => {
        if (copiedId.value === item.id) copiedId.value = null;
    }, 2000);
};

const applySearch = (search: string): void => {
    router.get('/admin/media', { search }, { preserveState: true, replace: true });
};

const onUploaded = (): void => {
    router.reload({ only: ['media', 'stats'] });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Media' }]">
        <Head title="Media Library | Aura & Oak Admin" />

        <AdminPageHeader
            title="Media & Photography Library"
            :subtitle="`High-resolution product imagery, collection campaign lookbooks, and editorial journal assets.`"
        >
            <template #actions>
                <button
                    type="button"
                    class="inline-flex items-center gap-2 rounded-lg bg-aura-slate px-4 py-2 text-xs font-medium text-white shadow-xs transition hover:bg-aura-moss cursor-pointer"
                    @click="showUploader = !showUploader"
                >
                    <i :class="showUploader ? 'fa-solid fa-xmark' : 'fa-solid fa-cloud-arrow-up'" />
                    {{ showUploader ? 'Close Uploader' : 'Upload Assets' }}
                </button>
            </template>
        </AdminPageHeader>

        <!-- Expandable Upload Zone -->
        <div v-if="showUploader" class="mb-6 rounded-xl border border-aura-sage bg-white p-5 shadow-card">
            <div class="mb-3 flex items-center justify-between">
                <div>
                    <h3 class="font-serif text-sm font-semibold text-aura-slate">Upload Direct to Media Library</h3>
                    <p class="text-[11px] text-aura-moss">Files are stored in public storage and immediately ready for products and campaigns.</p>
                </div>
            </div>
            <ImageUploader
                multiple
                label="Click or drag photos here to upload"
                hint="Supports PNG, JPG, WEBP, AVIF up to 10MB each"
                @uploaded="onUploaded"
            />
        </div>

        <div class="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <AdminMetricCard title="Total Media Assets" :amount="stats.total_assets.toString()" subtitle="Indexed image files" icon="fa-regular fa-image" />
            <AdminMetricCard title="Product Catalog Shots" :amount="stats.product_assets.toString()" subtitle="Variant & gallery imagery" icon="fa-solid fa-tags" />
            <AdminMetricCard title="Campaign & Editorial" :amount="stats.editorial_assets.toString()" subtitle="Curated collections & stories" icon="fa-solid fa-camera-retro" />
        </div>

        <FilterBar
            :search="filters.search"
            :filters="[]"
            placeholder="Search media by asset name or category..."
            :has-active-filters="!!filters.search"
            @update:search="applySearch"
            @clear="applySearch('')"
        />

        <div class="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            <div
                v-for="item in media"
                :key="item.id"
                class="group relative flex flex-col overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card transition hover:border-aura-accent"
            >
                <div class="aspect-square w-full overflow-hidden bg-aura-bg">
                    <img :src="item.url" :alt="item.title" class="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
                </div>
                <div class="flex flex-1 flex-col justify-between p-3">
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <span class="rounded bg-aura-bg px-1.5 py-0.5 text-[9px] font-medium text-aura-moss uppercase">{{ item.type }}</span>
                            <span class="text-[9px] text-aura-moss font-mono">{{ item.size }}</span>
                        </div>
                        <p class="truncate text-xs font-medium text-aura-slate" :title="item.title">{{ item.title }}</p>
                    </div>
                    <div class="mt-3 flex items-center justify-between border-t border-aura-sage/40 pt-2">
                        <span class="text-[9px] text-aura-moss">{{ item.created_at }}</span>
                        <button
                            type="button"
                            class="cursor-pointer text-[10px] font-semibold text-aura-slate hover:text-aura-accent"
                            @click="copyUrl(item)"
                        >
                            <i :class="copiedId === item.id ? 'fa-solid fa-check text-emerald-600' : 'fa-regular fa-copy'" />
                            {{ copiedId === item.id ? 'Copied' : 'Copy' }}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </AdminLayout>
</template>
