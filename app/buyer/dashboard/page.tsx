import Image from "next/image";
import Link from "next/link";
import {
  Bell,
  Building2,
  CreditCard,
  Download,
  Headphones,
  Heart,
  LayoutDashboard,
  MapPin,
  MessageCircle,
  Package,
  Phone,
  ReceiptText,
  RotateCcw,
  Search,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  Stethoscope,
  Truck,
  UserRound
} from "lucide-react";
import { DashboardAreaChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  bulkInquiries,
  buyerKpis,
  invoices,
  notifications,
  orderStatusTabs,
  profileSummary,
  recentOrders,
  recommendedProducts,
  repeatProducts,
  savedSuppliers,
  supportTickets,
  vetConsultations
} from "@/lib/buyer-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "/buyer/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "#orders", icon: ShoppingCart },
  { label: "Track Orders", href: "#track", icon: Truck },
  { label: "Wishlist", href: "#wishlist", icon: Heart },
  { label: "Repeat Purchases", href: "#repeat", icon: RotateCcw },
  { label: "Saved Suppliers", href: "#saved-suppliers", icon: ShieldCheck },
  { label: "Bulk Inquiries", href: "#bulk", icon: Building2 },
  { label: "Vet Consultations", href: "#vet", icon: Stethoscope },
  { label: "Addresses", href: "#profile", icon: MapPin },
  { label: "Payments", href: "#invoices", icon: CreditCard },
  { label: "Invoices", href: "#invoices", icon: ReceiptText },
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Profile Settings", href: "#profile", icon: UserRound }
];

const statusClass: Record<string, string> = {
  Pending: "bg-amber-50 text-amber-700",
  Processing: "bg-sky-50 text-sky-700",
  Shipped: "bg-blue-50 text-blue-700",
  Delivered: "bg-emerald-50 text-[#0B8F47]",
  Returned: "bg-orange-50 text-orange-700",
  Open: "bg-rose-50 text-rose-700",
  Resolved: "bg-emerald-50 text-[#0B8F47]",
  "In progress": "bg-amber-50 text-amber-700",
  Upcoming: "bg-sky-50 text-sky-700",
  "Prescription ready": "bg-emerald-50 text-[#0B8F47]",
  Completed: "bg-slate-100 text-slate-700"
};

export const metadata = {
  title: "Buyer Dashboard | AnimKart OS",
  description: "Premium buyer account, procurement and veterinary dashboard for AnimKart marketplace customers."
};

