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
const orderScore = 74;
const buyerScore = 81;
const vetScore = 78;
const paymentScore = 88;
const revenueScore = 84;
const ordersToday = Math.max(24, Math.round(validProducts.length / 5));
const revenueToday = Math.round(catalogValue * 0.018);
const activeBuyers = Math.max(120, Math.round(validProducts.length * 18));
const liveVisitors = Math.max(220, Math.round(validProducts.length * 24));

export const controlRoomKpis: ControlRoomKpi[] = [
  { id: "visitors", label: "Live Visitors", value: liveVisitors.toLocaleString("en-IN"), status: "healthy", helper: "Realtime web/app session model" },
  { id: "revenue", label: "Revenue Today", value: formatCompactINR(revenueToday), status: "healthy", helper: "GMV proxy from catalog velocity" },
  { id: "orders-today", label: "Orders Today", value: ordersToday.toLocaleString("en-IN"), status: "healthy", helper: "Order event queue projection" },
  { id: "active-buyers", label: "Active Buyers", value: activeBuyers.toLocaleString("en-IN"), status: "healthy", helper: "Buyer activity cohort" },
  { id: "active-suppliers", label: "Active Suppliers", value: suppliers.size.toLocaleString("en-IN"), status: "healthy", helper: "Supplier/brand records mapped" },
  { id: "products-live", label: "Products Live", value: inStockProducts.length.toLocaleString("en-IN"), status: "healthy", helper: "Real imported in-stock products" },
  { id: "pending-approvals", label: "Pending Approvals", value: imageMissingProducts.length.toString(), status: imageMissingProducts.length ? "watch" : "healthy", helper: "Products needing image/catalog review" },
  { id: "shipping-issues", label: "Shipping Issues", value: "12", status: "watch", helper: "Failed delivery and freight exceptions" },
  { id: "vet-cases", label: "Vet Cases", value: "18", status: "watch", helper: "New and active consultation queue" },
  { id: "inventory-alerts", label: "Inventory Alerts", value: outOfStockProducts.length.toString(), status: outOfStockProducts.length ? "critical" : "healthy", helper: "Out-of-stock imported products" },
  { id: "platform-health", label: "Platform Health %", value: "84%", status: "healthy", helper: "Marketplace health score average" }
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
  { label: "Order Health", score: orderScore, detail: `${ordersToday.toLocaleString("en-IN")} orders projected today` },
  { label: "Buyer Health", score: buyerScore, detail: `${activeBuyers.toLocaleString("en-IN")} active buyer signal model` },
  { label: "Vet Services Health", score: vetScore, detail: "Consultation queue and prescription workflow ready" },
  { label: "Payment Health", score: paymentScore, detail: "Payment gateway and settlement monitor ready" },
  { label: "Revenue Health", score: revenueScore, detail: `${formatCompactINR(revenueToday)} projected today` }
];

export const platformScore = Math.round(
  healthMetrics.reduce((sum, metric) => sum + metric.score, 0) / healthMetrics.length
);

export const realTimeActivities: ActivityEvent[] = [
  { id: "a1", title: "New Supplier Registered", detail: "Pashu Care Distributors submitted KYC and GST", time: "2m", severity: "success" },
  { id: "a2", title: "Product Submitted", detail: `${imageMissingProducts.length} products need catalog approval`, time: "5m", severity: "warning" },
  { id: "a3", title: "Order Placed", detail: "Bulk cattle feed order requires supplier confirmation", time: "8m", severity: "success" },
  { id: "a4", title: "Buyer Registered", detail: "New dairy farm buyer joined from Haryana", time: "12m", severity: "info" },
  { id: "a5", title: "Vet Consultation Booked", detail: "Poultry respiratory case assigned to emergency queue", time: "14m", severity: "warning" },
  { id: "a6", title: "Inventory Alert", detail: `${outOfStockProducts.length} products need supplier stock update`, time: "Live", severity: outOfStockProducts.length ? "critical" : "success" },
  { id: "a7", title: "Shipping Issue", detail: "Freight quote pending for heavy feed order", time: "18m", severity: "warning" },
  { id: "a8", title: "Payment Received", detail: `${formatCompactINR(Math.round(revenueToday * 0.08))} captured via UPI`, time: "22m", severity: "success" }
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
  { label: "New Orders", value: "38", detail: "Fresh buyer checkout events", status: "healthy" },
  { label: "Supplier Confirmation Pending", value: "14", detail: "Awaiting supplier accept/reject", status: "watch" },
  { label: "Packed", value: "22", detail: "Ready for pickup or dispatch", status: "healthy" },
  { label: "Shipped", value: "46", detail: "In transit orders", status: "healthy" },
  { label: "Delivered", value: "128", detail: "Delivered today and yesterday", status: "healthy" },
  { label: "Cancelled", value: "6", detail: "Stock/shipping cancellation watch", status: "watch" },
  { label: "Refund Requested", value: "3", detail: "Refund queue requiring review", status: "watch" }
];

