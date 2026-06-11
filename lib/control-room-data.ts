import { formatINR, products } from "@/lib/products";

export type ControlRoomKpi = {
  id: string;
  label: string;
  value: string;
  status: "healthy" | "watch" | "critical";
  helper: string;
};

export type HealthMetric = {
  label: string;
  score: number;
  detail: string;
};

export type ActivityEvent = {
  id: string;
  title: string;
  detail: string;
  time: string;
  severity: "success" | "info" | "warning" | "critical";
};

export type PendingAction = {
  title: string;
  count: number;
  priority: "high" | "medium" | "low";
  action: string;
};

export type StatusMetric = {
  label: string;
  value: string;
  detail: string;
  status: "healthy" | "watch" | "critical";
};

export type BroadcastAction = {
  label: string;
  audience: string;
  count: string;
};

export type ControlRoomSummary = {
  label: string;
  value: string;
  detail: string;
};

const validProducts = products.filter((product) => product.price > 0);
const inStockProducts = validProducts.filter((product) => product.inStock);
const outOfStockProducts = validProducts.filter((product) => !product.inStock);
const imageMissingProducts = validProducts.filter((product) => !product.image);
const suppliers = new Map<string, typeof validProducts>();

for (const product of validProducts) {
  const key = product.brand?.trim() || "AnimKart Verified";
  suppliers.set(key, [...(suppliers.get(key) ?? []), product]);
}

const catalogValue = validProducts.reduce((sum, product) => sum + product.price, 0);
const inventoryScore = validProducts.length ? Math.round((inStockProducts.length / validProducts.length) * 100) : 0;
const supplierScore = suppliers.size > 0 ? Math.min(98, Math.round((suppliers.size / 40) * 100)) : 0;
const shippingScore = Math.max(55, 100 - imageMissingProducts.length);
const orderScore = 0;
const vetScore = 0;

export const controlRoomKpis: ControlRoomKpi[] = [
  { id: "visitors", label: "Live Visitors", value: "0", status: "watch", helper: "Connect realtime web sessions" },
  { id: "orders", label: "Active Orders", value: "0", status: "watch", helper: "Awaiting Supabase orders table" },
  { id: "supplier-approvals", label: "Pending Supplier Approvals", value: "0", status: "healthy", helper: `${suppliers.size} catalog suppliers mapped` },
  { id: "product-approvals", label: "Pending Product Approvals", value: imageMissingProducts.length.toString(), status: imageMissingProducts.length ? "watch" : "healthy", helper: "Products needing image/catalog review" },
  { id: "shipping-issues", label: "Shipping Issues", value: imageMissingProducts.length.toString(), status: imageMissingProducts.length ? "watch" : "healthy", helper: "Catalog exceptions until shipping events exist" },
  { id: "inventory-alerts", label: "Inventory Alerts", value: outOfStockProducts.length.toString(), status: outOfStockProducts.length ? "critical" : "healthy", helper: "Out-of-stock imported products" },
  { id: "vet-cases", label: "Vet Cases", value: "0", status: "watch", helper: "Awaiting vet consultation table" },
  { id: "revenue", label: "Revenue Today", value: "Rs 0", status: "watch", helper: `Catalog base ${formatCompactINR(catalogValue)}` }
];

export const controlRoomSummary: ControlRoomSummary[] = [
  {
    label: "Real Products",
    value: validProducts.length.toLocaleString("en-IN"),
    detail: "WooCommerce catalog SKUs"
  },
  {
    label: "Supplier Brands",
    value: suppliers.size.toLocaleString("en-IN"),
    detail: "Mapped from product export"
  },
  {
    label: "Catalog Value",
    value: formatCompactINR(catalogValue),
    detail: "Sum of real product prices"
  },
  {
    label: "Inventory Score",
    value: `${inventoryScore}%`,
    detail: `${inStockProducts.length.toLocaleString("en-IN")} products in stock`
  }
];

export const healthMetrics: HealthMetric[] = [
  { label: "Supplier Health", score: supplierScore, detail: `${suppliers.size} supplier/brand records from catalog` },
  { label: "Inventory Health", score: inventoryScore, detail: `${inStockProducts.length} of ${validProducts.length} products in stock` },
  { label: "Shipping Health", score: shippingScore, detail: "Shipment data pending; using catalog exceptions" },
  { label: "Order Health", score: orderScore, detail: "No live order records connected yet" },
  { label: "Vet Service Health", score: vetScore, detail: "No live vet case records connected yet" }
];

export const platformScore = Math.round(
  healthMetrics.reduce((sum, metric) => sum + metric.score, 0) / healthMetrics.length
);

export const realTimeActivities: ActivityEvent[] = [
  { id: "a1", title: "Catalog imported", detail: `${validProducts.length} real products available in admin OS`, time: "Live", severity: "success" },
  { id: "a2", title: "Supplier joined", detail: `${suppliers.size} supplier/brand records detected`, time: "Live", severity: "success" },
  { id: "a3", title: "Product pending approval", detail: `${imageMissingProducts.length} products need image/catalog review`, time: "Live", severity: "warning" },
  { id: "a4", title: "Shipping issue reported", detail: "Shipping event table not connected yet", time: "Pending", severity: "info" },
  { id: "a5", title: "Vet consultation booked", detail: "Vet event table not connected yet", time: "Pending", severity: "info" },
  { id: "a6", title: "Payment received", detail: "Payment webhook table not connected yet", time: "Pending", severity: "info" }
];

