/**
 * Types representing shopping cart and cart items.
 * Mirrors Laravel API Resources: CartResource, CartItemResource.
 */

export interface CartItemProductSummary {
    id: number;
    name: string;
    slug: string;
    primaryImage: string | null;
}

export interface CartItemVariantSummary {
    id: number;
    sku: string;
    color: string | null;
    size: string | null;
    material: string | null;
    stockCount: number;
}

export interface CartItemData {
    id: number;
    quantity: number;
    unitPrice: number;
    lineTotal: number;
    product: CartItemProductSummary;
    variant: CartItemVariantSummary | null;
}

export interface CartData {
    id: number;
    itemsCount: number;
    totalQuantity: number;
    subtotal: number;
    items: CartItemData[];
}
