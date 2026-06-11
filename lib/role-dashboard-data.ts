import { formatINR, getFeaturedProducts, products } from "@/lib/products";

export type RoleKpi = {
  label: string;
  value: string;
  helper: string;
  status: "healthy" | "watch" | "critical";
};

export type TableColumn = {
  key: string;
  label: string;
};

export type TableRow = Record<string, string | number>;

export type ActivityItem = {
  title: string;
  detail: string;
  time: string;
  status: "success" | "info" | "warning" | "critical";
};

export type PanelMetric = {
  label: string;
  value: string;
  detail: string;
  status: "healthy" | "watch" | "critical";
};

export type ChartDatum = {
  label: string;
  value: number;
  secondary?: number;
};

export type QuickAction = {
  label: string;
  href: string;
};

export type ShippingRule = {
  type: string;
  example: string;
  priority: number;
  status: "Configured" | "Pending";
};

const validProducts = products.filter((product) => product.price > 0);
const inStockProducts = validProducts.filter((product) => product.inStock);
const outOfStockProducts = validProducts.filter((product) => !product.inStock);
const imageMissingProducts = validProducts.filter((product) => !product.image);
const categories = groupBy(validProducts, (product) => product.category || "Uncategorized");
const suppliers = groupBy(validProducts, (product) => product.brand || "AnimKart Verified");
const supplierEntries = [...suppliers.entries()].sort((a, b) => b[1].length - a[1].length);
const primarySupplierName = supplierEntries[0]?.[0] ?? "AnimKart Verified";
const primarySupplierProducts = supplierEntries[0]?.[1] ?? validProducts.slice(0, 24);
const buyerProducts = getFeaturedProducts(8);
const catalogValue = sumPrice(validProducts);
const supplierCatalogValue = sumPrice(primarySupplierProducts);
const inventoryScore = validProducts.length ? Math.round((inStockProducts.length / validProducts.length) * 100) : 0;
const supplierInventoryScore = primarySupplierProducts.length
  ? Math.round((primarySupplierProducts.filter((product) => product.inStock).length / primarySupplierProducts.length) * 100)
  : 0;

export const adminQuickActions: QuickAction[] = [
  { label: "Approve Supplier", href: "#supplier-approval" },
  { label: "Approve Product", href: "#product-approval" },
  { label: "Suspend Supplier", href: "#supplier-performance" },
  { label: "Send Inventory Reminder", href: "#inventory" },
  { label: "Send Shipping Reminder", href: "#shipping" },
  { label: "Assign Vet", href: "#vet" },
  { label: "Create Banner", href: "#cms" },
  { label: "Export Report", href: "#reports" }
];

export const supplierQuickActions: QuickAction[] = [
  { label: "Add Product", href: "#products" },
  { label: "Bulk Upload", href: "#bulk-upload" },
  { label: "Update Inventory", href: "#inventory" },
  { label: "Configure Shipping", href: "#shipping" },
  { label: "Accept Order", href: "#orders" },
  { label: "Reject Order", href: "#orders" },
  { label: "Download Invoice", href: "#payments" },
  { label: "View Payments", href: "#payments" }
];

export const buyerQuickActions: QuickAction[] = [
  { label: "Reorder Products", href: "#reorder" },
  { label: "Track Orders", href: "#orders" },
  { label: "Download GST Invoice", href: "#invoices" },
  { label: "Save Supplier", href: "#saved-suppliers" },
  { label: "Contact Supplier", href: "#support" },
  { label: "Book Vet Consultation", href: "#vet" },
  { label: "Request Bulk Quote", href: "#b2b" },
  { label: "Manage Addresses", href: "#addresses" },
  { label: "Manage Payments", href: "#payments" }
];

