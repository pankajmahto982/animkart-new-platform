import { formatINR, products } from "@/lib/products";

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

type ProductLike = (typeof products)[number];

const validProducts = products.filter((product) => product.price > 0);
const activeProducts = validProducts.filter((product) => product.inStock);
const imageBackedProducts = validProducts.filter((product) => Boolean(product.image));
const discountProducts = validProducts.filter(
  (product) => product.regularPrice && product.regularPrice > product.price
);

const categoryMap = groupBy(validProducts, (product) => cleanLabel(product.category || "Uncategorized"));
const brandMap = groupBy(validProducts, (product) => cleanLabel(product.brand || "AnimKart Verified"));

const catalogValue = validProducts.reduce((sum, product) => sum + product.price, 0);
const activeCatalogValue = activeProducts.reduce((sum, product) => sum + product.price, 0);
const averagePrice = validProducts.length ? Math.round(catalogValue / validProducts.length) : 0;
const inventoryScore = validProducts.length ? Math.round((activeProducts.length / validProducts.length) * 100) : 0;
const imageCoverage = validProducts.length ? Math.round((imageBackedProducts.length / validProducts.length) * 100) : 0;
const discountCoverage = validProducts.length ? Math.round((discountProducts.length / validProducts.length) * 100) : 0;

export const analyticsKpis: AnalyticsKpi[] = [
  {
    id: "catalog-value",
    label: "Catalog Value",
    value: formatCompactINR(catalogValue),
    change: "real",
    trend: "up",
    helper: "Sum of imported WooCommerce product prices"
  },
  {
    id: "active-value",
    label: "Active GMV Base",
    value: formatCompactINR(activeCatalogValue),
    change: `${inventoryScore}%`,
    trend: "up",
    helper: "In-stock catalog value available to sell"
  },
  {
    id: "products",
    label: "Total Products",
    value: validProducts.length.toLocaleString("en-IN"),
    change: "live",
    trend: "up",
    helper: "Real imported AnimKart SKUs"
  },
  {
    id: "active-products",
    label: "Active Inventory",
    value: activeProducts.length.toLocaleString("en-IN"),
    change: `${inventoryScore}%`,
    trend: "up",
    helper: "Products currently marked in stock"
  },
  {
    id: "suppliers",
    label: "Catalog Suppliers",
    value: brandMap.size.toLocaleString("en-IN"),
    change: "brands",
    trend: "up",
    helper: "Supplier/brand names found in product export"
  },
  {
    id: "categories",
    label: "Categories",
    value: categoryMap.size.toLocaleString("en-IN"),
    change: "mapped",
    trend: "up",
    helper: "Product categories in current catalog"
  },
  {
    id: "image-coverage",
    label: "Image Coverage",
    value: `${imageCoverage}%`,
    change: imageCoverage >= 80 ? "healthy" : "fix",
    trend: imageCoverage >= 80 ? "up" : "down",
    helper: "Products with usable product image URL"
  },
  {
    id: "avg-price",
    label: "Average Price",
    value: formatINR(averagePrice),
    change: `${discountCoverage}% deals`,
    trend: "up",
    helper: "Average selling price from catalog"
  }
];

export const revenueTrendData: ChartPoint[] = topCategoryEntries(7).map(([category, categoryProducts]) => ({
  period: shortLabel(category),
  revenue: toLakhs(sumPrice(categoryProducts)),
  gmv: toLakhs(sumPrice(categoryProducts.filter((product) => product.inStock)))
}));

export const ordersTrendData: ChartPoint[] = priceBands().map((band) => ({
  period: band.label,
  orders: band.count
}));

export const trafficSourceData: TrafficSource[] = [
  { source: "Products with images", visitors: imageBackedProducts.length, fill: "#0B8F47" },
  { source: "In stock", visitors: activeProducts.length, fill: "#31C48D" },
  { source: "Discounted", visitors: discountProducts.length, fill: "#0F766E" },
  {
    source: "Needs image",
    visitors: Math.max(validProducts.length - imageBackedProducts.length, 0),
    fill: "#F59E0B"
  }
];

export const supplierGrowthData: ChartPoint[] = topBrandEntries(7)
  .reverse()
  .map(([brand, brandProducts]) => ({
    period: shortLabel(brand),
    suppliers: brandProducts.length
  }));

export const categoryPerformanceData: CategoryPerformance[] = topCategoryEntries(8).map(([category, categoryProducts]) => ({
  category: shortLabel(category, 18),
  revenue: toLakhs(sumPrice(categoryProducts)),
  orders: categoryProducts.length
}));

export const shippingFailureData: ChartPoint[] = topBrandEntries(6).map(([brand, brandProducts]) => ({
  period: shortLabel(brand),
  failures: brandProducts.filter((product) => !product.inStock || !product.image).length
}));

export const topProductsTable: AnalyticsRow[] = [...validProducts]
  .sort((a, b) => b.price - a.price)
  .slice(0, 8)
  .map((product) => ({
    product: product.name,
    category: cleanLabel(product.category),
    supplier: cleanLabel(product.brand || "AnimKart Verified"),
    views: "Event data pending",
    orders: 0,
    revenue: formatINR(product.price),
    conversion: "0%"
  }));

