import { formatINR, getTopCategories, products, StoreProduct } from "@/lib/products";
import { ActivityItem, PanelMetric, RoleKpi } from "@/lib/role-dashboard-data";

export type ProductApprovalStatus = "Draft" | "Pending Approval" | "Approved" | "Rejected" | "Hidden" | "Flagged" | "Review Required";

export type ApprovalProduct = {
  id: string;
  image: string;
  name: string;
  supplier: string;
  category: string;
  brand: string;
  price: string;
  stock: string;
  moq: string;
  shippingStatus: string;
  approvalStatus: ProductApprovalStatus;
  createdDate: string;
  healthScore: number;
  imageQualityScore: number;
  seoScore: number;
  shippingCompletenessScore: number;
  inventoryScore: number;
};

const validProducts = products.filter((product) => product.price > 0);
const liveProducts = validProducts.filter((product) => product.inStock);
const missingImages = validProducts.filter((product) => !product.image);
const missingShipping = validProducts.filter((product) => product.weightKg || product.category.toLowerCase().includes("feed"));
const lowStock = validProducts.filter((product) => product.inStock && product.stock.toLowerCase().includes("stock")).slice(0, 28);
const flaggedProducts = validProducts.filter((product) => product.price > 2500 || !product.description).slice(0, 18);
const rejectedProducts = validProducts.filter((product) => product.price <= 0 || !product.category);
const pendingApproval = validProducts.filter((product) => !product.image || !product.description || !product.brand).slice(0, 64);

export const productApprovalKpis: RoleKpi[] = [
  { label: "Total Products", value: validProducts.length.toLocaleString("en-IN"), helper: "Real imported AnimKart catalog SKUs", status: "healthy" },
  { label: "Products Live", value: liveProducts.length.toLocaleString("en-IN"), helper: "Approved and available to buyers", status: "healthy" },
  { label: "Pending Approval", value: pendingApproval.length.toLocaleString("en-IN"), helper: "Needs catalog team review", status: pendingApproval.length ? "watch" : "healthy" },
  { label: "Rejected Products", value: Math.max(9, rejectedProducts.length).toString(), helper: "Compliance, catalog or supplier issues", status: "watch" },
  { label: "Low Stock Products", value: lowStock.length.toString(), helper: "Supplier inventory needs review", status: "watch" },
  { label: "Products Missing Shipping", value: missingShipping.length.toString(), helper: "Cannot go live without shipping or freight", status: missingShipping.length ? "critical" : "healthy" },
  { label: "Products Missing Images", value: missingImages.length.toString(), helper: "Product image is mandatory", status: missingImages.length ? "critical" : "healthy" },
  { label: "Flagged Products", value: flaggedProducts.length.toString(), helper: "Pricing, duplicate or quality checks", status: flaggedProducts.length ? "watch" : "healthy" }
];

export const productApprovalTabs = [
  { label: "All Products", href: "#all-products" },
  { label: "Pending Approval", href: "#pending-approval" },
  { label: "Approved", href: "#approved" },
  { label: "Rejected", href: "#rejected" },
  { label: "Low Stock", href: "#low-stock" },
  { label: "Out Of Stock", href: "#out-of-stock" },
  { label: "Flagged", href: "#flagged" },
  { label: "Missing Shipping", href: "#missing-shipping" },
  { label: "Missing Images", href: "#missing-images" }
];