export const adminKpis: RoleKpi[] = [
  { label: "Live Visitors", value: "0", helper: "Realtime sessions pending", status: "watch" },
  { label: "Total Buyers", value: "0", helper: "Supabase auth profiles pending", status: "watch" },
  { label: "Active Suppliers", value: suppliers.size.toLocaleString("en-IN"), helper: "Real brand/supplier records", status: "healthy" },
  { label: "Pending Suppliers", value: "0", helper: "Supplier approval table pending", status: "healthy" },
  { label: "Products Live", value: inStockProducts.length.toLocaleString("en-IN"), helper: "Real in-stock catalog products", status: "healthy" },
  { label: "Pending Product Approval", value: imageMissingProducts.length.toString(), helper: "Products needing image review", status: imageMissingProducts.length ? "watch" : "healthy" },
  { label: "Orders Today", value: "0", helper: "Orders table pending", status: "watch" },
  { label: "Revenue Today", value: "Rs 0", helper: `Catalog base ${formatCompactINR(catalogValue)}`, status: "watch" },
  { label: "Shipping Issues", value: imageMissingProducts.length.toString(), helper: "Catalog exceptions until shipping events", status: imageMissingProducts.length ? "watch" : "healthy" },
  { label: "Inventory Alerts", value: outOfStockProducts.length.toString(), helper: "Real out-of-stock products", status: outOfStockProducts.length ? "critical" : "healthy" },
  { label: "Vet Consultations", value: "0", helper: "Vet case table pending", status: "watch" },
  { label: "Support Tickets", value: "0", helper: "Support table pending", status: "healthy" }
];

export const supplierKpis: RoleKpi[] = [
  { label: "Total Sales", value: "Rs 0", helper: `Catalog base ${formatCompactINR(supplierCatalogValue)}`, status: "watch" },
  { label: "Orders", value: "0", helper: "Order table pending", status: "watch" },
  { label: "Live Products", value: primarySupplierProducts.filter((product) => product.inStock).length.toString(), helper: `${supplierInventoryScore}% inventory score`, status: "healthy" },
  { label: "Pending Products", value: primarySupplierProducts.filter((product) => !product.image).length.toString(), helper: "Image/catalog review", status: "watch" },
  { label: "Low Stock", value: "0", helper: "Stock quantity table pending", status: "watch" },
  { label: "Inventory Score", value: `${supplierInventoryScore}%`, helper: primarySupplierName, status: "healthy" },
  { label: "Shipping Setup", value: "Pending", helper: "Configure state/city/pincode/slab rules", status: "watch" },
  { label: "Pending Payments", value: "Rs 0", helper: "Settlement table pending", status: "watch" },
  { label: "Store Rating", value: "Pending", helper: "Reviews table pending", status: "watch" }
];

export const buyerKpis: RoleKpi[] = [
  { label: "Total Orders", value: "0", helper: "Order history pending", status: "watch" },
  { label: "Active Orders", value: "0", helper: "Order events pending", status: "watch" },
  { label: "Delivered Orders", value: "0", helper: "Delivery events pending", status: "watch" },
  { label: "Wishlist Items", value: buyerProducts.length.toString(), helper: "Real catalog wishlist demo", status: "healthy" },
  { label: "Saved Suppliers", value: Math.min(suppliers.size, 6).toString(), helper: "Derived from catalog brands", status: "healthy" },
  { label: "Vet Consultations", value: "0", helper: "Vet booking table pending", status: "watch" },
  { label: "Pending Support Tickets", value: "0", helper: "Support table pending", status: "healthy" }
];

export const revenueChartData: ChartDatum[] = topCategoryEntries(7).map(([category, items]) => ({
  label: shortLabel(category),
  value: Math.round(sumPrice(items) / 100000),
  secondary: items.length
}));

export const visitorChartData: ChartDatum[] = [
  { label: "Catalog", value: validProducts.length },
  { label: "Images", value: validProducts.length - imageMissingProducts.length },
  { label: "In stock", value: inStockProducts.length },
  { label: "Suppliers", value: suppliers.size }
];

