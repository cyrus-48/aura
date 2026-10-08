<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { computed, onMounted, onUnmounted, ref, watch } from 'vue';
import FormField from '@/components/admin/FormField.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface ProductPickerItem {
    id: number;
    name: string;
    slug: string;
    price: string;
    primary_image: string | null;
}

interface CollectionData {
    id: number;
    name: string;
    slug: string;
    description: string;
    hero_image: string;
    is_active: boolean;
    product_ids: number[];
}

const props = defineProps<{
    collection: CollectionData | null;
    available_products: ProductPickerItem[];
}>();

const productSearch = ref('');

const form = useForm({
    name: props.collection?.name ?? '',
    slug: props.collection?.slug ?? '',
    description: props.collection?.description ?? '',
    hero_image: props.collection?.hero_image ?? '',
    is_active: props.collection?.is_active ?? true,
    product_ids: props.collection?.product_ids ?? [],
});

const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');

watch(() => form.name, (newName, oldName) => {
    if (!props.collection && (!form.slug || form.slug === slugify(oldName || ''))) {
        form.slug = slugify(newName);
    }
});

const selectedProducts = computed(() => {
    return form.product_ids
        .map((id) => props.available_products.find((p) => p.id === id))
        .filter(Boolean) as ProductPickerItem[];
});

const filteredSearchProducts = computed(() => {
    const q = productSearch.value.trim().toLowerCase();
    return props.available_products.filter((p) => {
        const matches = !q || p.name.toLowerCase().includes(q) || p.slug.toLowerCase().includes(q);
        const notSelected = !form.product_ids.includes(p.id);
        return matches && notSelected;
    }).slice(0, 8);
});

const addProduct = (id: number) => {
    if (!form.product_ids.includes(id)) {
        form.product_ids.push(id);
    }
};

const removeProduct = (id: number) => {
    form.product_ids = form.product_ids.filter((pId) => pId !== id);
};

const moveProduct = (index: number, direction: 'up' | 'down') => {
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= form.product_ids.length) return;
    const item = form.product_ids.splice(index, 1)[0];
    form.product_ids.splice(targetIdx, 0, item);
};

const submit = () => {
    if (props.collection) {
        form.put(`/admin/collections/${props.collection.id}`);
    } else {
        form.post('/admin/collections');
    }
};

