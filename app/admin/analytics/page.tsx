import Link from "next/link";
import {
  BarChart3,
  Bell,
  Building2,
  ClipboardList,
  CreditCard,
  FileText,
  LayoutDashboard,
  LineChart,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  Users,
  Wallet
} from "lucide-react";
import { AnalyticsKpiCard } from "@/components/analytics/analytics-kpi-card";
import { AnalyticsTable } from "@/components/analytics/analytics-table";
import { CategoryPerformanceChart } from "@/components/analytics/category-performance-chart";
import { DateRangeFilter } from "@/components/analytics/date-range-filter";
import { ExportReportButton } from "@/components/analytics/export-report-button";
import { LiveActivityFeed } from "@/components/analytics/live-activity-feed";
import { OrdersTrendChart } from "@/components/analytics/orders-trend-chart";
import { RevenueTrendChart } from "@/components/analytics/revenue-trend-chart";
import { ShippingFailureChart } from "@/components/analytics/shipping-failure-chart";
import { SupplierGrowthChart } from "@/components/analytics/supplier-growth-chart";
import { TrafficSourceChart } from "@/components/analytics/traffic-source-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  analyticsKpis,
  categoryPerformanceData,
  inventoryAlertsTable,
  liveActivities,
  ordersTrendData,
  revenueTrendData,
  shippingFailureData,
  shippingIssuesTable,
  supplierGrowthData,
  topProductsTable,
  topSuppliersTable,
  trafficSourceData
} from "@/lib/analytics-data";

const sidebarItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Suppliers", href: "/supplier", icon: Building2 },
  { label: "Buyers", href: "/account", icon: Users },
  { label: "Products", href: "/products", icon: Package },
  { label: "Inventory", href: "/admin/analytics#inventory", icon: ClipboardList },
  { label: "Orders", href: "/orders", icon: ShoppingCart },
  { label: "Shipping", href: "/admin/analytics#shipping", icon: Truck },
  { label: "Vet Consultations", href: "/vet", icon: Stethoscope },
  { label: "B2B Leads", href: "/bulk-inquiry", icon: ShieldCheck },
  { label: "Payments", href: "/admin/analytics#payments", icon: CreditCard },
  { label: "Settlements", href: "/admin/analytics#settlements", icon: Wallet },
  { label: "Reports", href: "/admin/analytics#reports", icon: FileText },
  { label: "Settings", href: "/admin/analytics#settings", icon: Settings }
];

const topProductColumns = [
  { key: "product", label: "Product" },
  { key: "category", label: "Category" },
  { key: "supplier", label: "Supplier" },
  { key: "views", label: "Views" },
  { key: "orders", label: "Orders" },
  { key: "revenue", label: "Revenue" },
  { key: "conversion", label: "Conversion Rate" }
];

const topSupplierColumns = [
  { key: "supplier", label: "Supplier" },
  { key: "location", label: "Location" },
  { key: "products", label: "Products" },
  { key: "orders", label: "Orders" },
  { key: "revenue", label: "Revenue" },
  { key: "rating", label: "Rating" },
  { key: "inventory", label: "Inventory Score" }
];

const shippingColumns = [
  { key: "supplier", label: "Supplier" },
  { key: "orderId", label: "Order ID" },
  { key: "issueType", label: "Issue Type" },
  { key: "location", label: "Location" },
  { key: "status", label: "Status" },
  { key: "action", label: "Action" }
];

const inventoryColumns = [
  { key: "product", label: "Product" },
  { key: "supplier", label: "Supplier" },
  { key: "stockStatus", label: "Stock Status" },
  { key: "lastUpdated", label: "Last Updated" },
  { key: "action", label: "Action" }
];

const operationalSections = [
  ["Buyer Analytics", "31,408 active buyers", "Repeat purchase up 11.2% across feed and pet care."],
  ["Supplier Analytics", "2,184 live suppliers", "Approval queue stable with strong inventory response."],
  ["Order Analytics", "48,920 orders", "AOV improved after bulk quote and GST billing prompts."],
  ["Shipping Analytics", "24 current failures", "Hassan and Patna need ops follow-up today."],
  ["Inventory Analytics", "4 critical alerts", "Fast-moving dairy and poultry SKUs need buffer stock."],
  ["Vet Consultation Analytics", "6,742 bookings", "Poultry and dairy advisory are the strongest cohorts."],
  ["B2B Lead Analytics", "312 open leads", "High-value leads are concentrated in feed and equipment."],
  ["Marketplace Health", "96% trust score", "Core marketplace metrics are tracking above target."]
];

export const metadata = {
  title: "Analytics Command Center | AnimKart OS",
  description: "Premium AnimKart marketplace analytics command center for founders and admins."
};

export default function AnalyticsCommandCenterPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white xl:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-white/10 p-6">
              <Link className="flex items-center gap-3" href="/">
                <span className="grid size-11 place-items-center rounded-xl bg-[#0B8F47] text-xl font-black">A</span>
                <span>
                  <span className="block text-lg font-bold">AnimKart OS</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Command Center</span>
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {sidebarItems.map((item) => (
                <Link
                  className={
                    item.label === "Analytics"
                      ? "flex items-center gap-3 rounded-lg bg-[#0B8F47] px-3 py-2.5 text-sm font-semibold text-white"
                      : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white"
                  }
                  href={item.href}
                  key={item.label}
                >
                  <item.icon size={18} />
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="m-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Realtime layer</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Supabase-ready model for Postgres, Auth, Storage, Edge Functions and Realtime events.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
            <div className="flex flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-50 text-[#0B8F47]">Founder View</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Live Marketplace</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Realtime-ready</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Analytics Command Center</h1>
              </div>
              <div className="flex flex-col gap-3 xl:flex-row xl:items-center">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search suppliers, orders, SKUs..." />
                </div>
                <DateRangeFilter />
                <ExportReportButton />
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-2xl shadow-slate-300/50">
              <div className="grid gap-6 lg:grid-cols-[1fr_380px] lg:items-end">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Executive Overview</p>
                  <h2 className="mt-4 max-w-4xl text-4xl font-bold leading-tight">
                    One operating layer for revenue, demand, supply, logistics, inventory and veterinary trust.
                  </h2>
                  <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300">
                    Built as AnimKart&apos;s mission control center for founders and admins to monitor marketplace momentum,
                    exceptions and growth loops in real time.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["North Star", "GMV velocity"],
                    ["Risk", "Shipping SLA"],
                    ["Growth Loop", "Vet to cart"],
                    ["Ops Mode", "Live command"]
                  ].map(([label, value]) => (
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={label}>
                      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
                      <p className="mt-2 font-semibold">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {analyticsKpis.map((kpi) => (
                <AnalyticsKpiCard key={kpi.id} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1.35fr_0.85fr]">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="text-[#0B8F47]" size={20} />
                    Revenue Trend Line Chart
                  </CardTitle>
                  <CardDescription>Revenue and GMV in lakhs across the current operating window.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueTrendChart data={revenueTrendData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Source Pie Chart</CardTitle>
                  <CardDescription>Demand engine split across organic, paid, WhatsApp and referral traffic.</CardDescription>
                </CardHeader>
                <CardContent>
                  <TrafficSourceChart data={trafficSourceData} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle>Orders Trend Bar Chart</CardTitle>
                  <CardDescription>Daily order load for marketplace operations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdersTrendChart data={ordersTrendData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Growth Area Chart</CardTitle>
                  <CardDescription>Verified supplier network expansion.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierGrowthChart data={supplierGrowthData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Failure Trend Chart</CardTitle>
                  <CardDescription>Failed or delayed shipment incidents by week.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ShippingFailureChart data={shippingFailureData} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_420px]">
              <Card>
                <CardHeader>
                  <CardTitle>Category Performance Bar Chart</CardTitle>
                  <CardDescription>Marketplace Analytics across revenue and order concentration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoryPerformanceChart data={categoryPerformanceData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Live Activity Feed</CardTitle>
                  <CardDescription>Realtime marketplace events ready for Supabase Realtime channels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <LiveActivityFeed activities={liveActivities} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {operationalSections.map(([title, metric, detail]) => (
                <Card id={title.toLowerCase().split(" ")[0]} key={title}>
                  <CardContent className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">{title}</p>
                    <p className="mt-3 text-xl font-bold text-slate-950">{metric}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </section>

            <section className="mt-6 grid gap-6" id="reports">
              <Card>
                <CardHeader>
                  <CardTitle>Top Products Table</CardTitle>
                  <CardDescription>Product, Category, Supplier, Views, Orders, Revenue and Conversion Rate.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable columns={topProductColumns} rows={topProductsTable} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Top Suppliers Table</CardTitle>
                  <CardDescription>Supplier performance, inventory quality and revenue concentration.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable columns={topSupplierColumns} rows={topSuppliersTable} />
                </CardContent>
              </Card>

              <div className="grid gap-6 2xl:grid-cols-2">
                <Card id="shipping">
                  <CardHeader>
                    <CardTitle>Shipping Issues Table</CardTitle>
                    <CardDescription>Supplier, Order ID, Issue Type, Location, Status and Action.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsTable columns={shippingColumns} rows={shippingIssuesTable} />
                  </CardContent>
                </Card>
                <Card id="inventory">
                  <CardHeader>
                    <CardTitle>Inventory Alerts Table</CardTitle>
                    <CardDescription>Product, Supplier, Stock Status, Last Updated and Action.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <AnalyticsTable columns={inventoryColumns} rows={inventoryAlertsTable} />
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