export const supplierChartData: ChartDatum[] = primarySupplierProducts.slice(0, 8).map((product) => ({
  label: shortLabel(product.category || product.name),
  value: product.price
}));

export const buyerChartData: ChartDatum[] = buyerProducts.map((product) => ({
  label: shortLabel(product.category),
  value: product.price
}));

export const supplierPerformanceRows: TableRow[] = supplierEntries.slice(0, 8).map(([supplier, items]) => {
  const stockScore = items.length ? Math.round((items.filter((product) => product.inStock).length / items.length) * 100) : 0;

  return {
    supplier,
    products: items.length,
    catalogValue: formatCompactINR(sumPrice(items)),
    inventoryScore: `${stockScore}%`,
    shippingSetup: "Pending",
    settlement: "Rs 0",
    action: stockScore < 80 ? "Send reminder" : "Monitor"
  };
});

export const buyerActivityRows: TableRow[] = buyerProducts.slice(0, 6).map((product, index) => ({
  buyer: `Buyer cohort ${index + 1}`,
  interest: product.category,
  product: product.name,
  cartValue: formatINR(product.price),
  vetNeed: index % 2 === 0 ? "Possible" : "No",
  status: "Event pending"
}));

export const productApprovalRows: TableRow[] = (imageMissingProducts.length ? imageMissingProducts : validProducts)
  .slice(0, 8)
  .map((product) => ({
    product: product.name,
    supplier: product.brand || "AnimKart Verified",
    category: product.category,
    issue: product.image ? "Review listing" : "Missing image",
    price: formatINR(product.price),
    action: "Approve / fix"
  }));

export const supplierProductRows: TableRow[] = primarySupplierProducts.slice(0, 8).map((product) => ({
  product: product.name,
  category: product.category,
  price: formatINR(product.price),
  stock: product.inStock ? "In stock" : "Out of stock",
  image: product.image ? "Ready" : "Missing",
  action: product.inStock ? "Monitor" : "Update stock"
}));

export const supplierProductManagementRows: TableRow[] = primarySupplierProducts.slice(0, 8).map((product) => ({
  sku: product.sku || product.id,
  product: product.name,
  approval: product.image ? "Ready for live" : "Image required",
  moq: "1 unit",
  expiry: "Needs batch data",
  categoryMap: product.category,
  action: "Edit / price / stock"
}));

export const supplierShippingRules: ShippingRule[] = [
  { type: "Product-wise rule", example: "Medicine standard, feed heavy, equipment freight", priority: 1, status: "Pending" },
  { type: "Pincode rule", example: "110001 Rs60, 110025 Rs90, 302001 Rs150", priority: 2, status: "Pending" },
  { type: "City rule", example: "Delhi NCR Rs100, Jaipur Rs150, Lucknow Rs180", priority: 3, status: "Pending" },
  { type: "State rule", example: "Delhi Rs80, Haryana Rs120, Rajasthan Rs180", priority: 4, status: "Pending" },
  { type: "Weight slab", example: "0-1kg Rs60, 1-5kg Rs120, 5-10kg Rs250", priority: 5, status: "Pending" },
  { type: "Default rule", example: "Below Rs1,000 Rs100, above Rs5,000 free", priority: 6, status: "Pending" },
  { type: "Freight on Actual", example: "Shipping confirmed after order for heavy/bulk orders", priority: 7, status: "Pending" },
  { type: "Buyer Pickup", example: "Allow pickup from supplier warehouse", priority: 8, status: "Pending" },
  { type: "Blocked locations", example: "Block states, cities or pincodes", priority: 9, status: "Pending" }
];

export const buyerProductRows: TableRow[] = buyerProducts.map((product) => ({
  product: product.name,
  category: product.category,
  supplier: product.brand || "AnimKart Verified",
  price: formatINR(product.price),
  stock: product.inStock ? "Available" : "Check stock",
  action: "Reorder"
}));

