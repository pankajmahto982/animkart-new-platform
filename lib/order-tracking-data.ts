import { formatINR, getFeaturedProducts } from "@/lib/products";

export type TimelineStep = {
  label: string;
  detail: string;
  time: string;
  status: "complete" | "current" | "pending" | "issue";
};

export type OrderAlert = {
  title: string;
  detail: string;
  severity: "success" | "info" | "warning" | "critical";
};

export type OrderTrackingProduct = {
  image: string;
  name: string;
  brand: string;
  category: string;
  quantity: string;
  price: string;
  shippingCharge: string;
  gst: string;
  totalAmount: string;
};

export type ShippingDetail = {
  label: string;
  value: string;
  detail: string;
};

export type OrderTrackingData = {
  orderId: string;
  orderDate: string;
  supplierName: string;
  supplierLocation: string;
  paymentStatus: string;
  orderStatus: string;
  deliveryStatus: string;
  invoiceStatus: string;
  product: OrderTrackingProduct;
  timeline: TimelineStep[];
  alternativeTimeline: TimelineStep[];
  shippingDetails: ShippingDetail[];
  freightFlow: TimelineStep[];
  supportActions: string[];
  invoiceActions: string[];
  alerts: OrderAlert[];
};

const featured = getFeaturedProducts(6);

export function getOrderTrackingData(orderId: string): OrderTrackingData {
  const product = featured[Math.abs(hashOrderId(orderId)) % featured.length] ?? featured[0];
  const quantity = product.category.toLowerCase().includes("feed") ? 12 : 3;
  const price = Math.max(product.price, 549);
  const shipping = product.category.toLowerCase().includes("feed") ? 0 : 180;
  const gst = Math.round(price * quantity * 0.12);
  const total = price * quantity + shipping + gst;
  const freightOnActual = product.category.toLowerCase().includes("feed");

  return {
    orderId: orderId.toUpperCase(),
    orderDate: "16 Jun 2026, 10:42 AM",
    supplierName: product.brand || "AnimKart Verified Supplier",
    supplierLocation: freightOnActual ? "Hisar, Haryana" : "Delhi NCR",
    paymentStatus: freightOnActual ? "Paid - freight pending" : "Paid",
    orderStatus: freightOnActual ? "Supplier confirmation pending" : "Packed",
    deliveryStatus: freightOnActual ? "Awaiting freight confirmation" : "Dispatch scheduled",
    invoiceStatus: "GST invoice ready after dispatch",
    product: {
      image: product.image,
      name: product.name,
      brand: product.brand || "AnimKart Verified",
      category: product.category,
      quantity: `${quantity} ${freightOnActual ? "bags" : "units"}`,
      price: formatINR(price),
      shippingCharge: freightOnActual ? "Freight on Actual" : formatINR(shipping),
      gst: formatINR(gst),
      totalAmount: formatINR(total)
    },
    timeline: [
      { label: "Order Placed", detail: "AnimKart received your order and payment authorization.", time: "16 Jun, 10:42 AM", status: "complete" },
      { label: "Supplier Confirmation Pending", detail: "Supplier is checking stock, dispatch window and shipping rule.", time: "Current", status: freightOnActual ? "current" : "complete" },
      { label: "Supplier Accepted", detail: "Supplier confirms product availability and order acceptance.", time: freightOnActual ? "Pending" : "16 Jun, 11:18 AM", status: freightOnActual ? "pending" : "complete" },
      { label: "Packed", detail: "Product is packed and ready for dispatch from supplier warehouse.", time: freightOnActual ? "Pending" : "16 Jun, 3:40 PM", status: freightOnActual ? "pending" : "current" },
      { label: "Shipped", detail: "Courier pickup completed and tracking number becomes active.", time: "Pending", status: "pending" },
      { label: "Out For Delivery", detail: "Courier is on the way to the delivery address.", time: "Pending", status: "pending" },
      { label: "Delivered", detail: "Order delivered and invoice available for download.", time: "Expected 19 Jun", status: "pending" }
    ],
    alternativeTimeline: [
      { label: "Supplier Rejected", detail: "If stock or serviceability fails, order can move to rejection.", time: "Alternative", status: "pending" },
      { label: "Cancelled", detail: "Buyer or AnimKart can cancel before dispatch when eligible.", time: "Alternative", status: "pending" },
      { label: "Refund Initiated", detail: "Refund starts after cancellation or supplier rejection.", time: "Alternative", status: "pending" },
      { label: "Refund Completed", detail: "Amount reaches original payment method after gateway processing.", time: "Alternative", status: "pending" }
    ],
    shippingDetails: [
      { label: "Delivery Address", value: "Green Valley Dairy Farm, Sector 18, Gurugram, Haryana 122001", detail: "Business delivery address" },
      { label: "Supplier Location", value: freightOnActual ? "Hisar, Haryana" : "Delhi NCR warehouse", detail: "Dispatch origin" },
      { label: "Courier Partner", value: freightOnActual ? "To be assigned" : "Shiprocket Surface", detail: "Courier partner updates after dispatch" },
      { label: "Tracking Number", value: freightOnActual ? "Awaiting dispatch" : "AKTRK902184", detail: "Tracking activates after pickup" },
      { label: "Estimated Delivery", value: freightOnActual ? "After freight approval" : "19 Jun 2026", detail: "Estimated by courier SLA" },
      { label: "Freight On Actual Status", value: freightOnActual ? "Pending freight confirmation" : "Not applicable", detail: "Heavy or bulk shipping flow" },
      { label: "Buyer Pickup Status", value: freightOnActual ? "Available from supplier warehouse" : "Not selected", detail: "Buyer pickup can avoid freight delay" }
    ],
    freightFlow: [
      { label: "Pending Freight Confirmation", detail: "Supplier checks weight, route and freight cost.", time: "Current", status: freightOnActual ? "current" : "complete" },
      { label: "Supplier Added Freight Charge", detail: "Supplier shares final freight amount for buyer approval.", time: "Pending", status: freightOnActual ? "pending" : "complete" },
      { label: "Buyer Approves Freight", detail: "Buyer approves freight charge or switches to pickup.", time: "Pending", status: freightOnActual ? "pending" : "complete" },
      { label: "Order Moves To Dispatch", detail: "Order enters packing and dispatch queue.", time: "Pending", status: "pending" }
    ],
    supportActions: ["Contact Supplier", "WhatsApp Support", "Raise Ticket", "Request Refund", "Cancel Order"],
    invoiceActions: ["Download GST Invoice", "Download Payment Receipt", "Download Shipping Receipt"],
    alerts: freightOnActual
      ? [
          { title: "Supplier confirmation pending", detail: "Supplier must accept the order before dispatch.", severity: "warning" },
          { title: "Shipping charge pending", detail: "Freight on Actual charge will be confirmed by supplier.", severity: "warning" },
          { title: "Buyer pickup available", detail: "You can request pickup from the supplier warehouse.", severity: "info" }
        ]
      : [
          { title: "Dispatch scheduled", detail: "Your order is packed and waiting for courier pickup.", severity: "success" },
          { title: "Invoice will unlock after dispatch", detail: "GST invoice and shipping receipt become final after pickup.", severity: "info" }
        ]
  };
}

export const sampleOrderIds = ["AKB-2600", "AKB-2601", "AKB-2602", "AKB-2603"];

function hashOrderId(orderId: string) {
  return orderId.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
}
