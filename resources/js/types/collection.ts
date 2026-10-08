/**
 * Types representing curated collections.
 * Mirrors Laravel API Resources: CollectionResource.
 */

import type { ProductCard } from '@/types/product';

export interface CollectionData {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    description: string | null;
    heroImage: string | null;
    isFeatured: boolean;
    productsCount: number;
    products?: ProductCard[];
}