export const buyerOrderRows: TableRow[] = buyerProducts.slice(0, 5).map((product, index) => ({
  orderId: `AK-BUY-${String(index + 1).padStart(4, "0")}`,
  product: product.name,
  supplier: product.brand || "AnimKart Verified",
  status: "Order data pending",
  shipping: index % 3 === 0 ? "Freight on Actual" : index % 3 === 1 ? "Shipping available" : "Request quote",
  invoice: "GST invoice pending"
}));

export const savedSupplierRows: TableRow[] = supplierEntries.slice(0, 6).map(([supplier, items]) => ({
  supplier,
  products: items.length,
  category: items[0]?.category || "Animal Health",
  shipping: "Setup pending",
  action: "Contact supplier"
}));

export const buyerSupportRows: TableRow[] = [
  { ticket: "SUP-001", topic: "Delivery not available to this pincode", status: "Ready for support table", action: "Request quote instead" },
  { ticket: "SUP-002", topic: "Freight on Actual confirmation", status: "Pending workflow", action: "Contact supplier" },
  { ticket: "SUP-003", topic: "GST invoice download", status: "Invoice table pending", action: "Download GST invoice" }
];

export const adminActivityFeed: ActivityItem[] = [
  { title: "Catalog imported", detail: `${validProducts.length} real AnimKart products loaded`, time: "Live", status: "success" },
  { title: "Inventory alert", detail: `${outOfStockProducts.length} products are out of stock`, time: "Live", status: outOfStockProducts.length ? "critical" : "success" },
  { title: "Product approval queue", detail: `${imageMissingProducts.length} products need image/catalog review`, time: "Live", status: imageMissingProducts.length ? "warning" : "success" },
  { title: "Order events", detail: "Orders table not connected yet", time: "Pending", status: "info" },
  { title: "Vet cases", detail: "Vet consultation table not connected yet", time: "Pending", status: "info" }
];

export const supplierActivityFeed: ActivityItem[] = [
  { title: "Supplier catalog loaded", detail: `${primarySupplierProducts.length} products mapped to ${primarySupplierName}`, time: "Live", status: "success" },
  { title: "Inventory score calculated", detail: `${supplierInventoryScore}% of supplier products are in stock`, time: "Live", status: "success" },
  { title: "Shipping setup", detail: "Shipping rules table not connected yet", time: "Pending", status: "warning" },
  { title: "Order confirmations", detail: "Supplier order queue pending Supabase table", time: "Pending", status: "info" }
];

export const buyerActivityFeed: ActivityItem[] = [
  { title: "Recommendations ready", detail: `${buyerProducts.length} products selected from real catalog`, time: "Live", status: "success" },
  { title: "Order history", detail: "Buyer order table not connected yet", time: "Pending", status: "info" },
  { title: "Vet consultation", detail: "Booking table not connected yet", time: "Pending", status: "info" },
  { title: "Bulk quote", detail: "B2B lead table ready for Supabase", time: "Pending", status: "warning" }
];

