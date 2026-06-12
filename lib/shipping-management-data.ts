import { formatINR, products } from "@/lib/products";

export type ShippingKpi = {
  label: string;
  value: string;
  helper: string;
  tone: "healthy" | "watch" | "critical";
};

export const stateShippingRules = [
  { state: "Delhi", deliveryCharge: 80, minOrderValue: 500, freeShippingAbove: 5000, status: "Active" },
  { state: "Haryana", deliveryCharge: 120, minOrderValue: 800, freeShippingAbove: 6000, status: "Active" },
  { state: "Punjab", deliveryCharge: 150, minOrderValue: 1000, freeShippingAbove: 7000, status: "Active" },
  { state: "Rajasthan", deliveryCharge: 180, minOrderValue: 1200, freeShippingAbove: 8000, status: "Active" },
  { state: "Maharashtra", deliveryCharge: 250, minOrderValue: 1500, freeShippingAbove: 10000, status: "Review" }
];

export const cityShippingRules = [
  { city: "Delhi NCR", deliveryCharge: 100, deliveryDays: "1-2 days", status: "Active" },
  { city: "Jaipur", deliveryCharge: 150, deliveryDays: "2-4 days", status: "Active" },
  { city: "Lucknow", deliveryCharge: 180, deliveryDays: "3-5 days", status: "Active" },
  { city: "Bengaluru", deliveryCharge: 220, deliveryDays: "3-6 days", status: "Active" },
  { city: "Pune", deliveryCharge: 240, deliveryDays: "4-6 days", status: "Review" }
];

export const pincodeShippingRules = [
  { pincode: "110001", location: "Central Delhi", deliveryCharge: 60, deliveryTime: "24-48h", status: "Active" },
  { pincode: "110025", location: "South Delhi", deliveryCharge: 90, deliveryTime: "24-48h", status: "Active" },
  { pincode: "302001", location: "Jaipur", deliveryCharge: 150, deliveryTime: "2-4 days", status: "Active" },
  { pincode: "560001", location: "Bengaluru", deliveryCharge: 220, deliveryTime: "3-6 days", status: "Active" },
  { pincode: "125001", location: "Hisar", deliveryCharge: 180, deliveryTime: "3-5 days", status: "Review" }
];

export const weightShippingRules = [
  { slab: "0-1 kg", deliveryCharge: 60, status: "Active" },
  { slab: "1-5 kg", deliveryCharge: 120, status: "Active" },
  { slab: "5-10 kg", deliveryCharge: 250, status: "Active" },
  { slab: "10-25 kg", deliveryCharge: 480, status: "Active" },
  { slab: "25+ kg", deliveryCharge: 0, status: "Freight on Actual" }
];

export const productShippingRules = [
  { category: "Medicines", deliveryCharge: 80, handling: "Standard", status: "Active" },
  { category: "Feed", deliveryCharge: 280, handling: "Heavy shipping", status: "Active" },
  { category: "Supplements", deliveryCharge: 120, handling: "Standard", status: "Active" },
  { category: "Equipment", deliveryCharge: 0, handling: "Freight on Actual", status: "FOA" },
  { category: "Cold Chain Products", deliveryCharge: 350, handling: "Cold chain", status: "Review" }
];

export const freightProducts = products
  .filter((product) => product.price > 0)
  .slice(0, 5)
  .map((product, index) => ({
    product: product.name,
    category: product.category,
    freightStatus: index % 2 === 0 ? "Enabled" : "Needs review",
    confirmation: "Supplier confirms freight after order placement"
  }));

export const blockedLocations = [
  { type: "State", value: "Jammu & Kashmir", reason: "Courier coverage pending", status: "Blocked" },
  { type: "City", value: "Leh", reason: "High freight variance", status: "Blocked" },
  { type: "Pincode", value: "194101", reason: "Non-serviceable route", status: "Blocked" },
  { type: "Pincode", value: "744101", reason: "Island freight review", status: "Review" }
];

