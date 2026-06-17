import Link from "next/link";
import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Home,
  Landmark,
  MapPin,
  PackageCheck,
  Phone,
  ShieldCheck,
  ShoppingCart,
  Store,
  Truck,
  WalletCards,
  Warehouse
} from "lucide-react";
import { ProductImage } from "@/components/product-image";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatINR, getFeaturedProducts } from "@/lib/products";

const checkoutItems = getFeaturedProducts(4).map((product, index) => ({
  product,
  quantity: index === 1 ? 2 : 1,
  moq: index === 2 ? "MOQ 10 bags" : "MOQ met",
  stockStatus: index === 3 ? "Confirm availability" : "In stock",
  shippingCharge: index === 2 ? 0 : [80, 120, 180, 100][index],
  shippingLabel: index === 2 ? "Freight on Actual" : formatINR([80, 120, 180, 100][index]),
  delivery: index === 2 ? "Supplier confirms freight after order" : ["2-4 days", "1-3 days", "4-6 days", "2-5 days"][index]
}));

const itemTotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
const shippingTotal = checkoutItems.reduce((sum, item) => sum + item.shippingCharge, 0);
const gst = Math.round(itemTotal * 0.18);
const discount = 240;
const platformFee = 29;
const grandTotal = itemTotal + shippingTotal + gst + platformFee - discount;

const steps = ["Login", "Address", "Shipping", "GST", "Payment", "Review"];
const savedAddresses = [
  { title: "Farm Address", icon: Home, detail: "Green Valley Dairy, Hisar, Haryana 125001", status: "Delivery available to your pincode" },
  { title: "Business Address", icon: Building2, detail: "Procurement Office, Delhi NCR 110025", status: "Fast delivery available" },
  { title: "Warehouse Address", icon: Warehouse, detail: "Buyer warehouse, Jaipur 302001", status: "Buyer pickup also available" }
];

const shippingMethods = [
  { title: "Pincode-wise Delivery", charge: formatINR(180), detail: "Best rule matched for 125001", status: "Delivery available to your pincode", tone: "healthy" },
  { title: "State-wise Delivery", charge: formatINR(120), detail: "Haryana supplier zone", status: "Backup rule", tone: "healthy" },
  { title: "Weight-based Delivery", charge: formatINR(250), detail: "5-10 kg slab", status: "Applies to feed and supplements", tone: "watch" },
  { title: "Freight on Actual", charge: "Pending", detail: "Heavy/bulk product freight", status: "Shipping charge will be confirmed after order", tone: "watch" },
  { title: "Buyer Pickup", charge: "Free", detail: "Pickup from supplier warehouse", status: "Buyer pickup available", tone: "healthy" },
  { title: "Blocked Location", charge: "Unavailable", detail: "Example error state", status: "Delivery not available to selected pincode", tone: "critical" }
];

const paymentOptions = [
  { title: "UPI", detail: "PhonePe, GPay, BHIM", icon: WalletCards },
  { title: "Cards", detail: "Credit and debit cards", icon: CreditCard },
  { title: "Net Banking", detail: "All major Indian banks", icon: Landmark },
  { title: "Wallet", detail: "Marketplace wallet ready", icon: WalletCards },
  { title: "COD", detail: "If supplier allows", icon: PackageCheck },
  { title: "Pay Later", detail: "For approved B2B buyers", icon: ShieldCheck }
];

const trustBadges = ["Secure Payment", "Verified Supplier", "GST Invoice", "Buyer Protection", "AnimKart Support"];
const errorStates = [
  "Supplier does not deliver to this pincode",
  "Shipping not configured",
  "Freight charge pending supplier confirmation",
  "Product out of stock",
  "MOQ not met",
  "Payment failed"
];

const toneClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export const metadata = {
  title: "Checkout | AnimKart",
  description: "Premium AnimKart marketplace checkout with shipping rules, GST and supplier trust."
};

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <SiteHeader />
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">AnimKart Secure Checkout</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight">Checkout</h1>
              <p className="mt-1 text-sm text-slate-500">
                Shipping charges, supplier rules, GST invoice and freight status are shown before payment.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              {trustBadges.map((badge) => (
                <Badge className="bg-emerald-50 text-[#0B8F47]" key={badge}>{badge}</Badge>
              ))}
            </div>
          </div>

          <div className="mt-5 grid gap-2 md:grid-cols-6">
            {steps.map((step, index) => (
              <div className={index < 5 ? "rounded-xl bg-[#0B8F47] p-3 text-center text-sm font-bold text-white" : "rounded-xl bg-slate-100 p-3 text-center text-sm font-bold text-slate-600"} key={step}>
                {index + 1}. {step}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
          <div className="grid gap-6">
            <Card>
              <CardHeader className="gap-3 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <CardTitle>1. Buyer Login</CardTitle>
                  <CardDescription>Continue as a buyer, farm account or B2B procurement user.</CardDescription>
                </div>
                <Badge className="bg-emerald-50 text-[#0B8F47]">Logged in as Green Valley Dairy</Badge>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-3">
                {["Buyer account verified", "Phone OTP verified", "Business profile ready"].map((item) => (
                  <div className="flex items-center gap-3 rounded-xl bg-slate-50 p-3" key={item}>
                    <CheckCircle2 className="text-[#0B8F47]" size={18} />
                    <span className="text-sm font-semibold text-slate-700">{item}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Delivery Address</CardTitle>
                <CardDescription>Choose saved address or add a farm, business or warehouse address.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 lg:grid-cols-3">
                  {savedAddresses.map((address, index) => (
                    <button
                      className={index === 0 ? "rounded-xl border-2 border-[#0B8F47] bg-emerald-50 p-4 text-left" : "rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-[#0B8F47]"}
                      key={address.title}
                      type="button"
                    >
                      <address.icon className="text-[#0B8F47]" size={22} />
                      <p className="mt-3 font-bold text-slate-950">{address.title}</p>
                      <p className="mt-1 text-sm leading-6 text-slate-500">{address.detail}</p>
                      <Badge className="mt-3 bg-white text-[#0B8F47]">{address.status}</Badge>
                    </button>
                  ))}
                </div>

                <div className="mt-5 rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="font-bold text-slate-950">Add New Address</p>
                  <div className="mt-4 grid gap-4 md:grid-cols-2">
                    {["Name", "Phone", "City", "State", "Pincode", "GST Number", "Business Name"].map((field) => (
                      <label className="grid gap-2 text-sm font-semibold text-slate-700" key={field}>
                        {field}
                        <Input placeholder={field} />
                      </label>
                    ))}
                    <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                      Address
                      <textarea className="min-h-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#0B8F47]" placeholder="House, village, district, landmark, warehouse gate..." />
                    </label>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Shipping Method</CardTitle>
                <CardDescription>Shipping is calculated from supplier rules: state, city, pincode, weight, product, freight or pickup.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
                {shippingMethods.map((method, index) => (
                  <button
                    className={index === 0 ? "rounded-xl border-2 border-[#0B8F47] bg-white p-4 text-left shadow-sm" : "rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-[#0B8F47]"}
                    key={method.title}
                    type="button"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <Truck className="text-[#0B8F47]" size={21} />
                      <Badge className={toneClass[method.tone as keyof typeof toneClass]}>{method.charge}</Badge>
                    </div>
                    <p className="mt-3 font-bold text-slate-950">{method.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{method.detail}</p>
                    <p className={method.tone === "critical" ? "mt-3 text-sm font-bold text-rose-700" : "mt-3 text-sm font-bold text-[#0B8F47]"}>
                      {method.status}
                    </p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. GST Invoice Details</CardTitle>
                <CardDescription>GST invoice can be downloaded after order placement.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4 md:grid-cols-2">
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Buyer GST Number
                  <Input placeholder="06ABCDE1234F1Z5" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700">
                  Company Name
                  <Input placeholder="Green Valley Dairy Pvt Ltd" />
                </label>
                <label className="grid gap-2 text-sm font-semibold text-slate-700 md:col-span-2">
                  Billing Address
                  <Input placeholder="Use delivery address or enter billing address" />
                </label>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Payment</CardTitle>
                <CardDescription>Choose payment method. Payment capture should happen after delivery and shipping checks pass.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {paymentOptions.map((option, index) => (
                  <button
                    className={index === 0 ? "rounded-xl border-2 border-[#0B8F47] bg-emerald-50 p-4 text-left" : "rounded-xl border border-slate-200 bg-white p-4 text-left hover:border-[#0B8F47]"}
                    key={option.title}
                    type="button"
                  >
                    <option.icon className="text-[#0B8F47]" size={21} />
                    <p className="mt-3 font-bold text-slate-950">{option.title}</p>
                    <p className="mt-1 text-sm text-slate-500">{option.detail}</p>
                  </button>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Review Order Items</CardTitle>
                <CardDescription>Each item shows supplier, MOQ, stock, shipping charge and delivery estimate.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3">
                {checkoutItems.map((item) => (
                  <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-3 lg:grid-cols-[90px_1fr_auto]" key={item.product.id}>
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-slate-100">
                      <ProductImage alt={item.product.name} category={item.product.category} src={item.product.image} />
                    </div>
                    <div>
                      <p className="text-xs font-bold uppercase text-[#0B8F47]">{item.product.category}</p>
                      <h3 className="mt-1 font-bold text-slate-950">{item.product.name}</h3>
                      <p className="mt-1 text-sm text-slate-500">Supplier: {item.product.brand || "AnimKart Verified Supplier"}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        <Badge className={item.stockStatus === "In stock" ? "bg-emerald-50 text-[#0B8F47]" : "bg-amber-50 text-amber-700"}>{item.stockStatus}</Badge>
                        <Badge className={item.moq === "MOQ met" ? "bg-emerald-50 text-[#0B8F47]" : "bg-rose-50 text-rose-700"}>{item.moq}</Badge>
                        <Badge className="bg-slate-100 text-slate-700">Delivery: {item.delivery}</Badge>
                      </div>
                    </div>
                    <div className="grid gap-1 text-sm lg:w-44 lg:text-right">
                      <span>Qty: <strong>{item.quantity}</strong></span>
                      <span>Price: <strong>{formatINR(item.product.price)}</strong></span>
                      <span>Shipping: <strong>{item.shippingLabel}</strong></span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Error States Preview</CardTitle>
                <CardDescription>These states reduce cancellations by blocking bad orders before payment.</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 md:grid-cols-2">
                {errorStates.map((error) => (
                  <div className="flex gap-3 rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-700" key={error}>
                    <AlertTriangle className="mt-0.5 shrink-0" size={17} />
                    {error}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Final values before payment capture.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-3 text-sm">
                  {[
                    ["Item Total", formatINR(itemTotal)],
                    ["Shipping Charges", formatINR(shippingTotal)],
                    ["GST", formatINR(gst)],
                    ["Discount", `-${formatINR(discount)}`],
                    ["Platform Fee", formatINR(platformFee)]
                  ].map(([label, value]) => (
                    <div className="flex justify-between gap-3" key={label}>
                      <span className="text-slate-500">{label}</span>
                      <span className="font-bold text-slate-950">{value}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-200 pt-3">
                    <div className="flex items-end justify-between gap-3">
                      <span className="text-lg font-black">Grand Total</span>
                      <span className="text-2xl font-black text-[#0B8F47]">{formatINR(grandTotal)}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 rounded-xl bg-amber-50 p-3 text-sm font-semibold text-amber-800">
                  Freight on Actual item included. Final freight may be confirmed by supplier before dispatch.
                </div>

                <Link className="mt-5 flex h-12 items-center justify-center gap-2 rounded-lg bg-[#0B8F47] font-bold text-white shadow-sm hover:bg-[#08783c]" href="/order-success">
                  <CheckCircle2 size={18} />
                  Place Order Securely
                </Link>

                <div className="mt-4 grid gap-2">
                  {trustBadges.map((badge) => (
                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-700" key={badge}>
                      <ShieldCheck className="text-[#0B8F47]" size={17} />
                      {badge}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Success State</CardTitle>
                <CardDescription>Shown after successful order placement.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-2xl bg-emerald-50 p-4 text-center">
                  <CheckCircle2 className="mx-auto text-[#0B8F47]" size={42} />
                  <p className="mt-3 text-xl font-black text-slate-950">Order placed successfully</p>
                  <p className="mt-1 text-sm font-semibold text-slate-600">Order ID: AKO-2026-1042</p>
                </div>
                <div className="mt-3 grid gap-2">
                  <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-800" href="/orders">
                    <Truck size={16} />Track Order
                  </Link>
                  <button className="inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white font-bold text-slate-800" type="button">
                    <FileText size={16} />Download Invoice
                  </button>
                  <Link className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-slate-950 font-bold text-white" href="/products">
                    <ShoppingCart size={16} />Continue Shopping
                  </Link>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Supplier Rule Checks</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-3">
                {[
                  { icon: MapPin, label: "Pincode delivery", value: "Available for 125001" },
                  { icon: Store, label: "Supplier shipping", value: "Configured for 3 of 4 items" },
                  { icon: Truck, label: "Freight rule", value: "1 item requires supplier confirmation" },
                  { icon: Phone, label: "Support", value: "AnimKart support available after order" }
                ].map((item) => (
                  <div className="flex gap-3 rounded-xl bg-slate-50 p-3" key={item.label}>
                    <item.icon className="mt-1 text-[#0B8F47]" size={18} />
                    <div>
                      <p className="text-xs font-bold uppercase text-slate-500">{item.label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-800">{item.value}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </aside>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
