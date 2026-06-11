export type AnalyticsKpi = {
  id: string;
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  helper: string;
};

export type ChartPoint = {
  period: string;
  revenue?: number;
  gmv?: number;
  orders?: number;
  suppliers?: number;
  failures?: number;
};

export type TrafficSource = {
  source: string;
  visitors: number;
  fill: string;
};

export type CategoryPerformance = {
  category: string;
  revenue: number;
  orders: number;
};

export type AnalyticsRow = Record<string, string | number>;

export type LiveActivity = {
  id: string;
  event: string;
  actor: string;
  timestamp: string;
  severity: "success" | "info" | "warning" | "critical";
};

export const analyticsKpis: AnalyticsKpi[] = [
  { id: "revenue", label: "Total Revenue", value: "Rs 8.42 Cr", change: "+18.4%", trend: "up", helper: "Net captured revenue" },
  { id: "gmv", label: "GMV", value: "Rs 14.8 Cr", change: "+22.1%", trend: "up", helper: "Marketplace order value" },
  { id: "orders", label: "Total Orders", value: "48,920", change: "+12.7%", trend: "up", helper: "Across B2C and B2B" },
  { id: "buyers", label: "Active Buyers", value: "31,408", change: "+9.8%", trend: "up", helper: "30 day active buyers" },
  { id: "suppliers", label: "Active Suppliers", value: "2,184", change: "+6.2%", trend: "up", helper: "Verified sellers" },
  { id: "vet", label: "Vet Consultations", value: "6,742", change: "+31.5%", trend: "up", helper: "Booked and completed" },
  { id: "conversion", label: "Conversion Rate", value: "5.84%", change: "-0.3%", trend: "down", helper: "Session to order" },
  { id: "commission", label: "Platform Commission", value: "Rs 1.26 Cr", change: "+16.2%", trend: "up", helper: "Marketplace take rate" }
];

export const revenueTrendData: ChartPoint[] = [
  { period: "Jan", revenue: 96, gmv: 148 },
  { period: "Feb", revenue: 118, gmv: 176 },
  { period: "Mar", revenue: 132, gmv: 211 },
  { period: "Apr", revenue: 126, gmv: 206 },
  { period: "May", revenue: 164, gmv: 258 },
  { period: "Jun", revenue: 188, gmv: 294 },
  { period: "Jul", revenue: 214, gmv: 338 }
];

export const ordersTrendData: ChartPoint[] = [
  { period: "Mon", orders: 612 },
  { period: "Tue", orders: 684 },
  { period: "Wed", orders: 741 },
  { period: "Thu", orders: 818 },
  { period: "Fri", orders: 902 },
  { period: "Sat", orders: 974 },
  { period: "Sun", orders: 853 }
];

export const trafficSourceData: TrafficSource[] = [
  { source: "Organic", visitors: 42, fill: "#0B8F47" },
  { source: "WhatsApp", visitors: 24, fill: "#31C48D" },
  { source: "Paid Search", visitors: 18, fill: "#0F766E" },
  { source: "Direct", visitors: 11, fill: "#84CC16" },
  { source: "Referral", visitors: 5, fill: "#F59E0B" }
];

export const supplierGrowthData: ChartPoint[] = [
  { period: "Jan", suppliers: 1280 },
  { period: "Feb", suppliers: 1398 },
  { period: "Mar", suppliers: 1510 },
  { period: "Apr", suppliers: 1664 },
  { period: "May", suppliers: 1812 },
  { period: "Jun", suppliers: 2028 },
  { period: "Jul", suppliers: 2184 }
];

export const categoryPerformanceData: CategoryPerformance[] = [
  { category: "Animal Health", revenue: 186, orders: 9210 },
  { category: "Feed", revenue: 164, orders: 8112 },
  { category: "Poultry", revenue: 132, orders: 6640 },
  { category: "Pet Care", revenue: 118, orders: 5924 },
  { category: "Dairy", revenue: 104, orders: 4818 },
  { category: "Equipment", revenue: 72, orders: 2150 }
];

