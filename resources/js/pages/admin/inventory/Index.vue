<script setup lang="ts">
import { Head, Link, router, useForm } from '@inertiajs/vue3';
import { computed, ref } from 'vue';
import AdminModal from '@/components/admin/AdminModal.vue';
import AdminPageHeader from '@/components/admin/AdminPageHeader.vue';
import DataTable, { type DataTableColumn } from '@/components/admin/DataTable.vue';
import FilterBar, { type FilterDefinition } from '@/components/admin/FilterBar.vue';
import FormField from '@/components/admin/FormField.vue';
import Pagination from '@/components/admin/Pagination.vue';
import AdminLayout from '@/layouts/AdminLayout.vue';

interface VariantRow {
    id: number;
    product_id: number;
    product_name: string;
    category_name: string;
    primary_image: string | null;
    variant_name: string;
    color: string;
    size: string;
    sku: string;
    stock_on_hand: number;
    reserved_stock: number;
    available_stock: number;
    last_movement: string;
    last_reason: string;
}

const props = defineProps<{
    variants: {
        data: VariantRow[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    };
    categories: { id: number; name: string; slug: string }[];
    filters: { search: string; category: string; stock: string; per_page: number };
    low_stock_count: number;
}>();

const adjustModalOpen = ref(false);
const activeVariant = ref<VariantRow | null>(null);

const adjustForm = useForm({
    product_variant_id: 0,
    adjustment_type: 'add' as 'add' | 'subtract' | 'set',
    quantity: 10,
    reason: 'Stock replenishment delivery',
});

const columns: DataTableColumn[] = [
    { key: 'product', label: 'Product' },
    { key: 'variant_name', label: 'Variant' },
    { key: 'sku', label: 'SKU' },
    { key: 'stock_on_hand', label: 'On Hand', align: 'right' },
    { key: 'reserved_stock', label: 'Reserved', align: 'right' },
    { key: 'available_stock', label: 'Available', align: 'right' },
    { key: 'last_movement', label: 'Last Movement' },
    { key: 'actions', label: 'Actions', align: 'right', width: '100px' },
];

const filterDefs = computed<FilterDefinition[]>(() => [
    {
        key: 'category',
        label: 'Categories',
        selected: props.filters.category,
        options: props.categories.map((c) => ({ label: c.name, value: c.slug })),
    },
    {
        key: 'stock',
        label: 'Stock Levels',
        selected: props.filters.stock,
        options: [
            { label: 'In Stock (> 5)', value: 'in_stock' },
            { label: 'Low Stock (1-5)', value: 'low_stock' },
            { label: 'Out of Stock (0)', value: 'out_of_stock' },
        ],
    },
]);

const hasActiveFilters = computed(() => !!(props.filters.search || props.filters.category || props.filters.stock));

const applyParams = (params: Record<string, any>) => {
    router.get('/admin/inventory', { ...props.filters, ...params, page: params.page ?? 1 }, {
        preserveState: true,
        replace: true,
    });
};

const openAdjust = (variant: VariantRow) => {
    activeVariant.value = variant;
    adjustForm.product_variant_id = variant.id;
    adjustForm.adjustment_type = 'add';
    adjustForm.quantity = 10;
    adjustForm.reason = 'Restock replenishment shipment';
    adjustModalOpen.value = true;
};

const submitAdjust = () => {
    adjustForm.post('/admin/inventory/adjust', {
        onSuccess: () => {
            adjustModalOpen.value = false;
        },
    });
};
</script>

<template>
    <AdminLayout :breadcrumbs="[{ label: 'Admin', href: '/admin' }, { label: 'Inventory' }]">
        <Head title="Inventory | Aura & Oak Admin" />

        <AdminPageHeader
            title="Inventory"
            :subtitle="`Tracking stock levels across ${props.variants.total} SKUs. ${props.low_stock_count} items need restock attention.`"
        />

        <div class="overflow-hidden rounded-xl border border-aura-sage bg-white shadow-card">
            <FilterBar
                :search="props.filters.search"
                search-placeholder="Search by SKU, product, color or size..."
                :filters="filterDefs"
                :show-clear="hasActiveFilters"
                @update:search="applyParams({ search: $event })"
                @update:filter="(key, val) => applyParams({ [key]: val })"
                @clear="applyParams({ search: '', category: '', stock: '' })"
            />

            <DataTable
                :columns="columns"
                :rows="props.variants.data"
                empty-title="No inventory records"
                empty-description="Create products and variants to view inventory counts."
            >
                <template #product="{ row }">
                    <div class="flex items-center space-x-3">
                        <div class="h-8 w-8 rounded bg-aura-sage overflow-hidden shrink-0">
                            <img v-if="row.primary_image" :src="row.primary_image" :alt="row.product_name" class="h-full w-full object-cover mix-blend-multiply" />
                            <div v-else class="flex h-full w-full items-center justify-center text-aura-moss"><i class="fa-solid fa-box text-xs" /></div>
                        </div>
                        <div>
                            <Link :href="`/admin/products/${row.product_id}/edit`" class="font-medium text-xs text-aura-slate hover:underline">{{ row.product_name }}</Link>
                            <p class="text-[10px] text-aura-moss">{{ row.category_name }}</p>
                        </div>
                    </div>
                </template>

                <template #sku="{ value }">
                    <span class="font-mono text-[10px] font-semibold text-aura-slate">{{ value }}</span>
                </template>

                <template #stock_on_hand="{ value }">
                    <span class="font-semibold text-aura-slate">{{ value }}</span>
                </template>

                <template #reserved_stock="{ value }">
                    <span :class="['text-xs', value > 0 ? 'font-medium text-amber-700' : 'text-aura-moss']">{{ value }}</span>
                </template>

                <template #available_stock="{ value }">
                    <span :class="['rounded px-1.5 py-0.5 text-xs font-semibold', value <= 2 ? 'bg-red-50 text-red-700' : value <= 5 ? 'bg-amber-50 text-amber-700' : 'text-green-700']">
                        {{ value }} avail
                    </span>
                </template>

                <template #last_movement="{ row }">
                    <p class="text-[11px] text-aura-slate">{{ row.last_movement }}</p>
                    <p v-if="row.last_reason" class="text-[9px] text-aura-moss truncate max-w-[140px]">{{ row.last_reason }}</p>
                </template>

                <template #actions="{ row }">
                    <button
                        type="button"
                        class="rounded border border-aura-sage bg-white px-2.5 py-1 text-[10px] font-medium text-aura-slate hover:bg-aura-sage/40 cursor-pointer"
                        @click="openAdjust(row)"
                    >
                        Adjust
                    </button>
                </template>
            </DataTable>

            <Pagination
                :current-page="props.variants.current_page"
                :last-page="props.variants.last_page"
                :per-page="props.variants.per_page"
                :total="props.variants.total"
                :from="props.variants.from"
                :to="props.variants.to"
                @change-page="applyParams({ page: $event })"
                @change-per-page="applyParams({ per_page: $event, page: 1 })"
            />
        </div>

        <!-- Stock Adjustment Modal (Part 3.6 of spec) -->
        <AdminModal
            :open="adjustModalOpen"
            :title="`Adjust Stock: ${activeVariant?.sku}`"
            :description="`Current on-hand count is ${activeVariant?.stock_on_hand}. Select adjustment mode and supply an audit reason.`"
            confirm-label="Update Stock"
            :loading="adjustForm.processing"
            @close="adjustModalOpen = false"
            @confirm="submitAdjust"
        >
            <div class="space-y-3 pt-2">
                <FormField label="Adjustment Type">
                    <select v-model="adjustForm.adjustment_type" class="w-full rounded-lg border border-aura-sage bg-white px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none">
                        <option value="add">Add Stock (Shipment In)</option>
                        <option value="subtract">Subtract Stock (Damage / Loss)</option>
                        <option value="set">Set Exact Count (Physical Audit)</option>
                    </select>
                </FormField>
                <FormField label="Quantity" required :error="adjustForm.errors.quantity">
                    <input v-model.number="adjustForm.quantity" type="number" min="0" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                </FormField>
                <FormField label="Audit Reason" required :error="adjustForm.errors.reason">
                    <input v-model="adjustForm.reason" type="text" placeholder="e.g. Received shipment, Inventory cycle count" required class="w-full rounded-lg border border-aura-sage bg-aura-bg/30 px-3 py-2 text-xs text-aura-slate focus:border-aura-slate focus:outline-none" />
                </FormField>
            </div>
        </AdminModal>
    </AdminLayout>
</template>
