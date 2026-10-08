<script setup lang="ts">
import { Head, router, useForm } from '@inertiajs/vue3';
import { ref } from 'vue';
import AdminModal from '@/components/admin/AdminModal.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import EmptyState from '@/components/admin/EmptyState.vue';
import FormField from '@/components/admin/FormField.vue';
import ImageUploader from '@/components/admin/ImageUploader.vue';
import SlideOver from '@/components/admin/SlideOver.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface CategoryItem {
    id: number;
    parent_id?: number | null;
    name: string;
    slug: string;
    description: string;
    image: string | null;
    is_active: boolean;
    products_count: number;
    children?: CategoryItem[];
}

const props = defineProps<{
    categories: CategoryItem[];
    parent_options: { id: number; name: string }[];
}>();

const expandedIds = ref<number[]>(props.categories.map((c) => c.id));
const slideOverOpen = ref(false);
const editingCategory = ref<CategoryItem | null>(null);
const deleteModalOpen = ref(false);
const categoryToDelete = ref<CategoryItem | null>(null);

const form = useForm({
    name: '',
    slug: '',
    parent_id: null as number | null,
    description: '',
    image: '',
    is_active: true,
});

const toggleExpand = (id: number) => {
    if (expandedIds.value.includes(id)) {
        expandedIds.value = expandedIds.value.filter((i) => i !== id);
    } else {
        expandedIds.value.push(id);
    }
};

const openCreate = (parentId: number | null = null) => {
    editingCategory.value = null;
    form.reset();
    form.parent_id = parentId;
    form.is_active = true;
    slideOverOpen.value = true;
};

const openEdit = (cat: CategoryItem) => {
    editingCategory.value = cat;
    form.name = cat.name;
    form.slug = cat.slug;
    form.parent_id = cat.parent_id ?? null;
    form.description = cat.description || '';
    form.image = cat.image || '';
    form.is_active = cat.is_active;
    slideOverOpen.value = true;
};

const slugify = (text: string) => text.toLowerCase().replace(/[^\w\s-]/g, '').trim().replace(/[\s_-]+/g, '-');

const onNameInput = () => {
    if (!editingCategory.value) {
        form.slug = slugify(form.name);
    }
};

const submitCategory = () => {
    if (editingCategory.value) {
        form.put(`/admin/categories/${editingCategory.value.id}`, {
            onSuccess: () => { slideOverOpen.value = false; },
        });
    } else {
        form.post('/admin/categories', {
            onSuccess: () => { slideOverOpen.value = false; },
        });
    }
};

