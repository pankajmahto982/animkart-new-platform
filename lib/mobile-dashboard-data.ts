import { formatINR, getFeaturedProducts, getSupplierStores } from "@/lib/products";

export type MobileRole = "buyer" | "supplier" | "vet" | "admin";

export type MobileMetric = {
  label: string;
  value: string;
  detail: string;
};

export type MobileAction = {
  label: string;
  detail: string;
};

export type MobileCard = {
  title: string;
  subtitle: string;
  meta: string;
  status: string;
};

export type MobileDashboard = {
  role: MobileRole;
  eyebrow: string;
  title: string;
  subtitle: string;
  searchPlaceholder: string;
  primaryCta: string;
  stickyCta: string;
  metrics: MobileMetric[];
  categories: string[];
  actions: MobileAction[];
  cards: MobileCard[];
  timeline: MobileCard[];
};

const featuredProducts = getFeaturedProducts(8);
const stores = getSupplierStores(6);

export const mobileDashboards: Record<MobileRole, MobileDashboard> = {
  buyer: {
    role: "buyer",
    eyebrow: "Buyer App",
    title: "Buy, reorder, track and consult vets from one mobile app.",
    subtitle: "Built for farmers, poultry farms, dairy farms, pet owners and distributors who need fast mobile procurement.",
    searchPlaceholder: "Search products, suppliers, orders...",
    primaryCta: "Track Order",
    stickyCta: "One Tap Reorder",
    metrics: [
      { label: "Active Orders", value: "6", detail: "2 need supplier confirmation" },
      { label: "Wishlist", value: featuredProducts.length.toString(), detail: "Saved animal health products" },
      { label: "Saved Suppliers", value: stores.length.toString(), detail: "Verified supplier network" },
      { label: "Vet Consults", value: "4", detail: "1 upcoming today" }
    ],
    categories: ["Medicines", "Feed", "Poultry", "Dairy", "Pet Care", "Equipment"],
    actions: [
      { label: "One Tap Reorder", detail: "Repeat medicines, feed and supplements" },
      { label: "WhatsApp Supplier", detail: "Ask supplier before buying" },
      { label: "Book Vet", detail: "Talk to certified experts" },
      { label: "Bulk Inquiry", detail: "Request supplier quotes" },
      { label: "Track Shipment", detail: "Live order tracking" },
      { label: "Download Invoice", detail: "GST and payment receipts" }
    ],
    cards: featuredProducts.slice(0, 4).map((product, index) => ({
      title: product.name,
      subtitle: product.brand || "AnimKart Verified",
      meta: formatINR(product.price),
      status: ["Repeat due", "In stock", "Freight available", "Vet recommended"][index]
    })),
    timeline: [
      { title: "Order placed", subtitle: "AKB-2600", meta: "Today 10:42 AM", status: "Done" },
      { title: "Supplier confirmation", subtitle: "Awaiting supplier accept", meta: "Current", status: "Pending" },
      { title: "Dispatch", subtitle: "Courier pickup after packing", meta: "Next", status: "Upcoming" }
    ]
  },
  supplier: {
    role: "supplier",
    eyebrow: "Supplier App",
    title: "Manage orders, inventory, shipping and payments from your phone.",
    subtitle: "Amazon Seller Central style mobile controls for AnimKart suppliers and manufacturers.",
    searchPlaceholder: "Search orders, SKUs, payments...",
    primaryCta: "Accept Order",
    stickyCta: "Add Product",
    metrics: [
      { label: "Sales Today", value: "Rs 48K", detail: "Marketplace sales" },
      { label: "Orders", value: "28", detail: "7 need acceptance" },
      { label: "Inventory Alerts", value: "18", detail: "Low or stale stock" },
      { label: "Shipping Issues", value: "9", detail: "Freight and courier alerts" }
    ],
    categories: ["Orders", "Inventory", "Shipping", "Products", "Payments", "Reviews"],
    actions: [
      { label: "Upload Product Image", detail: "Add or improve catalog visuals" },
      { label: "Update Inventory", detail: "Refresh stock and availability" },
      { label: "Accept Order", detail: "Confirm buyer order" },
      { label: "Update Stock", detail: "Bulk or quick stock edit" },
      { label: "Send Reminder", detail: "Notify buyer or ops" },
      { label: "View Payments", detail: "Settlements and payout status" }
    ],
    cards: [
      { title: "Order AKS-1092", subtitle: "Dairy feed bags", meta: "Rs 18,400", status: "Accept now" },
      { title: "Low stock", subtitle: "Poultry supplement", meta: "6 units left", status: "Update" },
      { title: "Shipping rule missing", subtitle: "Heavy feed product", meta: "Freight needed", status: "Fix" },
      { title: "Pending payment", subtitle: "Settlement batch", meta: "Rs 72,500", status: "Review" }
    ],
    timeline: [
      { title: "New order", subtitle: "Supplier confirmation required", meta: "4m ago", status: "Current" },
      { title: "Pack order", subtitle: "After acceptance", meta: "Next", status: "Upcoming" },
      { title: "Courier pickup", subtitle: "Tracking generated", meta: "After packing", status: "Upcoming" }
    ]
  },
  vet: {
    role: "vet",
    eyebrow: "Vet App",
    title: "Appointments, cases, prescriptions, messages and earnings in one vet console.",
    subtitle: "Practo-style mobile workspace for animal health specialists on AnimKart.",
    searchPlaceholder: "Search appointments, cases, prescriptions...",
    primaryCta: "Open Case",
    stickyCta: "Write Prescription",
    metrics: [
      { label: "Appointments", value: "12", detail: "Today" },
      { label: "Active Cases", value: "8", detail: "Needs follow-up" },
      { label: "Prescriptions", value: "5", detail: "Pending drafts" },
      { label: "Earnings", value: "Rs 18K", detail: "This week" }
    ],
    categories: ["Appointments", "Cases", "Rx", "Messages", "Earnings", "Calendar"],
    actions: [
      { label: "Book Vet", detail: "Create follow-up slot" },
      { label: "Send Prescription", detail: "Share PDF with buyer" },
      { label: "Message Patient", detail: "WhatsApp or in-app chat" },
      { label: "Upload Case Image", detail: "Review animal photos" },
      { label: "Recommend Product", detail: "Medicines, feed, supplements" },
      { label: "Update Calendar", detail: "Manage available slots" }
    ],
    cards: [
      { title: "Dairy cattle fever", subtitle: "Green Valley Dairy", meta: "11:30 AM", status: "Upcoming" },
      { title: "Poultry respiratory issue", subtitle: "Farm uploaded 3 photos", meta: "Active", status: "Review" },
      { title: "Prescription pending", subtitle: "Goat deworming case", meta: "Due today", status: "Write Rx" },
      { title: "Message received", subtitle: "Pet owner follow-up", meta: "2m ago", status: "Reply" }
    ],
    timeline: [
      { title: "Appointment accepted", subtitle: "Dairy cattle case", meta: "Done", status: "Complete" },
      { title: "Consultation", subtitle: "Video consultation", meta: "11:30 AM", status: "Current" },
      { title: "Prescription", subtitle: "Recommend medicines and feed", meta: "After call", status: "Upcoming" }
    ]
  },
  admin: {
    role: "admin",
    eyebrow: "Admin App",
    title: "Monitor the full AnimKart business from a mobile command center.",
    subtitle: "Founder and admin mobile view for orders, suppliers, products, shipping, inventory, vet cases and revenue.",
    searchPlaceholder: "Search orders, suppliers, products...",
    primaryCta: "Open Alerts",
    stickyCta: "Approve Product",
    metrics: [
      { label: "Live Visitors", value: "5.2K", detail: "Online now" },
      { label: "Orders Today", value: "184", detail: "B2C and B2B" },
      { label: "Pending Suppliers", value: "7", detail: "KYC queue" },
      { label: "Revenue Today", value: "Rs 8.4L", detail: "GMV signal" },
      { label: "Pending Products", value: "64", detail: "Approval queue" },
      { label: "Shipping Issues", value: "12", detail: "Needs ops review" },
      { label: "Inventory Alerts", value: "38", detail: "Supplier reminders" },
      { label: "Vet Cases", value: "18", detail: "New and active" }
    ],
    categories: ["Visitors", "Orders", "Suppliers", "Products", "Shipping", "Vet"],
    actions: [
      { label: "Approve Supplier", detail: "Review KYC and GST" },
      { label: "Approve Product", detail: "Catalog quality control" },
      { label: "Send Reminder", detail: "Inventory or shipping reminder" },
      { label: "Track Shipment", detail: "Resolve shipping issue" },
      { label: "Assign Vet", detail: "Route consultation case" },
      { label: "Export Report", detail: "Download founder report" }
    ],
    cards: [
      { title: "Pending supplier approval", subtitle: "Pashu Care Distributors", meta: "GST uploaded", status: "Approve" },
      { title: "Product missing shipping", subtitle: "Dairy feed bulk SKU", meta: "Cannot go live", status: "Fix" },
      { title: "Shipping issue", subtitle: "AKB-2600 delayed", meta: "Courier SLA risk", status: "Resolve" },
      { title: "Vet case", subtitle: "Poultry respiratory issue", meta: "Needs assignment", status: "Assign" }
    ],
    timeline: [
      { title: "Order placed", subtitle: "Bulk cattle feed order", meta: "2m ago", status: "Live" },
      { title: "Product submitted", subtitle: "Supplier uploaded catalog", meta: "8m ago", status: "Review" },
      { title: "Shipping alert", subtitle: "Freight quote pending", meta: "18m ago", status: "Watch" }
    ]
  }
};