export const pendingActions: PendingAction[] = [
  { title: "Approve Suppliers", count: 0, priority: "low", action: "Review onboarding" },
  { title: "Approve Products", count: imageMissingProducts.length, priority: imageMissingProducts.length ? "medium" : "low", action: "Fix catalog" },
  { title: "Resolve Shipping Issues", count: imageMissingProducts.length, priority: "medium", action: "Audit exceptions" },
  { title: "Send Inventory Reminders", count: outOfStockProducts.length, priority: outOfStockProducts.length ? "high" : "low", action: "Notify suppliers" },
  { title: "Assign Vet Cases", count: 0, priority: "low", action: "Open vet queue" },
  { title: "Review Refunds", count: 0, priority: "low", action: "Check payments" }
];

export const orderMetrics: StatusMetric[] = [
  { label: "New Orders", value: "0", detail: "Awaiting order events", status: "watch" },
  { label: "Supplier Confirmation Pending", value: "0", detail: "No live orders connected", status: "watch" },
  { label: "Processing", value: "0", detail: "No processing queue yet", status: "healthy" },
  { label: "Shipped", value: "0", detail: "Shipment table pending", status: "healthy" },
  { label: "Delivered", value: "0", detail: "Delivery events pending", status: "healthy" },
  { label: "Cancelled", value: "0", detail: "No cancellation table connected", status: "healthy" }
];

export const supplierMetrics: StatusMetric[] = [
  { label: "Active Suppliers", value: suppliers.size.toString(), detail: "Brand/supplier records from product catalog", status: "healthy" },
  { label: "Inactive Suppliers", value: "0", detail: "Supplier status table pending", status: "watch" },
  { label: "Low Performance Suppliers", value: "0", detail: "Performance events pending", status: "watch" },
  { label: "Suppliers Missing Shipping Setup", value: "0", detail: "Shipping setup table pending", status: "watch" },
  { label: "Suppliers Not Updating Inventory", value: outOfStockProducts.length.toString(), detail: "Using out-of-stock product count", status: outOfStockProducts.length ? "critical" : "healthy" }
];

export const inventoryMetrics: StatusMetric[] = [
  { label: "Low Stock", value: "0", detail: "Stock quantities not available in import", status: "watch" },
  { label: "Out of Stock", value: outOfStockProducts.length.toString(), detail: "Real imported stock status", status: outOfStockProducts.length ? "critical" : "healthy" },
  { label: "Expired Products", value: "0", detail: "Expiry table pending", status: "watch" },
  { label: "Inventory Not Updated", value: outOfStockProducts.length.toString(), detail: "Needs supplier verification", status: "watch" },
  { label: "Products Hidden Automatically", value: "0", detail: "Automation not enabled yet", status: "healthy" }
];

export const shippingMetrics: StatusMetric[] = [
  { label: "Failed Shipping Orders", value: "0", detail: "Shipping table pending", status: "watch" },
  { label: "High Shipping Cost Alerts", value: "0", detail: "Freight rules pending", status: "watch" },
  { label: "Non-serviceable Locations", value: "0", detail: "PIN code matrix pending", status: "watch" },
  { label: "Freight on Actual Pending", value: "0", detail: "B2B freight queue pending", status: "watch" }
];

export const vetMetrics: StatusMetric[] = [
  { label: "New Consultations", value: "0", detail: "Vet booking table pending", status: "watch" },
  { label: "Active Cases", value: "0", detail: "No active case data connected", status: "watch" },
  { label: "Pending Prescriptions", value: "0", detail: "Prescription table pending", status: "watch" },
  { label: "Completed Cases", value: "0", detail: "Completion events pending", status: "watch" },
  { label: "Vet Revenue", value: "Rs 0", detail: "Payment events pending", status: "watch" }
];

export const broadcastActions: BroadcastAction[] = [
  { label: "Send WhatsApp Reminder", audience: "Out-of-stock suppliers", count: outOfStockProducts.length.toString() },
  { label: "Send Email", audience: "Catalog suppliers", count: suppliers.size.toString() },
  { label: "Send SMS", audience: "Pending backend audience", count: "0" },
  { label: "Send Push Notification", audience: "App users pending", count: "0" }
];

export const quickActions = [
  "Approve Supplier",
  "Approve Product",
  "Send Inventory Reminder",
  "Resolve Shipping Issue",
  "Assign Vet",
  "Export Report"
];

export const healthTrend = healthMetrics.map((metric) => ({
  name: metric.label.replace(" Health", ""),
  score: metric.score
}));

function formatCompactINR(value: number) {
  if (value >= 10000000) {
    return `Rs ${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `Rs ${(value / 100000).toFixed(1)} L`;
  }

  return formatINR(value);
}
