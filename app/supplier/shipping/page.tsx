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
  MapPin,
  Package,
  PackagePlus,
  Plus,
  Radio,
  Search,
  Settings,
  ShieldOff,
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
  blockedLocations,
  buyerPickupConfig,
  cityShippingRules,
  freightProducts,
  pincodeShippingRules,
  priorityRules,
  productShippingRules,
  shippingAlerts,
  shippingHealthScore,
  shippingKpis,
  shippingOrders,
  shippingTabs,
  stateShippingRules,
  weightShippingRules
} from "@/lib/shipping-management-data";
import { formatINR } from "@/lib/products";

const sidebarItems = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Store", href: "/stores", icon: Store },
  { label: "Products", href: "/supplier/dashboard#products", icon: Package },
  { label: "Add Product", href: "/supplier/dashboard#add-product", icon: PackagePlus },
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

export const metadata = {
  title: "Shipping Management Center | AnimKart Supplier OS",
  description: "Premium supplier shipping and logistics management center for AnimKart marketplace sellers."
};

export default function SupplierShippingPage() {
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
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Supplier Shipping</span>
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {sidebarItems.map((item) => {
                const active = item.href === "/supplier/shipping";
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
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Shipping validation</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Product cannot go live unless shipping is configured or Freight On Actual is enabled.
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
                  <Badge className="bg-slate-100 text-slate-700">Shipping Management Center</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Live rule priority engine</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Shipping Management Center</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search pincode, state, city, order, courier..." />
                </div>
                <Button className="w-full sm:w-auto" variant="outline">Last 30 days</Button>
                <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
            <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
              <div className="flex gap-2 overflow-x-auto">
                {shippingTabs.map((tab) => (
                  <button
                    className={
                      tab === "State Wise Shipping"
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
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Logistics operating system</p>
                    <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-5xl">
                      Configure shipping by state, city, pincode, weight, product type, freight and pickup rules.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                      Reduce order failures and cancellations by giving every product a clear shipping path before it goes live.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Add Shipping Rule", Icon: Plus },
                      { label: "Import Shipping Rules", Icon: Upload },
                      { label: "Export Shipping Rules", Icon: FileDown },
                      { label: "Add Pincode", Icon: MapPin },
                      { label: "Add State Rule", Icon: Truck },
                      { label: "Add Freight Rule", Icon: Package }
                    ].map(({ label, Icon }) => (
                      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white hover:bg-white/15" key={label} type="button">
                        <Icon size={16} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {shippingKpis.map((kpi) => {
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
                {shippingAlerts.map((alert) => (
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

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <ShippingTableCard
                  columns={["State", "Delivery Charge", "Min Order Value", "Free Shipping Above", "Status", "Actions"]}
                  rows={stateShippingRules.map((rule) => [rule.state, formatINR(rule.deliveryCharge), formatINR(rule.minOrderValue), formatINR(rule.freeShippingAbove), rule.status, "Edit Rule"])}
                  title="State Wise Shipping"
                />
                <ShippingTableCard
                  columns={["City", "Delivery Charge", "Delivery Days", "Status", "Actions"]}
                  rows={cityShippingRules.map((rule) => [rule.city, formatINR(rule.deliveryCharge), rule.deliveryDays, rule.status, "Edit Rule"])}
                  title="City Wise Shipping"
                />
                <ShippingTableCard
                  columns={["Pincode", "Location", "Delivery Charge", "Delivery Time", "Status", "Actions"]}
                  rows={pincodeShippingRules.map((rule) => [rule.pincode, rule.location, formatINR(rule.deliveryCharge), rule.deliveryTime, rule.status, "Edit Rule"])}
                  title="Pincode Wise Shipping"
                />
                <ShippingTableCard
                  columns={["Weight Slab", "Delivery Charge", "Status", "Actions"]}
                  rows={weightShippingRules.map((rule) => [rule.slab, rule.deliveryCharge ? formatINR(rule.deliveryCharge) : "Freight on Actual", rule.status, "Edit Rule"])}
                  title="Weight Based Shipping"
                />
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <ShippingTableCard
                  columns={["Product Type", "Delivery Charge", "Handling", "Status", "Actions"]}
                  rows={productShippingRules.map((rule) => [rule.category, rule.deliveryCharge ? formatINR(rule.deliveryCharge) : "Freight on Actual", rule.handling, rule.status, "Edit Rule"])}
                  title="Product Wise Shipping"
                />
                <ShippingTableCard
                  columns={["Type", "Value", "Reason", "Status", "Actions"]}
                  rows={blockedLocations.map((rule) => [rule.type, rule.value, rule.reason, rule.status, "Unblock / Edit"])}
                  title="Blocked Locations"
                />
              </section>

              <section className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Order Shipping Panel</CardTitle>
                    <CardDescription>Track shipping cost, courier assignment, delivery state and issue reasons.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[980px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                            {["Order ID", "Buyer Location", "Shipping Cost", "Courier Assigned", "Delivery Status", "Tracking Number", "Shipping Issue"].map((column) => (
                              <th className="px-4 py-3 font-semibold" key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {shippingOrders.map((order) => (
                            <tr className="border-b border-slate-100 last:border-0" key={order.orderId}>
                              <td className="px-4 py-4 font-bold text-slate-950">{order.orderId}</td>
                              <td className="px-4 py-4 text-slate-600">{order.buyerLocation}</td>
                              <td className="px-4 py-4 font-bold text-slate-950">{order.shippingCost ? formatINR(order.shippingCost) : "FOA"}</td>
                              <td className="px-4 py-4 text-slate-600">{order.courierAssigned}</td>
                              <td className="px-4 py-4">
                                <Badge className={order.deliveryStatus === "Failed" ? "bg-rose-50 text-rose-700" : "bg-emerald-50 text-[#0B8F47]"}>
                                  {order.deliveryStatus}
                                </Badge>
                              </td>
                              <td className="px-4 py-4 text-slate-600">{order.trackingNumber}</td>
                              <td className="px-4 py-4 text-slate-600">{order.shippingIssue}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Health Score</CardTitle>
                  <CardDescription>95+ Excellent, 80+ Good, 60+ Warning, below 60 Critical.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid place-items-center rounded-2xl bg-slate-950 p-6 text-white">
                    <div className="grid size-32 place-items-center rounded-full border-[10px] border-[#0B8F47] bg-white text-4xl font-black text-slate-950">
                      {shippingHealthScore}
                    </div>
                    <p className="mt-4 text-center text-sm text-slate-300">
                      Based on rule completion, failed deliveries, shipping accuracy and delivery performance.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Shipping Rule Priority Engine</CardTitle>
                  <CardDescription>Validation order before default shipping is used.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {priorityRules.map((rule, index) => (
                      <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3" key={rule}>
                        <span className="grid size-9 place-items-center rounded-full bg-emerald-50 text-sm font-black text-[#0B8F47]">{index + 1}</span>
                        <p className="font-semibold text-slate-950">{rule}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Freight On Actual Module</CardTitle>
                  <CardDescription>Buyer sees shipping charge will be confirmed after order placement.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {freightProducts.map((item) => (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={item.product}>
                        <p className="line-clamp-1 text-sm font-bold text-slate-950">{item.product}</p>
                        <p className="mt-1 text-xs text-slate-500">{item.category}</p>
                        <Badge className={item.freightStatus === "Enabled" ? "mt-2 bg-emerald-50 text-[#0B8F47]" : "mt-2 bg-amber-50 text-amber-700"}>{item.freightStatus}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Buyer Pickup Module</CardTitle>
                  <CardDescription>Warehouse pickup configuration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      ["Enable Pickup", buyerPickupConfig.enabled],
                      ["Warehouse Address", buyerPickupConfig.warehouseAddress],
                      ["Pickup Contact Person", buyerPickupConfig.pickupContactPerson],
                      ["Pickup Timing", buyerPickupConfig.pickupTiming]
                    ].map(([label, value]) => (
                      <div className="rounded-lg bg-slate-50 p-3" key={label}>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                        <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Daily logistics controls.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Add Rule", Icon: Plus },
                      { label: "Edit Rule", Icon: FileText },
                      { label: "Block Location", Icon: ShieldOff },
                      { label: "Enable Pickup", Icon: MapPin },
                      { label: "Enable Freight", Icon: Package },
                      { label: "Assign Courier", Icon: Truck },
                      { label: "Export Report", Icon: Download }
                    ].map(({ label, Icon }) => (
                      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-900 hover:border-[#0B8F47] hover:text-[#0B8F47]" key={label} type="button">
                        <Icon size={16} />
                        {label}
                      </button>
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

function ShippingTableCard({ columns, rows, title }: { columns: string[]; rows: string[][]; title: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>Configure charges, coverage and status for this rule layer.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[620px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                {columns.map((column) => (
                  <th className="px-4 py-3 font-semibold" key={column}>{column}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr className="border-b border-slate-100 last:border-0" key={row.join("-")}>
                  {row.map((cell, index) => (
                    <td className={index === 0 ? "px-4 py-4 font-bold text-slate-950" : "px-4 py-4 text-slate-600"} key={`${cell}-${index}`}>
                      {index === row.length - 2 ? <Badge>{cell}</Badge> : cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
