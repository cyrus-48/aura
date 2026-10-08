import { computed, ref } from 'vue';
import { router } from '@inertiajs/vue3';
import type { CatalogFilterState } from '@/types/catalog';

/**
 * Composable managing shop filters, sorting, and search state.
 * Adheres to Rule 4: accepts initial state, pure refs/computeds, unit-testable.
 */
export function useProductFilters(initialFilters: Partial<CatalogFilterState> = {}) {
    const category = ref<string | null>(initialFilters?.category || null);
    const search = ref<string>(initialFilters?.search || '');
    const material = ref<string | null>(initialFilters?.material || null);
    const minPrice = ref<number | null>(initialFilters?.minPrice || null);
    const maxPrice = ref<number | null>(initialFilters?.maxPrice || null);
    const sort = ref<string>(initialFilters?.sort || 'featured');

    const activeFiltersCount = computed(() => {
        let count = 0;
        if (category.value) {
            count++;
        }
        if (search.value) {
            count++;
        }
        if (material.value) {
            count++;
        }
        if (minPrice.value !== null) {
            count++;
        }
        if (maxPrice.value !== null) {
            count++;
        }
        return count;
    });

    function applyFilters(): void {
        const queryParams: Record<string, string | number> = {};

        if (category.value) {
            queryParams.category = category.value;
        }
        if (search.value.trim()) {
            queryParams.search = search.value.trim();
        }
        if (material.value) {
            queryParams.material = material.value;
        }
        if (minPrice.value !== null && minPrice.value > 0) {
            queryParams.min_price = minPrice.value;
        }
        if (maxPrice.value !== null) {
            queryParams.max_price = maxPrice.value;
        }
        if (sort.value && sort.value !== 'featured') {
            queryParams.sort = sort.value;
        }

        router.get('/shop', queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    }

    function clearFilters(): void {
        category.value = null;
        search.value = '';
        material.value = null;
        minPrice.value = null;
        maxPrice.value = null;
        sort.value = 'featured';

        router.get(
            '/shop',
            {},
            {
                preserveState: true,
                preserveScroll: true,
            },
        );
    }

    function setCategory(slug: string | null): void {
        category.value = slug;
        applyFilters();
    }

    function setMaterial(mat: string | null): void {
        material.value = mat;
        applyFilters();
    }

    function setSort(sortOption: string): void {
        sort.value = sortOption;
        applyFilters();
    }

    return {
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
    };
}
