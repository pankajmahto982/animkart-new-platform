import Link from "next/link";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CreditCard,
  Download,
  FileDown,
  FileText,
  Headphones,
  LayoutDashboard,
  MessageCircle,
  Package,
  Phone,
  Printer,
  Radio,
  Search,
  Settings,
  Share2,
  ShoppingCart,
  Store,
  Truck,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  orderAlerts,
  orderKpis,
  orderStatusTabs,
  paymentBreakdown,
  performanceWidgets,
  selectedOrder,
  supplierOrders
} from "@/lib/order-management-data";
import { formatINR } from "@/lib/products";

const sidebarItems = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Store", href: "/stores", icon: Store },
  { label: "Products", href: "/supplier/dashboard#products", icon: Package },
  { label: "Add Product", href: "/supplier/dashboard#add-product", icon: Package },
  { label: "Bulk Upload", href: "/supplier/dashboard#bulk-upload", icon: FileText },
  { label: "Inventory", href: "/supplier/inventory", icon: FileText },
  { label: "Orders", href: "/supplier/orders", icon: ShoppingCart },
  { label: "Shipping", href: "/supplier/shipping", icon: Truck },
  { label: "Payments", href: "/supplier/dashboard#payments", icon: CreditCard },
  { label: "Support", href: "/supplier/dashboard#support", icon: Headphones },
  { label: "Settings", href: "/supplier/dashboard#settings", icon: Settings }
];

const toneClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

const statusClass: Record<string, string> = {
  New: "bg-sky-50 text-sky-700",
  "Pending Confirmation": "bg-amber-50 text-amber-700",
  Accepted: "bg-emerald-50 text-[#0B8F47]",
  Rejected: "bg-rose-50 text-rose-700",
  Packed: "bg-indigo-50 text-indigo-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-[#0B8F47]",
  Cancelled: "bg-rose-50 text-rose-700",
  Returned: "bg-orange-50 text-orange-700"
};

export const metadata = {
  title: "Order Management Center | AnimKart Supplier OS",
  description: "Premium supplier order management center for AnimKart marketplace sellers."
};