export const adminPanels = {
  orders: [
    metric("New Orders", "0", "Orders table pending", "watch"),
    metric("Supplier Confirmation Pending", "0", "No stuck order data yet", "watch"),
    metric("Processing", "0", "Processing queue pending", "watch"),
    metric("Shipped", "0", "Shipping table pending", "watch"),
    metric("Delivered", "0", "Delivery events pending", "watch"),
    metric("Cancelled", "0", "Cancellation events pending", "watch")
  ],
  inventory: [
    metric("Inventory Score", `${inventoryScore}%`, "Real in-stock catalog ratio", "healthy"),
    metric("Out of Stock", outOfStockProducts.length.toString(), "Real stock status from import", outOfStockProducts.length ? "critical" : "healthy"),
    metric("Missing Images", imageMissingProducts.length.toString(), "Product approval issue", imageMissingProducts.length ? "watch" : "healthy"),
    metric("Suppliers Not Updating Inventory", outOfStockProducts.length.toString(), "Use as reminder queue", outOfStockProducts.length ? "critical" : "healthy")
  ],
  shipping: [
    metric("Failed Shipping Orders", "0", "Shipping event table pending", "watch"),
    metric("Supplier Shipping Setup Missing", "0", "Setup table pending", "watch"),
    metric("Non-serviceable Locations", "0", "PIN matrix pending", "watch"),
    metric("Freight on Actual Pending", "0", "B2B freight table pending", "watch")
  ],
  vet: [
    metric("Pending Assignment", "0", "Vet table pending", "watch"),
    metric("Active Cases", "0", "No live cases connected", "watch"),
    metric("Completed Cases", "0", "Completion events pending", "watch"),
    metric("Vet Revenue", "Rs 0", "Payment events pending", "watch")
  ],
  payments: [
    metric("Payments Captured", "Rs 0", "Payment webhook pending", "watch"),
    metric("Settlements Pending", "Rs 0", "Settlement table pending", "watch"),
    metric("Refund Review", "0", "Refund table pending", "healthy"),
    metric("Platform Commission", "Rs 0", "Commission events pending", "watch")
  ]
};

export const supplierPanels = {
  orders: [
    metric("New Orders", "0", "Supplier order queue pending", "watch"),
    metric("Confirmation Pending", "0", "No live order records", "watch"),
    metric("Ready to Ship", "0", "Shipping events pending", "watch"),
    metric("Returns", "0", "Return table pending", "healthy")
  ],
  inventory: [
    metric("Live SKUs", primarySupplierProducts.filter((product) => product.inStock).length.toString(), "Real in-stock products", "healthy"),
    metric("Out of Stock", primarySupplierProducts.filter((product) => !product.inStock).length.toString(), "Real supplier stock status", primarySupplierProducts.some((product) => !product.inStock) ? "critical" : "healthy"),
    metric("Low Stock", "0", "Stock quantity table pending", "watch"),
    metric("Confirm Availability", "Required", "Supplier should confirm availability regularly", "watch"),
    metric("Bulk Order Only", "Ready", "Can be marked per product after table setup", "healthy"),
    metric("Seasonal Product", "Ready", "Seasonal flags can plug into Supabase", "healthy"),
    metric("Made to Order", "Ready", "Made-to-order status supported", "healthy"),
    metric("Missing Images", primarySupplierProducts.filter((product) => !product.image).length.toString(), "Catalog cleanup queue", "watch"),
    metric("Inventory Score", `${supplierInventoryScore}%`, "Real supplier catalog score", "healthy")
  ],
  shipping: [
    metric("Shipping Required", "Yes", "Product cannot go live unless configured or Freight on Actual", "critical"),
    metric("Freight on Actual", "Available", "For heavy or bulk orders", "healthy"),
    metric("Buyer Pickup", "Available", "Warehouse pickup option supported", "healthy"),
    metric("Blocked Locations", "Ready", "Block states, cities or pincodes", "watch")
  ],
  settlements: [
    metric("Settlement Due", "Rs 0", "Settlement table pending", "watch"),
    metric("Invoices", "0", "Invoice records pending", "watch"),
    metric("Deductions", "Rs 0", "Payment rules pending", "healthy"),
    metric("Payout Status", "Pending setup", "Bank table pending", "watch")
  ]
};

export const buyerPanels = {
  orders: [
    metric("Open Orders", "0", "Order history pending", "watch"),
    metric("Delivered Orders", "0", "Delivery history pending", "watch"),
    metric("Invoices", "0", "Payment records pending", "watch"),
    metric("Support Tickets", "0", "Support table pending", "healthy")
  ],
  vet: [
    metric("Upcoming Consults", "0", "Vet bookings pending", "watch"),
    metric("Active Cases", "0", "Case table pending", "watch"),
    metric("Prescriptions", "0", "Prescription records pending", "watch"),
    metric("Care Reminders", "0", "Reminder table pending", "watch")
  ],
  account: [
    metric("Saved Suppliers", Math.min(suppliers.size, 6).toString(), "Derived from real catalog brands", "healthy"),
    metric("Bulk Quotes", "0", "B2B leads pending", "watch"),
    metric("Wishlist", buyerProducts.length.toString(), "Real catalog product list", "healthy"),
    metric("Wallet / Credit", "Rs 0", "Credit ledger pending", "watch")
  ]
};

