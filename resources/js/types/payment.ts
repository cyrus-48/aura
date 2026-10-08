/**
 * Payment transaction types for Aura & Oak Admin Panel.
 */

export interface AdminPaymentListItem {
    id: number;
    uuid: string;
    reference: string;
    provider: string;
    provider_name: string;
    provider_reference: string;
    receipt_number: string | null;
    amount: number;
    formatted_amount: string;
    currency: string;
    status: string;
    customer_name: string;
    customer_email: string | null;
    customer_phone: string | null;
    failure_reason: string | null;
    metadata: Record<string, unknown> | null;
    created_at: string;
}

export interface AdminPaymentFilters {
    search: string;
    status: string;
    provider: string;
    per_page: number;
}

export interface AdminPaymentStats {
    total_volume: string;
    successful_count: number;
    failed_count: number;
}
