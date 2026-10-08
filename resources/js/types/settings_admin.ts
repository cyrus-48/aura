/**
 * Settings and Staff types for Aura & Oak Admin.
 */

export interface AdminStoreSettings {
    store_name: string;
    support_email: string;
    contact_phone: string;
    currency: string;
    tax_rate: string;
    free_shipping_threshold: string;
    flat_shipping_rate: string;
    low_stock_threshold: string;
    notifications_enabled: boolean;
}

export interface AdminStaffMember {
    id: number;
    name: string;
    email: string;
    role: string;
    role_label: string;
    role_color: string;
    is_current_user: boolean;
    created_at: string;
}