export default function SupplierOrdersPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white xl:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-white/10 p-6">
              <Link className="flex items-center gap-3" href="/supplier/dashboard">
                <span className="grid size-11 place-items-center rounded-xl bg-[#0B8F47] text-xl font-black">A</span>
                <span>
                  <span className="block text-lg font-bold">AnimKart OS</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Supplier Orders</span>
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {sidebarItems.map((item) => {
                const active = item.href === "/supplier/orders";
                return (
                  <Link
                    className={
                      active
                        ? "flex items-center gap-3 rounded-lg bg-[#0B8F47] px-3 py-2.5 text-sm font-semibold text-white"
                        : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white"
                    }
                    href={item.href}
                    key={item.label}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="m-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Order SLA</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Accept, pack, ship and update buyers quickly to reduce cancellations and shipping issues.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Supplier OS</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Order Management Center</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Amazon-style workflow</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Order Management Center</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search order ID, buyer, product, tracking..." />
                </div>
                <Button className="w-full sm:w-auto" variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
            <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
              <div className="flex gap-2 overflow-x-auto">
                {orderStatusTabs.map((tab) => (
                  <button
                    className={
                      tab === "All Orders"
                        ? "inline-flex h-10 shrink-0 items-center rounded-full bg-[#0B8F47] px-4 text-sm font-semibold text-white"
                        : "inline-flex h-10 shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-[#0B8F47] hover:text-[#0B8F47]"
                    }
                    key={tab}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-6 px-4 py-6 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0">
              <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_440px] xl:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Order command workspace</p>
                    <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-5xl">
                      Accept, pack, ship, invoice and communicate with buyers from one high-speed order console.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                      Designed for suppliers managing hundreds of veterinary, feed, supplement and equipment orders with strict dispatch SLAs.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["View Orders", ShoppingCart],
                      ["Download Orders", Download],
                      ["Export CSV", FileDown],
                      ["Print Invoice", Printer],
                      ["Bulk Update Status", Upload]
                    ].map(([label, Icon]) => (
                      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white hover:bg-white/15" key={label as string} type="button">
                        <Icon size={16} />
                        {label as string}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {orderKpis.map((kpi) => {
                  const Icon = kpi.tone === "healthy" ? CheckCircle2 : kpi.tone === "critical" ? AlertTriangle : Radio;
                  return (
                    <Card key={kpi.label}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{kpi.label}</p>
                            <p className="mt-2 text-2xl font-black text-slate-950">{kpi.value}</p>
                          </div>
                          <span className={`grid size-9 place-items-center rounded-lg ${toneClass[kpi.tone]}`}>
                            <Icon size={16} />
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-500">{kpi.helper}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {orderAlerts.map((alert) => (
                  <Card key={alert.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-950">{alert.title}</p>
                          <p className="mt-1 text-sm leading-5 text-slate-500">{alert.detail}</p>
                        </div>
                        <span className={`grid min-h-10 min-w-10 place-items-center rounded-xl px-2 text-sm font-bold ${toneClass[alert.tone]}`}>
                          {alert.count}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <section className="mt-6">
                <Card>
                  <CardHeader className="gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <CardTitle>Main Order Table</CardTitle>
                      <CardDescription>High-volume order queue with payment, delivery and supplier action state.</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Accept Order", "Reject Order", "Generate Invoice", "Print Shipping Label", "Mark Packed", "Mark Shipped", "Mark Delivered"].map((action) => (
                        <Button className="h-9" key={action} variant="outline">{action}</Button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[1320px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                            {[
                              "Order ID",
                              "Date",
                              "Buyer Name",
                              "Product",
                              "Supplier",
                              "Quantity",
                              "Order Value",
                              "Shipping Charge",
                              "Payment Status",
                              "Order Status",
                              "Delivery Status",
                              "Actions"
                            ].map((column) => (
                              <th className="px-4 py-3 font-semibold" key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {supplierOrders.map((order) => (
                            <tr className="border-b border-slate-100 last:border-0" key={order.orderId}>
                              <td className="px-4 py-4 font-bold text-slate-950">{order.orderId}</td>
                              <td className="px-4 py-4 text-slate-600">{order.date}</td>
                              <td className="px-4 py-4 font-semibold text-slate-800">{order.buyerName}</td>
                              <td className="max-w-[260px] px-4 py-4 text-slate-600">
                                <span className="line-clamp-2">{order.product}</span>
                              </td>
                              <td className="px-4 py-4 text-slate-600">{order.supplier}</td>
                              <td className="px-4 py-4 text-slate-600">{order.quantity}</td>
                              <td className="px-4 py-4 font-bold text-slate-950">{formatINR(order.orderValue)}</td>
                              <td className="px-4 py-4 text-slate-600">{formatINR(order.shippingCharge)}</td>
                              <td className="px-4 py-4">
                                <Badge className={order.paymentStatus === "Paid" ? "bg-emerald-50 text-[#0B8F47]" : "bg-amber-50 text-amber-700"}>
                                  {order.paymentStatus}
                                </Badge>
                              </td>
                              <td className="px-4 py-4">
                                <Badge className={statusClass[order.orderStatus]}>{order.orderStatus}</Badge>
                              </td>
                              <td className="px-4 py-4 text-slate-600">{order.deliveryStatus}</td>
                              <td className="px-4 py-4">
                                <Button className="h-9" variant="outline">Open</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Status Flow</CardTitle>
                    <CardDescription>Standard seller order lifecycle with exception exits.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {["New Order", "Supplier Confirmation Pending", "Accepted", "Packed", "Shipped", "Delivered"].map((step, index) => (
                        <div className="flex items-center gap-3" key={step}>
                          <span className="grid size-9 place-items-center rounded-full bg-emerald-50 text-sm font-bold text-[#0B8F47]">{index + 1}</span>
                          <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 p-3 font-semibold text-slate-950">{step}</div>
                        </div>
                      ))}
                      <div className="mt-2 grid gap-2 sm:grid-cols-3">
                        {["Rejected", "Cancelled", "Returned"].map((step) => (
                          <div className="rounded-lg bg-rose-50 p-3 text-center text-sm font-bold text-rose-700" key={step}>{step}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Widgets</CardTitle>
                    <CardDescription>Operating metrics to reduce cancellations and shipping issues.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {performanceWidgets.map((item) => (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.label}>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
                          <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.helper}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Order Detail Drawer</CardTitle>
                  <CardDescription>{selectedOrder.orderId}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      ["Buyer Information", selectedOrder.buyerName],
                      ["Shipping Address", selectedOrder.shippingAddress],
                      ["GST Details", selectedOrder.gstDetails],
                      ["Products Ordered", selectedOrder.product],
                      ["Shipping Charges", formatINR(selectedOrder.shippingCharge)],
                      ["Payment Details", selectedOrder.paymentStatus],
                      ["Invoice Download", "Ready after invoice generation"]
                    ].map(([label, value]) => (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={label}>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Section</CardTitle>
                  <CardDescription>Delivery partner, tracking and freight details.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      ["Delivery Partner", selectedOrder.deliveryPartner],
                      ["Tracking Number", selectedOrder.trackingNumber],
                      ["Expected Delivery", selectedOrder.expectedDelivery],
                      ["Actual Delivery", selectedOrder.actualDelivery],
                      ["Freight Charges", selectedOrder.freightCharges],
                      ["Shipping Notes", selectedOrder.shippingNotes]
                    ].map(([label, value]) => (
                      <div className="flex items-start justify-between gap-3 rounded-lg bg-slate-50 p-3" key={label}>
                        <p className="text-sm font-semibold text-slate-600">{label}</p>
                        <p className="text-right text-sm font-bold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buyer Communication</CardTitle>
                  <CardDescription>Contact buyer and share tracking updates.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      ["Call Buyer", Phone],
                      ["WhatsApp Buyer", MessageCircle],
                      ["Send Message", FileText],
                      ["Share Tracking Link", Share2]
                    ].map(([label, Icon]) => (
                      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 hover:border-[#0B8F47] hover:text-[#0B8F47]" key={label as string} type="button">
                        <Icon size={16} />
                        {label as string}
                      </button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Section</CardTitle>
                  <CardDescription>COD, paid, pending and refund status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {paymentBreakdown.map((item) => (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.label}>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.helper}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
