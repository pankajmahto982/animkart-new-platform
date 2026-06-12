import { products } from "@/lib/products";

export type InventoryStatus =
  | "In Stock"
  | "Low Stock"
  | "Out Of Stock"
  | "Confirm Availability"
  | "Seasonal Product"
  | "Bulk Order Only"
  | "Made To Order";

export type InventoryItem = {
  productImage: string;
  productName: string;
  sku: string;
  category: string;
  currentStock: number;
  reservedStock: number;
  availableStock: number;
  moq: number;
  lastUpdated: string;
  inventoryStatus: InventoryStatus;
  batchNumber: string;
  manufacturingDate: string;
  expiryDate: string;
  expiryAlert: "Healthy" | "Near Expiry" | "Expired";
  priceMismatch: boolean;
  shippingMissing: boolean;
};

export type InventoryKpi = {
  label: string;
  value: string;
  helper: string;
  tone: "healthy" | "watch" | "critical";
};

const seedProducts = products.filter((product) => product.price > 0).slice(0, 16);

export const inventoryItems: InventoryItem[] = seedProducts.map((product, index) => {
  const statuses: InventoryStatus[] = [
    "In Stock",
    "Low Stock",
    "Out Of Stock",
    "Confirm Availability",
    "Bulk Order Only",
    "Seasonal Product",
    "Made To Order"
  ];
  const currentStock = product.inStock ? [84, 42, 18, 9, 0, 125, 6, 240][index % 8] : 0;
  const reservedStock = currentStock ? [2, 5, 8, 1, 0, 12, 3, 18][index % 8] : 0;
  const moq = [1, 2, 5, 10, 25][index % 5];
  const availableStock = Math.max(currentStock - reservedStock, 0);
  const status = currentStock === 0 ? "Out Of Stock" : availableStock <= moq ? "Low Stock" : statuses[index % statuses.length];

  return {
    productImage: product.image,
    productName: product.name,
    sku: product.sku || product.id,
    category: product.category,
    currentStock,
    reservedStock,
    availableStock,
    moq,
    lastUpdated: [`Today, 10:30`, `Yesterday, 18:10`, `7 days ago`, `15 days ago`, `30 days ago`][index % 5],
    inventoryStatus: status,
    batchNumber: `BATCH-${2026}${String(index + 11).padStart(3, "0")}`,
    manufacturingDate: ["Jan 2026", "Feb 2026", "Mar 2026", "Apr 2026"][index % 4],
    expiryDate: ["Dec 2026", "Sep 2026", "Jul 2026", "Expired Jun 2026"][index % 4],
    expiryAlert: index % 9 === 0 ? "Expired" : index % 4 === 2 ? "Near Expiry" : "Healthy",
    priceMismatch: index % 6 === 0,
    shippingMissing: index % 5 === 0
  };
});

const inStock = inventoryItems.filter((item) => item.inventoryStatus === "In Stock");
const lowStock = inventoryItems.filter((item) => item.inventoryStatus === "Low Stock");
const outOfStock = inventoryItems.filter((item) => item.inventoryStatus === "Out Of Stock");
const notUpdated = inventoryItems.filter((item) => ["15 days ago", "30 days ago"].includes(item.lastUpdated));
const alerts = inventoryItems.filter(
  (item) =>
    item.inventoryStatus === "Low Stock" ||
    item.inventoryStatus === "Out Of Stock" ||
    item.expiryAlert !== "Healthy" ||
    item.priceMismatch ||
    item.shippingMissing
);

export const inventoryHealthScore = Math.max(
  48,
  Math.round(
    ((inventoryItems.length - outOfStock.length) / inventoryItems.length) * 35 +
      ((inventoryItems.length - notUpdated.length) / inventoryItems.length) * 25 +
      ((inventoryItems.length - alerts.length) / inventoryItems.length) * 25 +
      12
  )
);