const confirmDelete = () => {
    if (!categoryToDelete.value) return;
    router.delete(`/admin/categories/${categoryToDelete.value.id}`, {
        onSuccess: () => {
            deleteModalOpen.value = false;
            categoryToDelete.value = null;
        },
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Categories' }]">
        <Head title="Categories | Aura & Oak Admin" />

        <AdminPageHeader
            title="Categories"
            subtitle="Organize garments and collections into an intuitive catalog taxonomy."
        >
            <template #actions>
                <button
                    type="button"
                    class="flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss cursor-pointer"
                    @click="openCreate(null)"
                >
                    <i class="fa-solid fa-plus mr-2 text-xs" /> New Category
                </button>
            </template>
        </AdminPageHeader>

        <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <div v-if="categories.length > 0" class="divide-y divide-aura-sage/40">
                <template v-for="cat in categories" :key="cat.id">
                    <!-- Parent Category Row -->
                    <div class="flex items-center justify-between p-4 transition hover:bg-aura-bg/50">
                        <div class="flex items-center space-x-3">
                            <button
                                v-if="cat.children && cat.children.length > 0"
                                type="button"
                                class="flex h-6 w-6 items-center justify-center rounded text-aura-moss hover:bg-aura-sage/50 hover:text-aura-slate cursor-pointer"
                                @click="toggleExpand(cat.id)"
                            >
                                <i :class="['fa-solid text-[10px] transition-transform', expandedIds.includes(cat.id) ? 'fa-chevron-down' : 'fa-chevron-right']" />
                            </button>
                            <span v-else class="w-6 text-center text-aura-moss/30">•</span>

                            <div class="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-aura-sage">
                                <img v-if="cat.image" :src="cat.image" :alt="cat.name" class="h-full w-full object-cover mix-blend-multiply" />
                                <div v-else class="flex h-full w-full items-center justify-center text-aura-moss"><i class="fa-solid fa-folder text-xs" /></div>
                            </div>

                            <div>
                                <h3 class="font-medium text-xs text-aura-slate">{{ cat.name }}</h3>
                                <p class="font-mono text-[10px] text-aura-moss">/{{ cat.slug }}</p>
                            </div>
                        </div>

                        <div class="flex items-center space-x-3">
                            <span class="rounded-full bg-aura-sage px-2 py-0.5 text-[9px] font-semibold text-aura-slate">
                                {{ cat.products_count }} products
                            </span>
                            <span :class="['rounded-full px-2 py-0.5 text-[9px] font-semibold', cat.is_active ? 'bg-green-50 text-green-700' : 'bg-stone-100 text-stone-600']">
                                {{ cat.is_active ? 'Active' : 'Inactive' }}
                            </span>
                            <div class="flex items-center space-x-1">
                                <button type="button" class="flex h-7 w-7 items-center justify-center rounded text-aura-moss hover:bg-aura-sage/40 hover:text-aura-slate cursor-pointer" title="Add Subcategory" @click="openCreate(cat.id)">
                                    <i class="fa-solid fa-plus text-xs" />
                                </button>
                                <button type="button" class="flex h-7 w-7 items-center justify-center rounded text-aura-moss hover:bg-aura-sage/40 hover:text-aura-slate cursor-pointer" title="Edit" @click="openEdit(cat)">
                                    <i class="fa-regular fa-pen-to-square text-xs" />
                                </button>
                                <button type="button" class="flex h-7 w-7 items-center justify-center rounded text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer" title="Delete" @click="categoryToDelete = cat; deleteModalOpen = true">
                                    <i class="fa-regular fa-trash-can text-xs" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <!-- Subcategories -->
                    <template v-if="cat.children && cat.children.length > 0 && expandedIds.includes(cat.id)">
                        <div
                            v-for="sub in cat.children"
                            :key="sub.id"
                            class="flex items-center justify-between border-t border-aura-sage/20 bg-aura-bg/20 py-3 pr-4 pl-14 transition hover:bg-aura-bg/60"
                        >
                            <div class="flex items-center space-x-3">
                                <span class="text-xs text-aura-moss/60">↳</span>
                                <div>
                                    <h4 class="font-medium text-xs text-aura-slate">{{ sub.name }}</h4>
                                    <p class="font-mono text-[9px] text-aura-moss">/{{ sub.slug }}</p>
                                </div>
                            </div>

                            <div class="flex items-center space-x-3">
                                <span class="rounded-full bg-aura-sage/60 px-2 py-0.5 text-[9px] text-aura-slate">
                                    {{ sub.products_count }} products
                                </span>
                                <div class="flex items-center space-x-1">
                                    <button type="button" class="flex h-7 w-7 items-center justify-center rounded text-aura-moss hover:bg-aura-sage/40 hover:text-aura-slate cursor-pointer" title="Edit" @click="openEdit(sub)">
                                        <i class="fa-regular fa-pen-to-square text-xs" />
                                    </button>
                                    <button type="button" class="flex h-7 w-7 items-center justify-center rounded text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer" title="Delete" @click="categoryToDelete = sub; deleteModalOpen = true">
                                        <i class="fa-regular fa-trash-can text-xs" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>
            </div>
            <EmptyState
                v-else
                title="No categories defined"
                description="Create your first catalog category to start organizing products."
                action-label="Create Category"
                @action="openCreate(null)"
            />
        </div>

        <!-- SlideOver Editor Panel -->
        <SlideOver
            :open="slideOverOpen"
            :title="editingCategory ? 'Edit Category' : 'New Category'"
            :subtitle="editingCategory ? `Modifying taxonomy #${editingCategory.slug}` : 'Add a new category or subcategory'"
            @close="slideOverOpen = false"
        >
            <form class="space-y-4" @submit.prevent="submitCategory">
                <FormField label="Category Name" required :error="form.errors.name">
                    <input v-model="form.name" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" @input="onNameInput" />
                </FormField>
                <FormField label="URL Slug" required :error="form.errors.slug">
                    <input v-model="form.slug" type="text" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs font-mono text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                </FormField>
                <FormField label="Parent Category" :error="form.errors.parent_id">
                    <select v-model="form.parent_id" class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none cursor-pointer">
                        <option :value="null">None (Top Level Root)</option>
                        <option v-for="p in parent_options.filter((o) => !editingCategory || o.id !== editingCategory.id)" :key="p.id" :value="p.id">{{ p.name }}</option>
                    </select>
                </FormField>
                <FormField label="Category Image" :error="form.errors.image">
                    <ImageUploader v-model="form.image" compact label="Upload category image" />
                </FormField>
                <FormField label="Description" :error="form.errors.description">
                    <textarea v-model="form.description" rows="3" class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 p-3 text-xs text-aura-slate focus:border-aura-slate focus:bg-white focus:outline-none" />
                </FormField>
                <div class="flex items-center space-x-2 pt-2">
                    <input id="catActive" v-model="form.is_active" type="checkbox" class="h-4 w-4 rounded border-aura-sage text-aura-slate focus:ring-aura-accent cursor-pointer" />
                    <label for="catActive" class="text-xs text-aura-slate font-medium cursor-pointer">Active and visible in store navigation</label>
                </div>
                <div class="flex justify-end space-x-3 pt-6 border-t border-aura-sage">
                    <button type="button" class="rounded-lg border border-aura-sage px-4 py-2 text-xs font-medium text-aura-slate hover:bg-aura-sage/40" @click="slideOverOpen = false">Cancel</button>
                    <button type="submit" :disabled="form.processing" class="rounded-lg bg-aura-slate px-5 py-2 text-xs font-medium text-white hover:bg-aura-moss cursor-pointer disabled:opacity-50">Save Category</button>
                </div>
            </form>
        </SlideOver>

        <!-- Delete Modal -->
        <AdminModal
            :open="deleteModalOpen"
            title="Delete Category"
            :description="`Are you sure you want to delete '${categoryToDelete?.name}'?`"
            confirm-label="Delete"
            variant="destructive"
            @close="deleteModalOpen = false"
            @confirm="confirmDelete"
        />
    </AdminLayout>
</template>