export const tableColumns = {
  supplierPerformance: [
    { key: "supplier", label: "Supplier" },
    { key: "products", label: "Products" },
    { key: "catalogValue", label: "Catalog Value" },
    { key: "inventoryScore", label: "Inventory Score" },
    { key: "shippingSetup", label: "Shipping Setup" },
    { key: "settlement", label: "Settlement" },
    { key: "action", label: "Action" }
  ],
  buyerActivity: [
    { key: "buyer", label: "Buyer" },
    { key: "interest", label: "Interest" },
    { key: "product", label: "Product" },
    { key: "cartValue", label: "Cart Value" },
    { key: "vetNeed", label: "Vet Need" },
    { key: "status", label: "Status" }
  ],
  productApproval: [
    { key: "product", label: "Product" },
    { key: "supplier", label: "Supplier" },
    { key: "category", label: "Category" },
    { key: "issue", label: "Issue" },
    { key: "price", label: "Price" },
    { key: "action", label: "Action" }
  ],
  supplierProducts: [
    { key: "product", label: "Product" },
    { key: "category", label: "Category" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "image", label: "Image" },
    { key: "action", label: "Action" }
  ],
  supplierProductManagement: [
    { key: "sku", label: "SKU" },
    { key: "product", label: "Product" },
    { key: "approval", label: "Approval Status" },
    { key: "moq", label: "MOQ" },
    { key: "expiry", label: "Expiry Tracking" },
    { key: "categoryMap", label: "Category Mapping" },
    { key: "action", label: "Action" }
  ],
  buyerProducts: [
    { key: "product", label: "Product" },
    { key: "category", label: "Category" },
    { key: "supplier", label: "Supplier" },
    { key: "price", label: "Price" },
    { key: "stock", label: "Stock" },
    { key: "action", label: "Action" }
  ],
  buyerOrders: [
    { key: "orderId", label: "Order ID" },
    { key: "product", label: "Product" },
    { key: "supplier", label: "Supplier" },
    { key: "status", label: "Status" },
    { key: "shipping", label: "Shipping UX" },
    { key: "invoice", label: "Invoice" }
  ],
  savedSuppliers: [
    { key: "supplier", label: "Supplier" },
    { key: "products", label: "Products" },
    { key: "category", label: "Category" },
    { key: "shipping", label: "Shipping" },
    { key: "action", label: "Action" }
  ],
  supportTickets: [
    { key: "ticket", label: "Ticket" },
    { key: "topic", label: "Topic" },
    { key: "status", label: "Status" },
    { key: "action", label: "Action" }
  ]
} satisfies Record<string, TableColumn[]>;

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item).trim() || "AnimKart Verified";
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return groups;
}

function topCategoryEntries(limit: number) {
  return [...categories.entries()]
    .sort((a, b) => sumPrice(b[1]) - sumPrice(a[1]))
    .slice(0, limit);
}

function sumPrice(items: typeof validProducts) {
  return items.reduce((sum, product) => sum + product.price, 0);
}

function formatCompactINR(value: number) {
  if (value >= 10000000) {
    return `Rs ${(value / 10000000).toFixed(2)} Cr`;
  }

  if (value >= 100000) {
    return `Rs ${(value / 100000).toFixed(1)} L`;
  }

  return formatINR(value);
}

function shortLabel(value: string, maxLength = 14) {
  const label = value?.trim() || "Catalog";
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}.` : label;
}

function metric(label: string, value: string, detail: string, status: PanelMetric["status"]): PanelMetric {
  return { label, value, detail, status };
}