export const approvalProducts: ApprovalProduct[] = validProducts.slice(0, 14).map((product, index) => {
  const status = approvalStatusFor(product, index);
  const imageQualityScore = product.image ? 88 - (index % 8) : 35;
  const seoScore = product.description || product.shortDescription ? 82 - (index % 6) : 52;
  const shippingCompletenessScore = product.weightKg || product.category.toLowerCase().includes("feed") ? 58 : 92;
  const inventoryScore = product.inStock ? 84 - (index % 9) : 42;
  const healthScore = Math.round((imageQualityScore + seoScore + shippingCompletenessScore + inventoryScore) / 4);

  return {
    id: product.id,
    image: product.image,
    name: product.name,
    supplier: product.brand || "AnimKart Verified Supplier",
    category: product.category,
    brand: product.brand || "AnimKart",
    price: formatINR(product.price),
    stock: product.inStock ? product.stock || "In stock" : "Out of stock",
    moq: product.netQuantity || (product.category.toLowerCase().includes("feed") ? "10 bags" : "1 unit"),
    shippingStatus: product.weightKg || product.category.toLowerCase().includes("feed") ? "Freight / missing rule" : "Configured",
    approvalStatus: status,
    createdDate: `${String(16 - (index % 9)).padStart(2, "0")} Jun 2026`,
    healthScore,
    imageQualityScore,
    seoScore,
    shippingCompletenessScore,
    inventoryScore
  };
});

export const validationRules: PanelMetric[] = [
  { label: "Product Images", value: "Must have", detail: "At least one clear product image", status: missingImages.length ? "critical" : "healthy" },
  { label: "Price", value: "Must have", detail: "Selling price and GST-ready pricing", status: "healthy" },
  { label: "Stock", value: "Must have", detail: "Stock, confirm availability or made-to-order", status: "healthy" },
  { label: "MOQ", value: "Must have", detail: "Minimum order quantity for B2C and bulk", status: "healthy" },
  { label: "Shipping Rule", value: "Must have", detail: "Configured shipping or Freight on Actual", status: missingShipping.length ? "critical" : "healthy" },
  { label: "Category", value: "Must have", detail: "Mapped to marketplace taxonomy", status: "healthy" },
  { label: "Description", value: "Must have", detail: "Description, benefits, ingredients and dosage", status: "watch" },
  { label: "Supplier Verified", value: "Must have", detail: "KYC and business verification", status: "healthy" },
  { label: "GST Verified", value: "Must have", detail: "GST and invoice compliance", status: "healthy" }
];

export const warningRules: PanelMetric[] = [
  { label: "Low Quality Images", value: missingImages.length.toString(), detail: "Missing or weak product visuals", status: missingImages.length ? "critical" : "healthy" },
  { label: "Missing Shipping", value: missingShipping.length.toString(), detail: "Shipping not configured", status: missingShipping.length ? "critical" : "healthy" },
  { label: "Stock Zero", value: products.filter((product) => !product.inStock).length.toString(), detail: "Out of stock products", status: "watch" },
  { label: "Expired Product", value: "5", detail: "Expiry date requires review", status: "critical" },
  { label: "Duplicate Product", value: "12", detail: "Potential duplicate uploads", status: "watch" },
  { label: "Price Too High", value: "9", detail: "Price outlier against category", status: "watch" },
  { label: "Price Too Low", value: "6", detail: "Margin or supplier price issue", status: "watch" }
];

export const aiQualityChecks: PanelMetric[] = [
  { label: "Image Quality Score", value: "82", detail: "Average score across reviewed SKUs", status: "healthy" },
  { label: "SEO Score", value: "78", detail: "Titles, descriptions and category keywords", status: "watch" },
  { label: "Shipping Completeness Score", value: "71", detail: "Shipping rules and freight readiness", status: "watch" },
  { label: "Inventory Score", value: "84", detail: "Stock freshness and availability", status: "healthy" },
  { label: "Product Health Score", value: "79", detail: "Overall catalog quality score", status: "watch" }
];

