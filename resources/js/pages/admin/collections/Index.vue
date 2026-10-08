<script setup lang="ts">
import { Head, Link } from '@inertiajs/vue3';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import EmptyState from '@/components/admin/EmptyState.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface CollectionCard {
    id: number;
    name: string;
    slug: string;
    description: string;
    hero_image: string | null;
    is_active: boolean;
    products_count: number;
}

defineProps<{
    collections: CollectionCard[];
}>();
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Collections' }]">
        <Head title="Collections | Aura & Oak Admin" />

        <AdminPageHeader
            title="Collections"
            subtitle="Curated lookbooks and seasonal showcases featured across the store."
        >
            <template #actions>
                <Link
                    href="/admin/collections/create"
                    class="flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                >
                    <i class="fa-solid fa-plus mr-2 text-xs" /> New Collection
                </Link>
            </template>
        </AdminPageHeader>

        <div v-if="collections.length > 0" class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Link
                v-for="col in collections"
                :key="col.id"
                :href="`/admin/collections/${col.id}/edit`"
                class="group flex flex-col overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card transition-all hover:border-aura-accent hover:shadow-soft"
            >
                <!-- Hero Image Preview -->
                <div class="relative aspect-video w-full overflow-hidden bg-aura-sage">
                    <img
                        v-if="col.hero_image"
                        :src="col.hero_image"
                        :alt="col.name"
                        class="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    <div v-else class="flex h-full w-full items-center justify-center text-aura-moss">
                        <i class="fa-regular fa-image text-2xl" />
                    </div>

                    <div class="absolute top-3 right-3">
                        <span :class="['rounded-full px-2 py-0.5 text-[9px] font-semibold backdrop-blur-xs', col.is_active ? 'bg-white/90 text-green-700' : 'bg-stone-900/70 text-white']">
                            {{ col.is_active ? 'Active' : 'Draft' }}
                        </span>
                    </div>
                </div>

                <div class="flex flex-1 flex-col justify-between p-5">
                    <div>
                        <h3 class="font-serif text-base text-aura-slate group-hover:text-aura-moss transition">
                            {{ col.name }}
                        </h3>
                        <p class="mt-1 line-clamp-2 text-xs text-aura-moss leading-relaxed">
                            {{ col.description || 'No curated description provided.' }}
                        </p>
                    </div>

                    <div class="mt-4 flex items-center justify-between border-t border-aura-sage/50 pt-3 text-[11px] text-aura-moss">
                        <span>{{ col.products_count }} curated products</span>
                        <span class="font-medium text-aura-slate group-hover:translate-x-1 transition-transform">
                            Edit <i class="fa-solid fa-arrow-right ml-1 text-[9px]" />
                        </span>
                    </div>
                </div>
            </Link>
        </div>

        <div v-else class="rounded-xl border border-aura-sage bg-white shadow-card">
            <EmptyState
                title="No collections created"
                description="Showcase selected products together by creating seasonal collections."
                action-label="Create Collection"
                action-href="/admin/collections/create"
            />
        </div>
    </AdminLayout>
</template>
