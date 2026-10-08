/**
 * Customer types for Aura & Oak Admin Panel.
 */

export interface AdminCustomerListItem {
    id: number;
    name: string;
    email: string;
    orders_count: number;
    total_spend: number;
    formatted_total_spend: string;
    is_verified: boolean;
    created_at: string;
}

export interface AdminCustomerFilters {
    search: string;
    per_page: number;
}

export interface AdminCustomerStats {
    total_customers: number;
    total_revenue: string;
    average_ltv: string;
}

export interface AdminCustomerDetail {
    id: number;
    name: string;
    email: string;
    role: string;
    is_verified: boolean;
    created_at: string;
    total_spend: string;
    order_count: number;
}

export interface AdminCustomerOrder {
    id: number;
    order_number: string;
    items_count: number;
    total: number;
    formatted_total: string;
    status: string;
    status_label: string;
    status_color: string;
    created_at: string;
}

export interface AdminCustomerAddress {
    id: number;
    type: string;
    recipient_name: string;
    address_line_1: string;
    city: string;
    postal_code: string;
    country: string;
    is_default: boolean;
}

export interface AdminCustomerNote {
    id: number;
    author_name: string;
    note: string;
    created_at: string;
}