export const inventoryKpis: InventoryKpi[] = [
  metric("Total SKUs", inventoryItems.length.toString(), "Products in supplier inventory", "healthy"),
  metric("In Stock Products", inStock.length.toString(), "Ready for orders", "healthy"),
  metric("Low Stock Products", lowStock.length.toString(), "Below operating threshold", lowStock.length ? "watch" : "healthy"),
  metric("Out Of Stock Products", outOfStock.length.toString(), "Hidden or update required", outOfStock.length ? "critical" : "healthy"),
  metric("Inventory Health Score", `${inventoryHealthScore}%`, scoreLabel(inventoryHealthScore), inventoryHealthScore >= 80 ? "healthy" : inventoryHealthScore >= 60 ? "watch" : "critical"),
  metric("Stock Accuracy Score", "92%", "Based on fulfillment and cancellations", "healthy"),
  metric("Products Not Updated", notUpdated.length.toString(), "15+ day verification queue", notUpdated.length ? "watch" : "healthy"),
  metric("Inventory Alerts", alerts.length.toString(), "Stock, expiry, price and shipping", alerts.length ? "critical" : "healthy")
];

export const inventoryStatusTabs = [
  "All Products",
  "In Stock",
  "Low Stock",
  "Out Of Stock",
  "Confirm Availability",
  "Bulk Order Only",
  "Seasonal Products",
  "Made To Order"
];

export const inventoryAlerts = [
  { title: "Stock Below MOQ", count: lowStock.length.toString(), detail: "Available stock is below MOQ", tone: lowStock.length ? "watch" : "healthy" },
  { title: "Out Of Stock", count: outOfStock.length.toString(), detail: "Update stock or hide product", tone: outOfStock.length ? "critical" : "healthy" },
  { title: "Inventory Not Updated", count: notUpdated.length.toString(), detail: "Supplier verification overdue", tone: notUpdated.length ? "watch" : "healthy" },
  { title: "Expired Products", count: inventoryItems.filter((item) => item.expiryAlert === "Expired").length.toString(), detail: "Remove or replace batch", tone: "critical" },
  { title: "Price Mismatch", count: inventoryItems.filter((item) => item.priceMismatch).length.toString(), detail: "Catalog and seller price mismatch", tone: "watch" },
  { title: "Shipping Missing", count: inventoryItems.filter((item) => item.shippingMissing).length.toString(), detail: "Configure shipping before live", tone: "critical" }
] satisfies Array<{ title: string; count: string; detail: string; tone: InventoryKpi["tone"] }>;

export const expiryRows = inventoryItems.slice(0, 6).map((item) => ({
  product: item.productName,
  batchNumber: item.batchNumber,
  manufacturingDate: item.manufacturingDate,
  expiryDate: item.expiryDate,
  alert: item.expiryAlert
}));

export const reminderRules = [
  { day: "7 Days", action: "Update Inventory", detail: "Supplier receives dashboard reminder" },
  { day: "15 Days", action: "Inventory Verification Required", detail: "Email and WhatsApp verification required" },
  { day: "30 Days", action: "Reduce Product Visibility", detail: "Product ranking reduced in search and store" },
  { day: "45 Days", action: "Hide Product", detail: "Product hidden until inventory update" },
  { day: "60 Days", action: "Supplier Inventory Inactive", detail: "Supplier enters inventory inactive state" }
];

export const notificationChannels = [
  { channel: "Dashboard", status: "Active", detail: "In-app inventory alerts" },
  { channel: "Email", status: "Ready", detail: "Supplier verification emails" },
  { channel: "WhatsApp", status: "Ready", detail: "Stock update reminders" },
  { channel: "SMS", status: "Ready", detail: "Critical low-stock alerts" }
];

export const inventoryAnalytics = [
  { label: "Fast Moving Products", value: "18", helper: "Highest order velocity" },
  { label: "Slow Moving Products", value: "9", helper: "No recent stock movement" },
  { label: "Most Viewed Products", value: "42", helper: "High buyer interest" },
  { label: "Most Ordered Products", value: "12", helper: "Repeat purchase demand" },
  { label: "Stock Turnover Ratio", value: "3.8x", helper: "Monthly movement proxy" }
];

export const selectedInventoryItem = inventoryItems[2] ?? inventoryItems[0];

function metric(label: string, value: string, helper: string, tone: InventoryKpi["tone"]): InventoryKpi {
  return { label, value, helper, tone };
}

function scoreLabel(score: number) {
  if (score >= 95) return "Excellent";
  if (score >= 80) return "Good";
  if (score >= 60) return "Warning";
  return "Critical";
}
