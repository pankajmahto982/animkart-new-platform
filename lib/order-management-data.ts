import { formatINR, products } from "@/lib/products";

export type SupplierOrderStatus =
  | "New"
  | "Pending Confirmation"
  | "Accepted"
  | "Rejected"
  | "Packed"
  | "Shipped"
  | "Delivered"
  | "Cancelled"
  | "Returned";

export type SupplierOrder = {
  orderId: string;
  date: string;
  buyerName: string;
  product: string;
  supplier: string;
  quantity: number;
  orderValue: number;
  shippingCharge: number;
  paymentStatus: "Paid" | "COD" | "Pending" | "Refund Requested";
  orderStatus: SupplierOrderStatus;
  deliveryStatus: string;
  shippingAddress: string;
  gstDetails: string;
  deliveryPartner: string;
  trackingNumber: string;
  expectedDelivery: string;
  actualDelivery: string;
  freightCharges: string;
  shippingNotes: string;
};

export type OrderKpi = {
  label: string;
  value: string;
  helper: string;
  tone: "healthy" | "watch" | "critical";
};

const seedProducts = products.filter((product) => product.price > 0).slice(0, 12);

export const supplierOrders: SupplierOrder[] = seedProducts.map((product, index) => {
  const statuses: SupplierOrderStatus[] = [
    "New",
    "Pending Confirmation",
    "Accepted",
    "Packed",
    "Shipped",
    "Delivered",
    "Cancelled",
    "Returned"
  ];
  const status = statuses[index % statuses.length];
  const quantity = (index % 4) + 1;
  const shippingCharge = status === "Returned" ? 0 : [80, 120, 180, 240][index % 4];

  return {
    orderId: `AK-ORD-${String(5400 + index).padStart(5, "0")}`,
    date: `12 Jun 2026, ${String(9 + index).padStart(2, "0")}:30`,
    buyerName: ["Green Valley Dairy", "Kisan Poultry Farm", "Aqua Fresh Co.", "Bangalore Pet Care"][index % 4],
    product: product.name,
    supplier: product.brand || "AnimKart Verified",
    quantity,
    orderValue: product.price * quantity,
    shippingCharge,
    paymentStatus: index % 5 === 0 ? "COD" : index % 6 === 0 ? "Refund Requested" : index % 3 === 0 ? "Pending" : "Paid",
    orderStatus: status,
    deliveryStatus:
      status === "Delivered"
        ? "Delivered"
        : status === "Shipped"
          ? "In transit"
          : status === "Cancelled"
            ? "Cancelled due to stock"
            : status === "Returned"
              ? "Return requested"
              : "Awaiting supplier action",
    shippingAddress: ["Hisar, Haryana 125001", "Jaipur, Rajasthan 302001", "Bengaluru, Karnataka 560001", "Lucknow, UP 226010"][index % 4],
    gstDetails: index % 2 === 0 ? "GST invoice required" : "Consumer invoice",
    deliveryPartner: ["Delhivery", "Blue Dart", "Shiprocket Freight", "Supplier Fleet"][index % 4],
    trackingNumber: status === "Shipped" || status === "Delivered" ? `TRK${78000 + index}` : "Not generated",
    expectedDelivery: `15 Jun 2026`,
    actualDelivery: status === "Delivered" ? "14 Jun 2026" : "Pending",
    freightCharges: shippingCharge ? formatINR(shippingCharge) : "Freight on Actual",
    shippingNotes: status === "Pending Confirmation" ? "Confirm stock before packing" : "Standard handling"
  };
});

export const orderStatusTabs = [
  "All Orders",
  "New",
  "Pending Confirmation",
  "Accepted",
  "Rejected",
  "Packed",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned"
];

const totalRevenue = supplierOrders.reduce((sum, order) => sum + order.orderValue, 0);

export const orderKpis: OrderKpi[] = [
  metric("Total Orders", supplierOrders.length.toString(), "All supplier orders", "healthy"),
  metric("New Orders", countStatus("New").toString(), "Needs first action", "watch"),
  metric("Pending Confirmation", countStatus("Pending Confirmation").toString(), "Supplier must accept/reject", "critical"),
  metric("Processing Orders", (countStatus("Accepted") + countStatus("Packed")).toString(), "Accepted or packed", "healthy"),
  metric("Shipped Orders", countStatus("Shipped").toString(), "In transit", "healthy"),
  metric("Delivered Orders", countStatus("Delivered").toString(), "Completed deliveries", "healthy"),
  metric("Cancelled Orders", countStatus("Cancelled").toString(), "Cancellation risk", "critical"),
  metric("Return Requests", countStatus("Returned").toString(), "Return queue", "watch"),
  metric("Revenue Generated", formatINR(totalRevenue), "Gross order value", "healthy")
];

export const orderAlerts = [
  { title: "Orders Pending Confirmation", count: countStatus("Pending Confirmation").toString(), detail: "Accept or reject before SLA breach", tone: "critical" },
  { title: "Orders Delayed", count: "2", detail: "Expected dispatch has crossed target time", tone: "watch" },
  { title: "Orders Stuck In Transit", count: countStatus("Shipped").toString(), detail: "Follow up with delivery partner", tone: "watch" },
  { title: "Failed Deliveries", count: "0", detail: "No failed delivery event connected", tone: "healthy" },
  { title: "Cancelled Due To Shipping", count: "1", detail: "Non-serviceable route issue", tone: "critical" },
  { title: "Cancelled Due To Stock", count: countStatus("Cancelled").toString(), detail: "Inventory confirmation required", tone: "critical" }
] satisfies Array<{ title: string; count: string; detail: string; tone: OrderKpi["tone"] }>;

export const paymentBreakdown = [
  { label: "COD Orders", value: supplierOrders.filter((order) => order.paymentStatus === "COD").length.toString(), helper: "Cash on delivery" },
  { label: "Paid Orders", value: supplierOrders.filter((order) => order.paymentStatus === "Paid").length.toString(), helper: "Prepaid captured" },
  { label: "Pending Payments", value: supplierOrders.filter((order) => order.paymentStatus === "Pending").length.toString(), helper: "Awaiting capture" },
  { label: "Refund Requests", value: supplierOrders.filter((order) => order.paymentStatus === "Refund Requested").length.toString(), helper: "Review required" }
];

export const performanceWidgets = [
  { label: "Order Acceptance Rate", value: "94%", helper: "Accepted before SLA" },
  { label: "Dispatch Time", value: "8h 40m", helper: "Average pack-to-ship" },
  { label: "Cancellation Rate", value: "2.8%", helper: "Stock/shipping cancellations" },
  { label: "Delivery Success Rate", value: "97%", helper: "Delivered without exception" },
  { label: "Average Order Value", value: formatINR(Math.round(totalRevenue / supplierOrders.length)), helper: "Real catalog order seed" }
];

export const selectedOrder = supplierOrders[1] ?? supplierOrders[0];

function countStatus(status: SupplierOrderStatus) {
  return supplierOrders.filter((order) => order.orderStatus === status).length;
}

function metric(label: string, value: string, helper: string, tone: OrderKpi["tone"]): OrderKpi {
  return { label, value, helper, tone };
}