export default function BuyerDashboardPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Dashboard" eyebrow="Buyer Workspace" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Buyer View</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Farm Procurement</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">GST-ready account</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Buyer Dashboard</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search orders, suppliers, invoices, products..." />
                </div>
                <Button variant="outline">This month</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="overflow-hidden rounded-2xl bg-slate-950 text-white">
              <div className="grid gap-6 p-5 lg:grid-cols-[1.1fr_0.9fr] lg:p-7">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">AnimKart Buyer OS</p>
                  <h2 className="mt-4 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">
                    One account for orders, suppliers, repeat procurement, vet care and GST invoices.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-slate-300">
                    Built for farmers, poultry farms, dairy farms, pet owners and distributors who need Amazon-like
                    order control plus IndiaMART-style supplier buying workflows.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {["Track Shipment Live", "Reorder In One Click", "Request Bulk Quote", "Book Vet Consultation"].map((item) => (
                      <Button className="border-white/15 bg-white/10 text-white hover:bg-white/15" key={item} variant="outline">
                        {item}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[
                    ["Active Orders", "6 live shipments"],
                    ["Supplier Responses", "3 quotes received"],
                    ["Vet Reminder", "Today 5:30 PM"],
                    ["Invoice Center", "GST downloads ready"]
                  ].map(([label, value]) => (
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={label}>
                      <p className="text-xs uppercase tracking-wide text-emerald-200">{label}</p>
                      <p className="mt-2 text-xl font-bold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {buyerKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_390px]">
              <div className="grid gap-6">
                <Card id="orders">
                  <CardHeader className="gap-3 xl:flex-row xl:items-start xl:justify-between">
                    <div>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Track order status, supplier, freight, invoice and support actions from one place.</CardDescription>
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {orderStatusTabs.map((tab, index) => (
                        <Badge className={index === 0 ? "bg-[#0B8F47] text-white" : "shrink-0 bg-slate-100 text-slate-700"} key={tab}>
                          {tab}
                        </Badge>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {recentOrders.map((order) => (
                      <div className="grid gap-4 rounded-xl border border-slate-200 bg-white p-3 lg:grid-cols-[74px_1fr_auto]" key={order.orderId}>
                        <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-slate-100">
                          {order.image ? (
                            <Image alt={order.product} className="h-full w-full object-contain p-2" height={90} src={order.image} width={90} />
                          ) : (
                            <Package className="text-slate-300" />
                          )}
                        </div>
                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <p className="font-bold text-slate-950">{order.product}</p>
                            <Badge className={statusClass[order.status] ?? "bg-slate-100 text-slate-700"}>{order.status}</Badge>
                          </div>
                          <p className="mt-1 text-sm text-slate-500">{order.supplier} • {order.orderId}</p>
                          <div className="mt-3 grid gap-2 text-sm text-slate-600 sm:grid-cols-4">
                            <span>Value: <strong className="text-slate-950">{order.orderValue}</strong></span>
                            <span>Shipping: <strong className="text-slate-950">{order.shippingCharge}</strong></span>
                            <span>Tracking: <strong className="text-slate-950">{order.trackingNumber}</strong></span>
                            <span>Invoice: <strong className="text-slate-950">{order.invoice}</strong></span>
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-2 lg:w-44 lg:grid-cols-1">
                          <Button variant="outline"><Truck size={15} />Track</Button>
                          <Button variant="outline"><RotateCcw size={15} />Reorder</Button>
                          <Button variant="outline"><MessageCircle size={15} />Supplier</Button>
                          <Button><Download size={15} />Invoice</Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="repeat">
                    <CardHeader>
                      <CardTitle>Repeat Purchase Engine</CardTitle>
                      <CardDescription>Frequently ordered products, feed and medicine reorder reminders.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {repeatProducts.map((item) => (
                        <ProductMiniCard key={item.product} {...item} action="One click reorder" />
                      ))}
                    </CardContent>
                  </Card>
                  <Card id="wishlist">
                    <CardHeader>
                      <CardTitle>Recommended Products</CardTitle>
                      <CardDescription>Real AnimKart catalog suggestions for the buyer account.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {recommendedProducts.map((item) => (
                        <ProductMiniCard key={item.product} {...item} action="Save / add to cart" />
                      ))}
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="saved-suppliers">
                    <CardHeader>
                      <CardTitle>Saved Suppliers</CardTitle>
                      <CardDescription>Favorite supplier network with contact and store access.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {savedSuppliers.map((supplier) => (
                        <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between" key={supplier.name}>
                          <div className="flex items-center gap-3">
                            <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 font-black text-[#0B8F47]">{supplier.logo}</span>
                            <div>
                              <p className="font-bold text-slate-950">{supplier.name}</p>
                              <p className="text-sm text-slate-500">{supplier.location} • {supplier.products} products • {supplier.rating} rating</p>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button className="px-3" variant="outline"><Phone size={15} /></Button>
                            <Link
                              className="inline-flex h-10 items-center justify-center rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 transition hover:border-[#0B8F47] hover:text-[#0B8F47]"
                              href={`/stores/${supplier.slug}`}
                            >
                              Visit Store
                            </Link>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card id="bulk">
                    <CardHeader>
                      <CardTitle>Bulk Inquiry Status</CardTitle>
                      <CardDescription>IndiaMART-style quote tracking for farm and distributor procurement.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-3">
                      {bulkInquiries.map((inquiry) => (
                        <div className="rounded-xl border border-slate-200 bg-white p-4" key={inquiry.id}>
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <p className="font-bold text-slate-950">{inquiry.product}</p>
                              <p className="mt-1 text-sm text-slate-500">{inquiry.id} • {inquiry.quantity}</p>
                            </div>
                            <Badge>{inquiry.status}</Badge>
                          </div>
                          <p className="mt-3 text-sm font-semibold text-[#0B8F47]">{inquiry.responses}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="grid gap-6">
                <Card id="track">
                  <CardHeader>
                    <CardTitle>Track Order Widget</CardTitle>
                    <CardDescription>Live shipment summary for the latest order.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="rounded-xl bg-emerald-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">AKB-2601</p>
                      <p className="mt-2 text-2xl font-black text-slate-950">Shipped</p>
                      <p className="mt-2 text-sm text-slate-600">Expected delivery: 15 Jun 2026 • Tracking AKT90211</p>
                    </div>
                    <div className="mt-4 space-y-3">
                      {["Order placed", "Supplier accepted", "Packed", "Shipped", "Delivered"].map((step, index) => (
                        <div className="flex items-center gap-3" key={step}>
                          <span className={`size-3 rounded-full ${index < 4 ? "bg-[#0B8F47]" : "bg-slate-200"}`} />
                          <span className="text-sm font-semibold text-slate-700">{step}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card id="vet">
                  <CardHeader>
                    <CardTitle>Vet Consultation Panel</CardTitle>
                    <CardDescription>Upcoming and past consultations with prescription downloads.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {vetConsultations.map((item) => (
                      <div className="rounded-xl border border-slate-200 bg-white p-3" key={`${item.animal}-${item.date}`}>
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="font-bold text-slate-950">{item.animal}</p>
                            <p className="text-sm text-slate-500">{item.doctor} • {item.date}</p>
                          </div>
                          <Badge className={statusClass[item.status] ?? "bg-slate-100 text-slate-700"}>{item.status}</Badge>
                        </div>
                        <Button className="mt-3 w-full" variant="outline">{item.action}</Button>
                      </div>
                    ))}
                    <Button><Stethoscope size={16} />Book Consultation</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Order updates, supplier responses and vet reminders.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-3">
                    {notifications.map((item) => (
                      <div className="flex gap-3 rounded-lg bg-slate-50 p-3" key={item}>
                        <Sparkles className="mt-0.5 shrink-0 text-[#0B8F47]" size={16} />
                        <p className="text-sm font-semibold text-slate-700">{item}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </aside>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <Card id="invoices">
                <CardHeader>
                  <CardTitle>Invoice & GST Center</CardTitle>
                  <CardDescription>Download invoices, GST invoices and view payment history.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {invoices.map((invoice) => (
                    <div className="flex items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3" key={invoice.invoice}>
                      <div>
                        <p className="font-bold text-slate-950">{invoice.invoice}</p>
                        <p className="text-sm text-slate-500">{invoice.orderId} • {invoice.type} • {invoice.amount}</p>
                      </div>
                      <Button className="px-3" variant="outline"><Download size={15} /></Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card id="support">
                <CardHeader>
                  <CardTitle>Support Center</CardTitle>
                  <CardDescription>Open tickets, chat, WhatsApp and call support.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {supportTickets.map((ticket) => (
                    <div className="rounded-xl border border-slate-200 bg-white p-3" key={ticket.ticket}>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-bold text-slate-950">{ticket.topic}</p>
                          <p className="text-sm text-slate-500">{ticket.ticket} • {ticket.channel}</p>
                        </div>
                        <Badge className={statusClass[ticket.status] ?? "bg-slate-100 text-slate-700"}>{ticket.status}</Badge>
                      </div>
                      <Button className="mt-3 w-full" variant="outline">{ticket.action}</Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card id="profile">
                <CardHeader>
                  <CardTitle>Profile & Business Details</CardTitle>
                  <CardDescription>Buyer details, GST, addresses, payment methods and profile settings.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {profileSummary.map(([label, value]) => (
                    <div className="rounded-xl bg-slate-50 p-3" key={label}>
                      <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_380px]">
              <Card>
                <CardHeader>
                  <CardTitle>Procurement Spend Trend</CardTitle>
                  <CardDescription>Repeat purchases and recommended catalog value over recent buying cycles.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardAreaChart
                    data={repeatProducts.map((item, index) => ({
                      label: `Cycle ${index + 1}`,
                      value: Number(item.price.replace(/[^0-9]/g, "")) || 0
                    }))}
                  />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Shipping UX</CardTitle>
                  <CardDescription>Checkout/order-level states buyers must see clearly.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {[
                    "Shipping available",
                    "Shipping charge visible",
                    "Freight on Actual",
                    "Buyer pickup available",
                    "Delivery not available to pincode",
                    "Request quote instead"
                  ].map((item) => (
                    <div className="rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700" key={item}>
                      {item}
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function ProductMiniCard({
  action,
  category,
  image,
  price,
  product,
  reminder,
  stock,
  supplier
}: {
  action: string;
  category: string;
  image: string;
  price: string;
  product: string;
  reminder?: string;
  stock?: string;
  supplier: string;
}) {
  return (
    <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-3 sm:grid-cols-[72px_1fr]">
      <div className="grid aspect-square place-items-center overflow-hidden rounded-lg bg-slate-100">
        {image ? (
          <Image alt={product} className="h-full w-full object-contain p-2" height={80} src={image} width={80} />
        ) : (
          <Package className="text-slate-300" />
        )}
      </div>
      <div>
        <p className="text-xs font-bold uppercase text-[#0B8F47]">{category}</p>
        <p className="mt-1 line-clamp-2 font-bold text-slate-950">{product}</p>
        <p className="mt-1 text-sm text-slate-500">{supplier}</p>
        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
          <span className="font-black text-slate-950">{price}</span>
          <Badge className="bg-slate-100 text-slate-700">{reminder ?? stock}</Badge>
        </div>
        <Button className="mt-3 w-full" variant="outline">{action}</Button>
      </div>
    </div>
  );
}