export const topSuppliersTable: AnalyticsRow[] = topBrandEntries(8).map(([brand, brandProducts]) => {
  const inStock = brandProducts.filter((product) => product.inStock).length;
  const inventory = brandProducts.length ? Math.round((inStock / brandProducts.length) * 100) : 0;

  return {
    supplier: brand,
    location: "Catalog import",
    products: brandProducts.length,
    orders: 0,
    revenue: formatCompactINR(sumPrice(brandProducts)),
    rating: "Pending",
    inventory: `${inventory}%`
  };
});

export const shippingIssuesTable: AnalyticsRow[] = validProducts
  .filter((product) => !product.inStock || !product.image)
  .slice(0, 8)
  .map((product, index) => ({
    supplier: cleanLabel(product.brand || "AnimKart Verified"),
    orderId: `CAT-${String(index + 1).padStart(4, "0")}`,
    issueType: !product.inStock ? "Out of stock" : "Image missing",
    location: "Catalog operations",
    status: "Needs review",
    action: !product.inStock ? "Check stock" : "Fix image"
  }));

export const inventoryAlertsTable: AnalyticsRow[] = validProducts
  .filter((product) => !product.inStock || product.stock.toLowerCase().includes("out"))
  .slice(0, 8)
  .map((product) => ({
    product: product.name,
    supplier: cleanLabel(product.brand || "AnimKart Verified"),
    stockStatus: product.inStock ? "Review stock" : "Out of stock",
    lastUpdated: "From CSV import",
    action: "Verify supplier"
  }));

export const liveActivities: LiveActivity[] = [
  {
    id: "act-1",
    event: "Product catalog imported",
    actor: `${validProducts.length.toLocaleString("en-IN")} real WooCommerce products loaded`,
    timestamp: "Latest import",
    severity: "success"
  },
  {
    id: "act-2",
    event: "Catalog value calculated",
    actor: formatCompactINR(catalogValue),
    timestamp: "Live",
    severity: "success"
  },
  {
    id: "act-3",
    event: "Supplier brands mapped",
    actor: `${brandMap.size.toLocaleString("en-IN")} brand/supplier records`,
    timestamp: "Live",
    severity: "info"
  },
  {
    id: "act-4",
    event: "Inventory alert triggered",
    actor: `${Math.max(validProducts.length - activeProducts.length, 0)} products need stock review`,
    timestamp: "Live",
    severity: "warning"
  },
  {
    id: "act-5",
    event: "Image quality check",
    actor: `${imageCoverage}% catalog image coverage`,
    timestamp: "Live",
    severity: imageCoverage >= 80 ? "success" : "warning"
  },
  {
    id: "act-6",
    event: "Order/vet/shipping events",
    actor: "Waiting for Supabase event tables",
    timestamp: "Pending",
    severity: "info"
  }
];

export const operationalInsights = [
  ["Buyer Analytics", "0 live buyers", "Connect Supabase auth profiles and buyer events to populate this panel."],
  ["Supplier Analytics", `${brandMap.size} catalog suppliers`, "Derived from real supplier/brand values in the imported product catalog."],
    ["Order Analytics", "0 live orders", "No real orders table is connected yet; dashboard only shows verified activity."],
  ["Shipping Analytics", `${shippingIssuesTable.length} catalog issues`, "Using stock and image exceptions until shipment records are connected."],
  ["Inventory Analytics", `${inventoryAlertsTable.length} alerts`, "Real catalog stock status review queue from imported products."],
  ["Vet Consultation Analytics", "0 live bookings", "Ready for Supabase vet consultation table once backend events start."],
    ["B2B Lead Analytics", "0 live leads", "Ready for Supabase B2B inquiry table once live inquiries are connected."],
  ["Marketplace Health", `${inventoryScore}% inventory score`, "Calculated from in-stock product coverage in the real catalog."]
];

function groupBy<T>(items: T[], getKey: (item: T) => string) {
  const groups = new Map<string, T[]>();

  for (const item of items) {
    const key = getKey(item);
    groups.set(key, [...(groups.get(key) ?? []), item]);
  }

  return groups;
}

function topCategoryEntries(limit: number) {
  return [...categoryMap.entries()]
    .sort((a, b) => sumPrice(b[1]) - sumPrice(a[1]))
    .slice(0, limit);
}

function topBrandEntries(limit: number) {
  return [...brandMap.entries()]
    .sort((a, b) => b[1].length - a[1].length)
    .slice(0, limit);
}

function priceBands() {
  const bands = [
    { label: "< Rs500", min: 0, max: 500 },
    { label: "Rs500-1k", min: 500, max: 1000 },
    { label: "Rs1k-2k", min: 1000, max: 2000 },
    { label: "Rs2k-5k", min: 2000, max: 5000 },
    { label: "Rs5k+", min: 5000, max: Number.POSITIVE_INFINITY }
  ];

  return bands.map((band) => ({
    label: band.label,
    count: validProducts.filter((product) => product.price >= band.min && product.price < band.max).length
  }));
}

function sumPrice(items: ProductLike[]) {
  return items.reduce((sum, product) => sum + product.price, 0);
}

function toLakhs(value: number) {
  return Math.round(value / 100000);
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

function cleanLabel(value: string) {
  return value?.trim() || "AnimKart Verified";
}

function shortLabel(value: string, maxLength = 13) {
  const label = cleanLabel(value);
  return label.length > maxLength ? `${label.slice(0, maxLength - 1)}.` : label;
}
