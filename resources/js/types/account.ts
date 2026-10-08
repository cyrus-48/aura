/**
 * Types representing user account, profile, metrics, and saved addresses.
 */

import type { OrderAddressData, OrderData } from '@/types/order';

export interface AccountMetrics {
    totalOrders: number;
    pendingOrders: number;
    deliveredOrders: number;
    lifetimeSpend: number;
}

export interface UserProfile {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    avatar: string | null;
    initials: string;
    memberSince: string;
}

export interface AccountPageProps {
    user: UserProfile;
    metrics: AccountMetrics;
    orders: OrderData[];
    addresses: OrderAddressData[];
}
