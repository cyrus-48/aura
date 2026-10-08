<script setup lang="ts">
import { Head, Link, router } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminModal from '@/components/admin/AdminModal.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import FloatingBulkToolbar from '@/components/admin/FloatingBulkToolbar.vue';
import Pagination from '@/components/admin/Pagination.vue';
import ProductRowActions from '@/components/admin/ProductRowActions.vue';
import StatusBadge from '@/components/admin/StatusBadge.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface ProductRow {
    id: number;
    name: string;
    slug: string;
    sku: string;
    category_name: string;
    primary_image: string | null;
    price: number;
    formatted_price: string;
    stock_count: number;
    status: string;
    status_label: string;
    status_color: string;
}

const props = defineProps<{
    products: {
        data: ProductRow[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    categories: { id: number; name: string; slug: string }[];
    filters: {
        search: string;
        category: string;
        status: string;
        stock: string;
        sort: string;
        direction: 'asc' | 'desc';
        per_page: number;
    };
    counts: { total: number; active: number; draft: number; archived: number };
}>();

const selectedKeys = ref<(string | number)[]>([]);
const deleteModalOpen = ref(false);
const productToDelete = ref<ProductRow | null>(null);
const isDeleting = ref(false);

const columns: DataTableColumn[] = [
    { key: 'thumbnail', label: '', width: '48px' },
    { key: 'name', label: 'Product', sortable: true },
    { key: 'category_name', label: 'Category' },
    { key: 'price', label: 'Price', sortable: true },
    { key: 'stock_count', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Actions', align: 'right', width: '120px' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'category',
        label: 'Categories',
        selected: props.filters.category,
        options: props.categories.map((c) => ({ label: c.name, value: c.slug })),
    },
    {
        key: 'status',
        label: 'Statuses',
        selected: props.filters.status,
        options: [
            { label: 'Active', value: 'active' },
            { label: 'Draft', value: 'draft' },
            { label: 'Archived', value: 'archived' },
        ],
    },
    {
        key: 'stock',
        label: 'Stock States',
        selected: props.filters.stock,
        options: [
            { label: 'In Stock', value: 'in_stock' },
            { label: 'Low Stock (≤ 5)', value: 'low_stock' },
            { label: 'Out of Stock', value: 'out_of_stock' },
        ],
    },
]);

const hasActiveFilters = computed(() => {
    return !!(props.filters.search || props.filters.category || props.filters.status || props.filters.stock);
});

const applyParams = (params: Record<string, any>) => {
    router.get('/admin/products', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};

const handleSort = (key: string) => {
    const isSame = props.filters.sort === key;
    const nextDir = isSame && props.filters.direction === 'asc' ? 'desc' : 'asc';
    applyParams({ sort: key, direction: nextDir });
};

const confirmDelete = () => {
    if (!productToDelete.value) return;
    isDeleting.value = true;
    router.delete(`/admin/products/${productToDelete.value.id}`, {
        onSuccess: () => {
            deleteModalOpen.value = false;
            productToDelete.value = null;
        },
        onFinish: () => {
            isDeleting.value = false;
        },
    });
};

const handleBulkAction = (actionKey: string) => {
    if (selectedKeys.value.length === 0) return;
    if (actionKey === 'delete' && !confirm(`Delete ${selectedKeys.value.length} selected products?`)) return;

    router.post('/admin/products/bulk', {
        action: actionKey,
        ids: selectedKeys.value,
        payload: actionKey === 'status' ? { status: 'active' } : {},
    }, {
        onSuccess: () => {
            selectedKeys.value = [];
        },
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Products' }]">
        <Head title="Products | Aura & Oak Admin" />

        <AdminPageHeader
            title="Products"
            :subtitle="`Showing ${props.products.total} catalog items across atelier collections.`"
        >
            <template #actions>
                <Link
                    href="/admin/products/create"
                    class="flex items-center rounded-lg bg-aura-slate px-4 py-2.5 text-[10px] font-medium tracking-widest text-white uppercase transition hover:bg-aura-moss"
                >
                    <i class="fa-solid fa-plus mr-2 text-xs" /> New Product
                </Link>
            </template>
        </AdminPageHeader>

        <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <FilterBar
                :search="props.filters.search"
                search-placeholder="Search by name, slug or SKU..."
                :filters="filterDefs"
                :show-clear="hasActiveFilters"
                @update:search="applyParams({ search: $event })"
                @update:filter="(key, val) => applyParams({ [key]: val })"
                @clear="applyParams({ search: '', category: '', status: '', stock: '' })"
            />

            <DataTable
                :columns="columns"
                :rows="props.products.data"
                selectable
                :selected-keys="selectedKeys"
                :sort-by="props.filters.sort"
                :sort-direction="props.filters.direction"
                empty-title="No products found"
                empty-description="Try relaxing your filters or add a new product to your catalog."
                empty-action-label="Add New Product"
                empty-action-href="/admin/products/create"
                @sort="handleSort"
                @row-click="(row) => router.visit(`/admin/products/${row.id}/edit`)"
                @update:selected-keys="selectedKeys = $event"
            >
                <template #thumbnail="{ row }">
                    <div class="h-9 w-9 shrink-0 overflow-hidden rounded-lg bg-aura-sage">
                        <img v-if="row.primary_image" :src="row.primary_image" :alt="row.name" class="h-full w-full object-cover mix-blend-multiply" loading="lazy" />
                        <div v-else class="flex h-full w-full items-center justify-center text-aura-moss"><i class="fa-solid fa-box text-xs" /></div>
                    </div>
                </template>
                <template #name="{ row }">
                    <p class="font-medium text-aura-slate hover:underline">{{ row.name }}</p>
                    <p class="font-mono text-[10px] text-aura-moss">{{ row.sku }}</p>
                </template>
                <template #price="{ value }">
                    <span class="font-serif font-semibold text-aura-slate">${{ Number(value).toFixed(2) }}</span>
                </template>
                <template #stock_count="{ value }">
                    <span :class="['font-medium', value <= 5 ? 'text-amber-600 font-semibold' : 'text-aura-slate']">{{ value }} in stock</span>
                </template>
                <template #status="{ row }">
                    <StatusBadge :label="row.status_label" :color="row.status_color" />
                </template>
                <template #actions="{ row }">
                    <ProductRowActions :product="row" @duplicate="router.post(`/admin/products/${row.id}/duplicate`)" @delete="productToDelete = row; deleteModalOpen = true" />
                </template>
            </DataTable>

            <Pagination
                :current-page="props.products.current_page"
                :last-page="props.products.last_page"
                :per-page="props.products.per_page"
                :total="props.products.total"
                :from="props.products.from"
                :to="props.products.to"
                @change-page="applyParams({ page: $event })"
                @change-per-page="applyParams({ per_page: $event, page: 1 })"
            />
        </div>

        <FloatingBulkToolbar :selected-count="selectedKeys.length" @clear="selectedKeys = []" @action="handleBulkAction" />
        <AdminModal
            :open="deleteModalOpen"
            title="Delete Product"
            :description="`Are you sure you want to delete '${productToDelete?.name}'?`"
            confirm-label="Delete Product"
            variant="destructive"
            :loading="isDeleting"
            @close="deleteModalOpen = false"
            @confirm="confirmDelete"
        />
    </AdminLayout>
</template>
