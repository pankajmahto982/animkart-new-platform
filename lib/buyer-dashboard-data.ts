import { formatINR, getFeaturedProducts, getSupplierStores } from "@/lib/products";

export type BuyerKpi = {
  label: string;
  value: string;
  helper: string;
  status: "healthy" | "watch" | "critical";
};

export type BuyerOrder = {
  orderId: string;
  product: string;
  image: string;
  supplier: string;
  orderValue: string;
  shippingCharge: string;
  status: string;
  trackingNumber: string;
  invoice: string;
};

const featuredProducts = getFeaturedProducts(8);
const stores = getSupplierStores(8);

export const buyerKpis: BuyerKpi[] = [
  { label: "Total Orders", value: "42", helper: "Across medicine, feed and supplements", status: "healthy" },
  { label: "Active Orders", value: "6", helper: "2 need supplier confirmation", status: "watch" },
  { label: "Delivered Orders", value: "36", helper: "Last 12 months", status: "healthy" },
  { label: "Saved Suppliers", value: stores.length.toString(), helper: "Verified supplier network", status: "healthy" },
  { label: "Wishlist Items", value: featuredProducts.length.toString(), helper: "Real AnimKart catalog items", status: "healthy" },
  { label: "Vet Consultations", value: "4", helper: "1 upcoming call today", status: "watch" },
  { label: "Bulk Inquiries", value: "3", helper: "Responses pending from suppliers", status: "watch" },
  { label: "Reward Points", value: "2,840", helper: "Procurement loyalty balance", status: "healthy" }
];

export const recentOrders: BuyerOrder[] = featuredProducts.slice(0, 5).map((product, index) => ({
  orderId: `AKB-${2600 + index}`,
  product: product.name,
  image: product.image,
  supplier: product.brand || "AnimKart Verified",
  orderValue: formatINR(product.price * (index + 1)),
  shippingCharge: index === 2 ? "Freight on Actual" : formatINR([80, 120, 180, 0, 240][index]),
  status: ["Processing", "Shipped", "Pending", "Delivered", "Returned"][index],
  trackingNumber: index === 2 ? "Awaiting freight" : `AKT${90210 + index}`,
  invoice: index === 2 ? "Pending" : "GST invoice"
}));

export const orderStatusTabs = ["All Orders", "Pending", "Processing", "Shipped", "Delivered", "Cancelled", "Returned"];

export const repeatProducts = featuredProducts.slice(0, 4).map((product, index) => ({
  product: product.name,
  image: product.image,
  category: product.category,
  supplier: product.brand || "AnimKart Verified",
  price: formatINR(product.price),
  reminder: ["Feed reorder due in 5 days", "Medicine course refill due", "Supplement reorder suggested", "Frequently ordered"][index],
  action: "One click reorder"
}));

export const recommendedProducts = featuredProducts.slice(4, 8).map((product) => ({
  product: product.name,
  image: product.image,
  category: product.category,
  supplier: product.brand || "AnimKart Verified",
  price: formatINR(product.price || 0),
  stock: product.inStock ? "In stock" : "Confirm availability"
}));

export const savedSuppliers = stores.slice(0, 4).map((store, index) => ({
  logo: store.name.slice(0, 1).toUpperCase(),
  name: store.name,
  location: ["Delhi NCR", "Hisar, Haryana", "Jaipur, Rajasthan", "Bengaluru, Karnataka"][index],
  rating: ["4.8", "4.7", "4.6", "4.5"][index],
  products: store.productCount.toString(),
  slug: store.slug
}));

export const bulkInquiries = [
  { id: "B2B-1081", product: "Dairy cattle feed bags", quantity: "150 bags", responses: "4 suppliers", status: "Negotiation" },
  { id: "B2B-1082", product: "Poultry vitamins", quantity: "500 units", responses: "2 suppliers", status: "Supplier responses" },
  { id: "B2B-1083", product: "Cold chain vaccines", quantity: "Quote required", responses: "1 supplier", status: "Freight pending" }
];

export const vetConsultations = [
  { animal: "Dairy cattle", date: "Today, 5:30 PM", doctor: "Large animal vet", status: "Upcoming", action: "Join call" },
  { animal: "Poultry flock", date: "11 Jun 2026", doctor: "Poultry expert", status: "Prescription ready", action: "Download" },
  { animal: "Pet dog", date: "8 Jun 2026", doctor: "Pet consultant", status: "Completed", action: "Book follow-up" }
];

export const invoices = recentOrders.slice(0, 4).map((order, index) => ({
  invoice: `INV-AK-${1800 + index}`,
  orderId: order.orderId,
  amount: order.orderValue,
  type: index % 2 === 0 ? "GST Invoice" : "Retail Invoice",
  status: order.invoice
}));

export const supportTickets = [
  { ticket: "SUP-2201", topic: "Shipment delayed", channel: "WhatsApp", status: "Open", action: "Chat support" },
  { ticket: "SUP-2202", topic: "GST invoice request", channel: "Email", status: "Resolved", action: "Download invoice" },
  { ticket: "SUP-2203", topic: "Supplier response pending", channel: "Call", status: "In progress", action: "Contact supplier" }
];

export const notifications = [
  "Order AKB-2601 shipped with live tracking",
  "Supplier response received for bulk inquiry B2B-1081",
  "Vet consultation reminder for dairy cattle",
  "GST invoice generated for delivered order"
];

export const profileSummary = [
  ["Buyer", "Green Valley Dairy Procurement"],
  ["Business Type", "Dairy farm and distributor"],
  ["GST", "GST details verified"],
  ["Addresses", "3 saved delivery addresses"],
  ["Payments", "UPI, bank transfer, COD enabled"]
];
