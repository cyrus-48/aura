<script setup lang="ts">
import { Head, Link, useForm } from '@inertiajs/vue3';
import { onMounted, onUnmounted, watch } from 'vue';
import FormField from '@/components/admin/FormField.vue';
import ProductImageGallery from '@/components/admin/ProductImageGallery.vue';
import ProductVariantsRepeater from '@/components/admin/ProductVariantsRepeater.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface ProductData {
    id: number;
    name: string;
    slug: string;
    category_id: number | null;
    short_description: string;
    full_description: string;
    base_price: number;
    compare_at_price: number | null;
    primary_image: string | null;
    gallery_images: string[];
    status: string;
    materials: string;
    care_instructions: string;
    collection_ids: number[];
    variants: any[];
    updated_at?: string;
}

const props = defineProps<{
    product: ProductData | null;
    categories: { id: number; name: string }[];
    collections: { id: number; name: string }[];
}>();

const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');

const form = useForm({
    name: props.product?.name ?? '',
    slug: props.product?.slug ?? '',
    category_id: props.product?.category_id ?? (props.categories[0]?.id ?? null),
    short_description: props.product?.short_description ?? '',
    full_description: props.product?.full_description ?? '',
    base_price: props.product?.base_price ?? 95.0,
    compare_at_price: props.product?.compare_at_price ?? null,
    primary_image: props.product?.primary_image ?? '',
    gallery_images: props.product?.gallery_images ?? [],
    status: props.product?.status ?? 'active',
    materials: props.product?.materials ?? '',
    care_instructions: props.product?.care_instructions ?? '',
    collection_ids: props.product?.collection_ids ?? [],
    variants: props.product?.variants?.length ? props.product.variants : [
        { sku: 'AO-PROD-01', color: 'Natural Oatmeal', color_hex: '#E3DAC9', size: 'M', stock_count: 15, price_adjustment: 0.00 },
    ],
});

watch(() => form.name, (newName, oldName) => {
    if (!props.product && (!form.slug || form.slug === slugify(oldName || ''))) {
        form.slug = slugify(newName);
    }
});

const submit = () => {
    if (props.product) {
        form.put(`/admin/products/${props.product.id}`);
    } else {
        form.post('/admin/products');
    }
};

const handleKeyDown = (e: KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
        e.preventDefault();
        submit();
    }
};

onMounted(() => window.addEventListener('keydown', handleKeyDown));
onUnmounted(() => window.removeEventListener('keydown', handleKeyDown));
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Products', href: '/admin/products' }, { label: product ? 'Edit Product' : 'New Product' }]">
        <Head :title="`${product ? 'Edit ' + product.name : 'New Product'} | Aura & Oak Admin`" />

        <form class="pb-24" @submit.prevent="submit">
            <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 class="font-serif text-2xl text-aura-slate lg:text-3xl">{{ product ? product.name : 'New Product' }}</h1>
                    <p class="mt-1 text-xs text-aura-moss">{{ product ? `Editing SKU #${product.slug}` : 'Add a new garment or home good to the catalog.' }}</p>
                </div>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Left 2/3 Column: Main Details & Media -->
                <div class="space-y-6 lg:col-span-2">
                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-4">
                        <FormField label="Product Name" required :error="form.errors.name">
                            <input v-model="form.name" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                        <FormField label="URL Slug" required :error="form.errors.slug">
                            <input v-model="form.slug" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs font-mono text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                        <FormField label="Short Description" :error="form.errors.short_description">
                            <input v-model="form.short_description" type="text" placeholder="One sentence summary for catalog teasers..." class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                        <FormField label="Full Editorial Description" :error="form.errors.full_description">
                            <textarea v-model="form.full_description" rows="5" placeholder="Story, fit, and artisanal craftsmanship details..." class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 p-3 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                    </div>

                    <ProductImageGallery :primary-image="form.primary_image" :gallery-images="form.gallery_images" @update:primary-image="form.primary_image = $event" @update:gallery-images="form.gallery_images = $event" />
                    <ProductVariantsRepeater :variants="form.variants" :product-slug="form.slug" @update:variants="form.variants = $event" />
                </div>

                <!-- Right 1/3 Column: Organization & Pricing -->
                <div class="space-y-6">
                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-4">
                        <h3 class="font-serif text-sm font-semibold text-aura-slate">Status & Organization</h3>
                        <FormField label="Status" required :error="form.errors.status">
                            <select v-model="form.status" class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none cursor-pointer">
                                <option value="active">Active (Visible)</option>
                                <option value="draft">Draft (Hidden)</option>
                                <option value="archived">Archived</option>
                            </select>
                        </FormField>
                        <FormField label="Category" :error="form.errors.category_id">
                            <select v-model="form.category_id" class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none cursor-pointer">
                                <option :value="null">Uncategorized</option>
                                <option v-for="c in categories" :key="c.id" :value="c.id">{{ c.name }}</option>
                            </select>
                        </FormField>
                    </div>

                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-4">
                        <h3 class="font-serif text-sm font-semibold text-aura-slate">Pricing ($ USD)</h3>
                        <div class="grid grid-cols-2 gap-3">
                            <FormField label="Base Price" required :error="form.errors.base_price">
                                <input v-model.number="form.base_price" type="number" step="0.01" min="0" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                            </FormField>
                            <FormField label="Compare At" :error="form.errors.compare_at_price">
                                <input v-model.number="form.compare_at_price" type="number" step="0.01" min="0" placeholder="Optional" class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                            </FormField>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sticky Footer (Part 3.3 & Part 6.1) -->
            <div class="fixed bottom-0 right-0 left-0 z-40 border-t border-aura-sage bg-white/95 backdrop-blur-xs py-3 px-6 shadow-lg lg:left-60">
                <div class="mx-auto flex max-w-[1400px] items-center justify-between">
                    <span class="text-xs text-aura-moss">{{ product?.updated_at ? `Last saved at ${product.updated_at}` : 'Unsaved product' }}</span>
                    <div class="flex items-center space-x-3">
                        <Link href="/admin/products" class="rounded-lg border border-aura-sage bg-white px-4 py-2 text-xs font-medium text-aura-slate transition hover:bg-aura-sage/40">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="flex items-center rounded-lg bg-aura-slate px-5 py-2 text-xs font-medium text-white transition hover:bg-aura-moss cursor-pointer disabled:opacity-50">
                            <i v-if="form.processing" class="fa-solid fa-spinner mr-2 animate-spin text-xs" />
                            Save (⌘S)
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout>
</template>
