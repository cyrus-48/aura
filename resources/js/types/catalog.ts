/**
 * Types representing catalog browsing, filtering, and pagination.
 */

import type { ProductCategory } from '@/types/product';

export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

export interface PaginatedCollection<T> {
    data: T[];
    links: PaginationLink[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
}

export interface CatalogFilterState {
    category: string | null;
    search: string | null;
    material: string | null;
    minPrice: number | null;
    maxPrice: number | null;
    sort: string | null;
}

export interface ShopPageProps<T> {
    products: PaginatedCollection<T>;
    categories: ProductCategory[];
    materials: string[];
    priceRange: {
        min: number;
        max: number;
    };
    filters: CatalogFilterState;
}