export const adminAlerts: PanelMetric[] = [
  { label: "Products Missing Shipping", value: missingShipping.length.toString(), detail: "Need shipping rule or Freight on Actual", status: "critical" },
  { label: "Products Missing Images", value: missingImages.length.toString(), detail: "Images required before approval", status: "critical" },
  { label: "Pending More Than 3 Days", value: "21", detail: "SLA breach in approval queue", status: "watch" },
  { label: "Products Not Updated", value: "38", detail: "Supplier catalog freshness issue", status: "watch" },
  { label: "Duplicate Products", value: "12", detail: "Supplier uploaded duplicate listings", status: "watch" },
  { label: "Supplier Missing GST", value: "7", detail: "Compliance block before go-live", status: "critical" },
  { label: "Supplier Not Verified", value: "11", detail: "KYC pending suppliers with uploads", status: "critical" }
];

export const approvalActions = ["Approve Product", "Reject Product", "Request Changes", "Hide Product", "Flag Product", "Suspend Product", "Approve With Warning"];
export const bulkActions = ["Bulk Approve", "Bulk Reject", "Bulk Hide", "Bulk Export", "Bulk Update Category", "Bulk Change Status"];
export const quickActions = ["Approve", "Reject", "View Supplier", "Edit Product", "Hide Product", "Export"];

export const productAnalytics: PanelMetric[] = [
  { label: "Products Uploaded Today", value: "46", detail: "Supplier catalog submissions", status: "healthy" },
  { label: "Approval Rate", value: "78%", detail: "Approved first pass", status: "healthy" },
  { label: "Rejection Rate", value: "11%", detail: "Compliance or quality rejects", status: "watch" },
  { label: "Top Categories", value: getTopCategories(1)[0]?.name || "Animal Healthcare", detail: "Highest product volume", status: "healthy" },
  { label: "Top Suppliers", value: "12", detail: "Fastest approval-ready suppliers", status: "healthy" },
  { label: "Most Viewed Products", value: "84", detail: "Buyer demand signal", status: "healthy" },
  { label: "Most Ordered Products", value: "32", detail: "Sales velocity signal", status: "healthy" }
];

export const reviewDrawerSections: PanelMetric[] = [
  { label: "Product Images", value: "Gallery", detail: "Image quality, angle and clarity", status: "healthy" },
  { label: "Product Videos", value: "Optional", detail: "Supplier demo or usage media", status: "watch" },
  { label: "Product Name", value: "Required", detail: "Clean marketplace title", status: "healthy" },
  { label: "Category", value: "Required", detail: "AnimKart taxonomy mapping", status: "healthy" },
  { label: "Brand", value: "Required", detail: "Brand or supplier identity", status: "healthy" },
  { label: "Description", value: "Required", detail: "Description, benefits, ingredients and dosage", status: "watch" },
  { label: "Shipping Rules", value: "Required", detail: "Shipping configured or freight enabled", status: "critical" },
  { label: "Documents", value: "Optional", detail: "License, certificate, leaflet or PDF", status: "watch" },
  { label: "Supplier Information", value: "Verified", detail: "KYC, GST and business profile", status: "healthy" },
  { label: "Approval History", value: "Tracked", detail: "Review notes and admin actions", status: "healthy" }
];

export const approvalActivity: ActivityItem[] = [
  { title: "Product approved", detail: "Whiskas dry cat food moved live after image review", time: "5m", status: "success" },
  { title: "Shipping missing", detail: "Dairy feed product blocked until freight rule is added", time: "14m", status: "critical" },
  { title: "Changes requested", detail: "Supplier asked to update dosage and ingredient details", time: "27m", status: "warning" },
  { title: "Duplicate product flagged", detail: "Two similar poultry supplement listings detected", time: "43m", status: "warning" },
  { title: "Supplier GST verified", detail: "Catalog queue unlocked for approved supplier", time: "1h", status: "success" }
];

function approvalStatusFor(product: StoreProduct, index: number): ProductApprovalStatus {
  if (!product.image) return "Pending Approval";
  if (!product.inStock) return "Hidden";
  if (!product.description) return "Review Required";
  if (product.price > 2500 && index % 2 === 0) return "Flagged";
  return ["Approved", "Pending Approval", "Approved", "Review Required", "Rejected"][index % 5] as ProductApprovalStatus;
}
