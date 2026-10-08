/**
 * Types representing the Aura & Oak Admin Panel and Dashboard.
 */

export interface AdminSparklineMetric {
    count?: number;
    amount?: number;
    formatted?: string;
    change_percent?: number;
    is_positive?: boolean;
    badge?: string;
    sparkline: number[];
}

export interface AdminDashboardMetrics {
    today_orders: AdminSparklineMetric;
    today_revenue: AdminSparklineMetric;
    pending_fulfillment: AdminSparklineMetric;
    low_stock: AdminSparklineMetric;
}

export interface AdminRecentOrder {
    id: number;
    order_number: string;
    customer_name: string;
    customer_email: string;
    total: number;
    formatted_total: string;
    status: string;
    status_label: string;
    status_color: string;
    payment_status: string;
    payment_label: string;
    payment_color: string;
    created_at: string;
}

export interface AdminLowStockItem {
    id: number;
    product_id: number;
    name: string;
    variant_label: string;
    sku: string;
    stock_count: number;
    image: string | null;
}

export interface AdminChartPoint {
    date: string;
    revenue: number;
    formatted_revenue: string;
    height_percent: number;
}

export interface AdminTopProduct {
    id: number;
    name: string;
    primary_image: string | null;
    category_name: string;
    units_sold: number;
    revenue: number;
    formatted_revenue: string;
    stock_status: string;
    stock_color: string;
}

export interface AdminSidebarCounts {
    products: number;
    low_stock: number;
    pending_orders: number;
}

export interface AdminDashboardData {
    metrics: AdminDashboardMetrics;
    recent_orders: AdminRecentOrder[];
    low_stock_items: AdminLowStockItem[];
    revenue_chart: AdminChartPoint[];
    top_products: AdminTopProduct[];
    sidebar_counts: AdminSidebarCounts;
}

export interface AdminBreadcrumbItem {
    label: string;
    href?: string;
}
