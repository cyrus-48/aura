/**
 * Types representing customer orders and items.
 * Mirrors Laravel API Resources: OrderResource, OrderItemResource, AddressResource.
 */

export interface OrderAddressData {
    id: number;
    firstName: string;
    lastName: string;
    company: string | null;
    addressLine1: string;
    addressLine2: string | null;
    city: string;
    state: string | null;
    postalCode: string;
    country: string;
    phone: string | null;
    isDefaultShipping: boolean;
    isDefaultBilling: boolean;
}

export interface OrderItemData {
    id: number;
    productName: string;
    variantSku: string | null;
    variantAttributes: Record<string, string> | null;
    unitPrice: number;
    quantity: number;
    total: number;
    image: string | null;
}

export interface OrderFinancialSummary {
    subtotal: number;
    shippingCost: number;
    taxAmount: number;
    discountAmount: number;
    total: number;
}

export interface OrderData {
    id: number;
    orderNumber: string;
    email: string;
    phone: string | null;
    status: string;
    statusLabel: string;
    statusColor: string;
    paymentStatus: string;
    paymentStatusLabel: string;
    paymentStatusColor: string;
    paymentMethod: string;
    paymentMethodLabel: string;
    subtotal: number;
    shippingCost: number;
    taxAmount: number;
    discountAmount: number;
    total: number;
    shippingMethod: string;
    shippingAddress: OrderAddressData | null;
    items?: OrderItemData[];
    createdAt: string | null;
}