export const supplierMetrics: StatusMetric[] = [
  { label: "Pending Approval", value: "7", detail: "KYC, GST and bank review", status: "watch" },
  { label: "Verified Suppliers", value: suppliers.size.toString(), detail: "Brand/supplier records from catalog", status: "healthy" },
  { label: "Suppliers Missing Shipping", value: "11", detail: "Shipping rule setup incomplete", status: "watch" },
  { label: "Suppliers Missing Inventory Update", value: outOfStockProducts.length.toString(), detail: "Stock freshness risk", status: outOfStockProducts.length ? "critical" : "healthy" },
  { label: "Low Performance Suppliers", value: "4", detail: "Response or dispatch SLA below target", status: "watch" },
  { label: "Top Suppliers", value: "12", detail: "High GMV and healthy operations", status: "healthy" }
];

export const inventoryMetrics: StatusMetric[] = [
  { label: "Low Stock", value: "18", detail: "Below reorder threshold", status: "watch" },
  { label: "Out of Stock", value: outOfStockProducts.length.toString(), detail: "Real imported stock status", status: outOfStockProducts.length ? "critical" : "healthy" },
  { label: "Expired Products", value: "5", detail: "Expiry review required", status: "critical" },
  { label: "Products Not Updated", value: outOfStockProducts.length.toString(), detail: "Needs supplier verification", status: "watch" },
  { label: "Inventory Accuracy Score", value: `${inventoryScore}%`, detail: "Real catalog stock health", status: inventoryScore > 80 ? "healthy" : "watch" }
];

export const shippingMetrics: StatusMetric[] = [
  { label: "Failed Deliveries", value: "9", detail: "Courier and buyer location issues", status: "critical" },
  { label: "High Shipping Charges", value: "14", detail: "Freight cost above threshold", status: "watch" },
  { label: "Freight On Actual Orders", value: "21", detail: "Supplier freight quote pending", status: "watch" },
  { label: "Blocked Pincodes", value: "84", detail: "Non-serviceable pin matrix", status: "watch" },
  { label: "Non-Serviceable Locations", value: "17", detail: "Buyer checkout blockers", status: "critical" }
];

export const vetMetrics: StatusMetric[] = [
  { label: "New Consultations", value: "18", detail: "Booked today", status: "healthy" },
  { label: "Pending Cases", value: "7", detail: "Needs vet assignment", status: "watch" },
  { label: "Completed Cases", value: "64", detail: "Closed this week", status: "healthy" },
  { label: "Top Vets", value: "9", detail: "Rated 4.8+ by buyers", status: "healthy" },
  { label: "Vet Revenue", value: formatCompactINR(184000), detail: "Monthly vet GMV", status: "healthy" }
];

export const broadcastActions: BroadcastAction[] = [
  { label: "Send WhatsApp Reminder", audience: "Out-of-stock suppliers", count: outOfStockProducts.length.toString() },
  { label: "Send Email", audience: "Catalog suppliers", count: suppliers.size.toString() },
  { label: "Send SMS", audience: "Buyers with active orders", count: activeBuyers.toString() },
  { label: "Send Push Notification", audience: "App users online", count: liveVisitors.toString() }
];

export const quickActions = [
  "Approve Supplier",
  "Approve Product",
  "Suspend Supplier",
  "Send Inventory Reminder",
  "Send Shipping Reminder",
  "Assign Vet",
  "Create Banner",
  "Create Coupon",
  "Export Reports"
];

export const liveUsers: StatusMetric[] = [
  { label: "Visitors Online", value: liveVisitors.toLocaleString("en-IN"), detail: "Web and app sessions", status: "healthy" },
  { label: "Buyers Online", value: Math.round(liveVisitors * 0.48).toString(), detail: "Browsing products and orders", status: "healthy" },
  { label: "Suppliers Online", value: Math.round(suppliers.size * 0.42).toString(), detail: "Seller OS active sessions", status: "healthy" },
  { label: "Vets Online", value: "18", detail: "Available for consultation", status: "healthy" }
];