export const shippingFailureData: ChartPoint[] = [
  { period: "W1", failures: 42 },
  { period: "W2", failures: 38 },
  { period: "W3", failures: 51 },
  { period: "W4", failures: 34 },
  { period: "W5", failures: 29 },
  { period: "W6", failures: 24 }
];

export const topProductsTable: AnalyticsRow[] = [
  { product: "Bravecto Chewable", category: "Pet Care", supplier: "AnimKart Verified", views: "54,210", orders: 1420, revenue: "Rs 27.6 L", conversion: "7.8%" },
  { product: "High Protein Dairy Feed", category: "Feed", supplier: "Godrej Agrovet", views: "41,908", orders: 1184, revenue: "Rs 19.4 L", conversion: "6.9%" },
  { product: "Calcium Feed Supplement", category: "Dairy", supplier: "Intas", views: "38,440", orders: 1038, revenue: "Rs 13.8 L", conversion: "6.1%" },
  { product: "Poultry Immunity Booster", category: "Poultry", supplier: "Virbac", views: "30,124", orders: 894, revenue: "Rs 11.7 L", conversion: "5.8%" }
];

export const topSuppliersTable: AnalyticsRow[] = [
  { supplier: "AnimKart Verified", location: "Bengaluru", products: 842, orders: 12840, revenue: "Rs 2.8 Cr", rating: "4.9", inventory: "96%" },
  { supplier: "Godrej Agrovet", location: "Mumbai", products: 216, orders: 6412, revenue: "Rs 1.7 Cr", rating: "4.8", inventory: "91%" },
  { supplier: "Virbac India", location: "Pune", products: 184, orders: 4890, revenue: "Rs 1.2 Cr", rating: "4.9", inventory: "94%" },
  { supplier: "Intas Animal Health", location: "Ahmedabad", products: 156, orders: 4218, revenue: "Rs 98 L", rating: "4.7", inventory: "88%" }
];

export const shippingIssuesTable: AnalyticsRow[] = [
  { supplier: "Godrej Agrovet", orderId: "AK-78241", issueType: "Delayed pickup", location: "Hassan", status: "Escalated", action: "Assign ops" },
  { supplier: "AnimKart Verified", orderId: "AK-78218", issueType: "Address mismatch", location: "Patna", status: "Open", action: "Call buyer" },
  { supplier: "Virbac India", orderId: "AK-78196", issueType: "Cold chain hold", location: "Nagpur", status: "Monitoring", action: "Track SLA" },
  { supplier: "Intas Animal Health", orderId: "AK-78177", issueType: "RTO risk", location: "Jaipur", status: "Open", action: "Verify PIN" }
];

export const inventoryAlertsTable: AnalyticsRow[] = [
  { product: "Poultry Immunity Booster", supplier: "Virbac India", stockStatus: "Low stock", lastUpdated: "8 min ago", action: "Reorder" },
  { product: "Dairy Gold Feed 50kg", supplier: "Godrej Agrovet", stockStatus: "Fast moving", lastUpdated: "14 min ago", action: "Increase buffer" },
  { product: "Calcium Supplement", supplier: "Intas Animal Health", stockStatus: "Out of stock", lastUpdated: "31 min ago", action: "Hide listing" },
  { product: "Pet Deworming Tablet", supplier: "AnimKart Verified", stockStatus: "Low stock", lastUpdated: "42 min ago", action: "Notify supplier" }
];

export const liveActivities: LiveActivity[] = [
  { id: "act-1", event: "New supplier registered", actor: "Kisan Vet Pharma", timestamp: "Now", severity: "success" },
  { id: "act-2", event: "Product submitted for approval", actor: "Dairy Boost 5kg", timestamp: "2 min ago", severity: "info" },
  { id: "act-3", event: "Order placed", actor: "AK-78249 - Rs 18,420", timestamp: "4 min ago", severity: "success" },
  { id: "act-4", event: "Vet consultation booked", actor: "Poultry flock advisory", timestamp: "7 min ago", severity: "info" },
  { id: "act-5", event: "Inventory alert triggered", actor: "Calcium Supplement", timestamp: "12 min ago", severity: "warning" },
  { id: "act-6", event: "Shipping issue reported", actor: "AK-78241 - Hassan", timestamp: "18 min ago", severity: "critical" }
];