const deleteCollection = () => {
    if (!props.collection || !confirm(`Delete collection '${props.collection.name}'?`)) return;
    router.delete(`/admin/collections/${props.collection.id}`);
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
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Collections', href: '/admin/collections' }, { label: collection ? 'Edit Collection' : 'New Collection' }]">
        <Head :title="`${collection ? 'Edit ' + collection.name : 'New Collection'} | Aura & Oak Admin`" />

        <form class="pb-24" @submit.prevent="submit">
            <div class="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                <div>
                    <h1 class="font-serif text-2xl text-aura-slate lg:text-3xl">{{ collection ? collection.name : 'New Collection' }}</h1>
                    <p class="mt-1 text-xs text-aura-moss">{{ collection ? `Editing collection #${collection.slug}` : 'Curate a new seasonal edit or lookbook.' }}</p>
                </div>
                <button v-if="collection" type="button" class="text-xs text-red-600 hover:underline cursor-pointer" @click="deleteCollection">
                    Delete Collection
                </button>
            </div>

            <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <!-- Left 2/3: Details & Ordered Products -->
                <div class="space-y-6 lg:col-span-2">
                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-4">
                        <FormField label="Collection Title" required :error="form.errors.name">
                            <input v-model="form.name" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                        <FormField label="URL Slug" required :error="form.errors.slug">
                            <input v-model="form.slug" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs font-mono text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                        <FormField label="Editorial Story & Description" :error="form.errors.description">
                            <textarea v-model="form.description" rows="4" class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 p-3 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </FormField>
                    </div>

                    <!-- Ordered Curated Products Picker -->
                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card">
                        <div class="mb-4 flex items-center justify-between">
                            <div>
                                <h3 class="font-serif text-sm font-semibold text-aura-slate">Curated Products ({{ selectedProducts.length }})</h3>
                                <p class="text-[11px] text-aura-moss">Products appear in the storefront in this exact display sequence.</p>
                            </div>
                        </div>

                        <!-- Product Search Input -->
                        <div class="relative mb-4">
                            <i class="fa-solid fa-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-xs text-aura-moss" />
                            <input v-model="productSearch" type="text" placeholder="Search catalog to add products..." class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 py-2 pr-3 pl-9 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                        </div>

                        <!-- Search results suggestions -->
                        <div v-if="filteredSearchProducts.length > 0 && productSearch" class="mb-4 max-h-48 overflow-y-auto rounded-lg border border-aura-sage divide-y divide-aura-sage/40 bg-white">
                            <div v-for="p in filteredSearchProducts" :key="p.id" class="flex items-center justify-between p-2.5 transition hover:bg-aura-bg/60">
                                <div class="flex items-center space-x-2.5">
                                    <div class="h-7 w-7 rounded bg-aura-sage overflow-hidden"><img v-if="p.primary_image" :src="p.primary_image" class="h-full w-full object-cover mix-blend-multiply" /></div>
                                    <span class="text-xs text-aura-slate font-medium">{{ p.name }}</span>
                                    <span class="text-[10px] text-aura-moss">{{ p.price }}</span>
                                </div>
                                <button type="button" class="rounded bg-aura-slate px-2 py-1 text-[10px] font-semibold text-white hover:bg-aura-moss cursor-pointer" @click="addProduct(p.id)">+ Add</button>
                            </div>
                        </div>

                        <!-- Ordered List of Selected Products -->
                        <div v-if="selectedProducts.length > 0" class="space-y-2">
                            <div v-for="(p, idx) in selectedProducts" :key="p.id" class="flex items-center justify-between rounded-lg border border-aura-sage/60 bg-aura-bg/30 p-2.5">
                                <div class="flex items-center space-x-3">
                                    <span class="font-mono text-[10px] font-bold text-aura-moss w-4 text-center">{{ idx + 1 }}</span>
                                    <div class="h-8 w-8 rounded bg-aura-sage overflow-hidden"><img v-if="p.primary_image" :src="p.primary_image" class="h-full w-full object-cover mix-blend-multiply" /></div>
                                    <div>
                                        <p class="text-xs font-medium text-aura-slate">{{ p.name }}</p>
                                        <p class="text-[10px] text-aura-moss">{{ p.price }}</p>
                                    </div>
                                </div>
                                <div class="flex items-center space-x-1">
                                    <button type="button" :disabled="idx === 0" class="h-7 w-7 rounded text-aura-moss hover:bg-aura-sage/50 disabled:opacity-30 cursor-pointer" @click="moveProduct(idx, 'up')">▲</button>
                                    <button type="button" :disabled="idx === selectedProducts.length - 1" class="h-7 w-7 rounded text-aura-moss hover:bg-aura-sage/50 disabled:opacity-30 cursor-pointer" @click="moveProduct(idx, 'down')">▼</button>
                                    <button type="button" class="h-7 w-7 rounded text-red-500 hover:bg-red-50 cursor-pointer" @click="removeProduct(p.id)"><i class="fa-solid fa-xmark text-xs" /></button>
                                </div>
                            </div>
                        </div>
                        <div v-else class="rounded-lg border border-dashed border-aura-sage p-6 text-center text-xs text-aura-moss">
                            No products in this collection. Search above to add items.
                        </div>
                    </div>
                </div>

                <!-- Right 1/3: Hero Image & Visibility -->
                <div class="space-y-6">
                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-4">
                        <h3 class="font-serif text-sm font-semibold text-aura-slate">Hero Banner</h3>
                        <FormField label="Hero Image URL" :error="form.errors.hero_image">
                            <input v-model="form.hero_image" type="url" placeholder="https://..." class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                        </FormField>
                        <div v-if="form.hero_image" class="aspect-video w-full rounded-lg overflow-hidden border border-aura-sage bg-aura-bg">
                            <img :src="form.hero_image" alt="Hero preview" class="h-full w-full object-cover" />
                        </div>
                    </div>

                    <div class="rounded-xl border border-aura-sage bg-white p-5 shadow-card space-y-3">
                        <h3 class="font-serif text-sm font-semibold text-aura-slate">Visibility</h3>
                        <div class="flex items-center space-x-2">
                            <input id="colActive" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-aura-sage text-aura-slate focus:ring-aura-accent cursor-pointer" />
                            <label for="colActive" class="text-xs text-aura-slate font-medium cursor-pointer">Active in navigation and storefront</label>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Sticky Footer -->
            <div class="fixed bottom-0 right-0 left-0 z-40 border-t border-aura-sage bg-white/95 backdrop-blur-xs py-3 px-6 shadow-lg lg:left-60">
                <div class="mx-auto flex max-w-[1400px] items-center justify-between">
                    <span class="text-xs text-aura-moss">{{ collection ? 'Edit Mode' : 'New Collection' }}</span>
                    <div class="flex items-center space-x-3">
                        <Link href="/admin/collections" class="rounded-lg border border-aura-sage bg-white px-4 py-2 text-xs font-medium text-aura-slate hover:bg-aura-sage/40">Cancel</Link>
                        <button type="submit" :disabled="form.processing" class="flex items-center rounded-lg bg-aura-slate px-5 py-2 text-xs font-medium text-white hover:bg-aura-moss cursor-pointer disabled:opacity-50">
                            Save Collection (⌘S)
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </AdminLayout>
</template>