export const buyerMetrics: StatusMetric[] = [
  { label: "New Buyers", value: "96", detail: "Registered in last 24 hours", status: "healthy" },
  { label: "Repeat Buyers", value: "41%", detail: "Repeat purchase cohort", status: "healthy" },
  { label: "Bulk Buyers", value: "128", detail: "B2B quote and high MOQ buyers", status: "healthy" },
  { label: "Inactive Buyers", value: "320", detail: "Needs reactivation campaign", status: "watch" },
  { label: "Top Locations", value: "HR, RJ, DL", detail: "Haryana, Rajasthan, Delhi NCR", status: "healthy" }
];

export const productMetrics: StatusMetric[] = [
  { label: "Pending Approval", value: imageMissingProducts.length.toString(), detail: "Catalog quality queue", status: imageMissingProducts.length ? "watch" : "healthy" },
  { label: "Rejected Products", value: "9", detail: "Compliance or image issues", status: "watch" },
  { label: "Out Of Stock", value: outOfStockProducts.length.toString(), detail: "Real imported stock status", status: outOfStockProducts.length ? "critical" : "healthy" },
  { label: "Low Stock", value: "18", detail: "Supplier stock update needed", status: "watch" },
  { label: "Products Missing Shipping", value: "23", detail: "Cannot go live until configured", status: "critical" },
  { label: "Top Selling Products", value: "42", detail: "GMV velocity leaders", status: "healthy" }
];

export const b2bLeadMetrics: StatusMetric[] = [
  { label: "Leads Generated", value: "84", detail: "Bulk quote requests", status: "healthy" },
  { label: "Supplier Responses", value: "62", detail: "Quotes sent by suppliers", status: "healthy" },
  { label: "Converted Leads", value: "19", detail: "Moved into orders", status: "healthy" },
  { label: "Lead Revenue", value: formatCompactINR(1260000), detail: "B2B order value", status: "healthy" },
  { label: "Lead Conversion Rate", value: "22.6%", detail: "Quote-to-order conversion", status: "healthy" }
];

export const notificationMetrics: StatusMetric[] = [
  { label: "WhatsApp", value: "1,284", detail: "Supplier and buyer reminders", status: "healthy" },
  { label: "SMS", value: "842", detail: "Order and OTP messages", status: "healthy" },
  { label: "Email", value: "2,140", detail: "Reports and invoices", status: "healthy" },
  { label: "Push Notifications", value: "6,820", detail: "App campaigns ready", status: "healthy" },
  { label: "Recent Notifications", value: "47", detail: "Sent in last hour", status: "healthy" }
];

export const emergencyAlerts: ActivityEvent[] = [
  { id: "e1", title: "Payment Gateway Down", detail: "Razorpay latency crossed threshold", time: "Watch", severity: "warning" },
  { id: "e2", title: "Inventory Sync Failed", detail: "Supplier CSV import retry required", time: "Critical", severity: "critical" },
  { id: "e3", title: "Supplier Complaints", detail: "4 unresolved buyer complaints", time: "High", severity: "warning" },
  { id: "e4", title: "Shipping Service Failure", detail: "Courier API returned failed delivery spike", time: "Critical", severity: "critical" },
  { id: "e5", title: "High Cancellation Rate", detail: "Stock mismatch cancellations increased", time: "Watch", severity: "warning" },
  { id: "e6", title: "Revenue Drop", detail: "GMV velocity 8% below morning forecast", time: "Watch", severity: "warning" }
];

export const rightPanelMetrics: StatusMetric[] = [
  { label: "Today's Revenue", value: formatCompactINR(revenueToday), detail: "Projected live GMV", status: "healthy" },
  { label: "Today's Orders", value: ordersToday.toString(), detail: "New checkout events", status: "healthy" },
  { label: "Visitors Online", value: liveVisitors.toLocaleString("en-IN"), detail: "Realtime session load", status: "healthy" },
  { label: "Critical Alerts", value: "2", detail: "Needs founder attention", status: "critical" },
  { label: "Pending Actions", value: (imageMissingProducts.length + outOfStockProducts.length).toString(), detail: "Catalog, stock and approvals", status: "watch" },
  { label: "Platform Uptime", value: "99.97%", detail: "Ops monitor", status: "healthy" }
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
