/**
 * Discount types for Aura & Oak Admin Panel.
 */

export interface AdminDiscountListItem {
    id: number;
    code: string;
    type: 'percentage' | 'fixed';
    type_label: string;
    type_color: string;
    value: number;
    formatted_value: string;
    min_order_amount: number | null;
    max_uses: number | null;
    uses_count: number;
    is_active: boolean;
    is_valid: boolean;
    starts_at: string | null;
    expires_at: string | null;
    description: string | null;
    created_at: string;
}

export interface AdminDiscountFilters {
    search: string;
    status: string;
    per_page: number;
}

export interface AdminDiscountStats {
    total: number;
    active: number;
    total_redemptions: number;
}
