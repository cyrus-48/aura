<script setup lang="ts">
import { computed } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import ShopActiveFilters from '@/components/catalog/ShopActiveFilters.vue';
import ShopFilterSidebar from '@/components/catalog/ShopFilterSidebar.vue';
import ShopPagination from '@/components/catalog/ShopPagination.vue';
import ShopProductGrid from '@/components/catalog/ShopProductGrid.vue';
import ShopSortBar from '@/components/catalog/ShopSortBar.vue';
import { useProductFilters } from '@/composables/useProductFilters';
import StoreLayout from '@/layouts/StoreLayout.vue';
import type { CatalogFilterState, PaginatedCollection, PaginationLink } from '@/types/catalog';
import type { ProductCard, ProductCategory } from '@/types/product';

const props = withDefaults(
    defineProps<{
        products: PaginatedCollection<ProductCard>;
        categories?: ProductCategory[];
        materials?: string[];
        priceRange?: {
            min: number;
            max: number;
        };
        filters?: CatalogFilterState;
    }>(),
    {
        categories: () => [],
        materials: () => [],
        priceRange: () => ({ min: 0, max: 500 }),
        filters: () => ({
            category: null,
            search: null,
            material: null,
            minPrice: null,
            maxPrice: null,
            sort: null,
        }),
    },
);

const {
    category,
    search,
    material,
    minPrice,
    maxPrice,
    sort,
    activeFiltersCount,
    applyFilters,
    clearFilters,
    setCategory,
    setMaterial,
    setSort,
} = useProductFilters(props.filters);

const totalCount = computed<number>(() => {
    const raw = props.products as any;
    return raw?.meta?.total ?? raw?.total ?? raw?.data?.length ?? 0;
});

const paginationLinks = computed<PaginationLink[]>(() => {
    const raw = props.products as any;
    if (Array.isArray(raw?.meta?.links)) {
        return raw.meta.links;
    }
    if (Array.isArray(raw?.links)) {
        return raw.links;
    }
    return [];
});

function handleQuickAdd(productId: number): void {
    router.post(
        '/cart',
        {
            product_id: productId,
            quantity: 1,
        },
        {
            preserveScroll: true,
        },
    );
}
</script>

<template>
    <StoreLayout title="Artisanal Collection — Aura & Oak">
        <Head>
            <title>Curated Shop | Aura & Oak</title>
            <meta
                name="description"
                content="Discover mindfully crafted organic apparel, accessories, and home goods."
            />
        </Head>

        <!-- Page Header -->
        <header
            class="mx-auto w-full max-w-[1400px] px-6 py-12 text-center md:py-16"
        >
            <h1
                class="mb-4 font-serif text-4xl text-aura-slate md:text-5xl lg:text-6xl"
            >
                The Atelier Shop
            </h1>
            <p
                class="mx-auto max-w-md text-xs font-light text-aura-moss md:text-sm"
            >
                Browse our full range of consciously crafted garments and
                accessories, designed to be worn and loved for years to come.
            </p>
        </header>

        <!-- Main Content Layout -->
        <main
            class="mx-auto mb-24 flex w-full max-w-[1400px] flex-grow flex-col gap-10 px-6 lg:flex-row"
        >
            <ShopFilterSidebar
                :categories="categories"
                :materials="materials"
                :selected-category="category"
                :selected-material="material"
                :min-price="minPrice"
                :max-price="maxPrice"
                @update:category="(cat) => setCategory(cat)"
                @update:material="(mat) => setMaterial(mat)"
                @update:min-price="(p) => (minPrice = p)"
                @update:max-price="(p) => (maxPrice = p)"
                @apply="applyFilters"
                @clear="clearFilters"
            />

            <!-- Product Grid Area -->
            <div class="flex-1">
                <ShopActiveFilters
                    :category="category"
                    :material="material"
                    :search="search"
                    :min-price="minPrice"
                    :max-price="maxPrice"
                    :has-active-filters="activeFiltersCount > 0"
                    @clear-category="() => setCategory(null)"
                    @clear-material="() => setMaterial(null)"
                    @clear-search="
                        () => {
                            search = '';
                            applyFilters();
                        }
                    "
                    @clear-price="
                        () => {
                            minPrice = null;
                            maxPrice = null;
                            applyFilters();
                        }
                    "
                    @clear-all="clearFilters"
                />

                <ShopSortBar
                    :total="totalCount"
                    :search="search"
                    :sort="sort"
                    @update:search="(val) => (search = val)"
                    @update:sort="(val) => setSort(val)"
                    @search="applyFilters"
                />

                <ShopProductGrid
                    :products="products.data || []"
                    @quick-add="handleQuickAdd"
                />

                <ShopPagination :links="paginationLinks" />
            </div>
        </main>
    </StoreLayout>
</template>