export const shippingOrders = [
  {
    orderId: "AK-ORD-05401",
    buyerLocation: "Jaipur, Rajasthan 302001",
    shippingCost: 150,
    courierAssigned: "Delhivery",
    deliveryStatus: "In transit",
    trackingNumber: "DLV-874422",
    shippingIssue: "None"
  },
  {
    orderId: "AK-ORD-05402",
    buyerLocation: "Hisar, Haryana 125001",
    shippingCost: 180,
    courierAssigned: "Shiprocket",
    deliveryStatus: "Pickup pending",
    trackingNumber: "Not generated",
    shippingIssue: "Courier assignment pending"
  },
  {
    orderId: "AK-ORD-05403",
    buyerLocation: "Bengaluru, Karnataka 560001",
    shippingCost: 220,
    courierAssigned: "Blue Dart",
    deliveryStatus: "Delivered",
    trackingNumber: "BD-990121",
    shippingIssue: "None"
  },
  {
    orderId: "AK-ORD-05404",
    buyerLocation: "Leh, Ladakh 194101",
    shippingCost: 0,
    courierAssigned: "Pending",
    deliveryStatus: "Failed",
    trackingNumber: "Not generated",
    shippingIssue: "Blocked service area"
  }
];

export const shippingHealthScore = 84;

export const shippingKpis: ShippingKpi[] = [
  metric("Serviceable States", stateShippingRules.filter((rule) => rule.status === "Active").length.toString(), "State rules active", "healthy"),
  metric("Serviceable Pincodes", pincodeShippingRules.filter((rule) => rule.status === "Active").length.toString(), "PIN rules active", "healthy"),
  metric("Products Missing Shipping", "6", "Cannot go live without shipping or FOA", "critical"),
  metric("Freight On Actual Products", freightProducts.filter((item) => item.freightStatus === "Enabled").length.toString(), "Heavy and bulk products", "watch"),
  metric("Failed Shipping Orders", "1", "Needs logistics action", "critical"),
  metric("Shipping Health Score", `${shippingHealthScore}%`, "Good", "healthy"),
  metric("Average Shipping Cost", formatINR(174), "Across active rules", "healthy"),
  metric("Shipping Revenue", formatINR(12840), "Monthly shipping recovered", "healthy")
];

export const shippingTabs = [
  "State Wise Shipping",
  "City Wise Shipping",
  "Pincode Wise Shipping",
  "Weight Based Shipping",
  "Product Wise Shipping",
  "Freight On Actual",
  "Buyer Pickup",
  "Blocked Locations"
];

export const shippingAlerts = [
  { title: "Missing Shipping Rules", count: "6", detail: "Products cannot go live until shipping is configured or FOA is enabled", tone: "critical" },
  { title: "High Shipping Cost", count: "3", detail: "Costs above category benchmark", tone: "watch" },
  { title: "Delivery Delays", count: "2", detail: "Expected delivery SLA at risk", tone: "watch" },
  { title: "Failed Deliveries", count: "1", detail: "Courier or buyer location issue", tone: "critical" },
  { title: "Blocked Service Areas", count: blockedLocations.length.toString(), detail: "Buyer sees delivery not available", tone: "watch" },
  { title: "Products Without Shipping Setup", count: "6", detail: "Validation blocks product live status", tone: "critical" }
] satisfies Array<{ title: string; count: string; detail: string; tone: ShippingKpi["tone"] }>;

export const priorityRules = [
  "Product Rule",
  "Pincode Rule",
  "City Rule",
  "State Rule",
  "Weight Rule",
  "Default Rule"
];

export const buyerPickupConfig = {
  enabled: "Enabled",
  warehouseAddress: "AnimKart Supplier Warehouse, Plot 21, Industrial Area, Gurugram",
  pickupContactPerson: "Operations Manager",
  pickupTiming: "10:00 AM - 6:00 PM, Mon-Sat"
};

function metric(label: string, value: string, helper: string, tone: ShippingKpi["tone"]): ShippingKpi {
  return { label, value, helper, tone };
}
