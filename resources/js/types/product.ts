/**
 * Types representing products and categories.
 * Mirrors Laravel API Resources: ProductCardResource, ProductDetailResource, ProductVariantResource, CategoryResource.
 */

export interface ProductCategory {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image: string | null;
    productsCount?: number | null;
}

export interface ProductVariant {
    id: number;
    sku: string;
    color: string | null;
    size: string | null;
    material: string | null;
    price: number | null;
    stockCount: number;
    inStock: boolean;
}

export interface ProductCard {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    basePrice: number;
    comparePrice: number | null;
    primaryImage: string | null;
    secondaryImage: string | null;
    category: ProductCategory | null;
    badge: string | null;
    isSustainable: boolean;
    hasStock: boolean;
}

export interface ProductDetailMedia {
    primaryImage: string | null;
    gallery: string[];
}

export interface ProductDetailSpecifications {
    dimensions: string | null;
    materialsCare: string | null;
    origin: string | null;
}

export interface ProductDetail {
    id: number;
    name: string;
    slug: string;
    tagline: string | null;
    description: string;
    basePrice: number;
    comparePrice: number | null;
    badge: string | null;
    isSustainable: boolean;
    hasStock: boolean;
    category: ProductCategory | null;
    media: ProductDetailMedia;
    specs: ProductDetailSpecifications;
    variants: ProductVariant[];
}
