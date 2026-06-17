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
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
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
  operationalInsights,
  revenueTrendData,
  shippingFailureData,
  shippingIssuesTable,
  supplierGrowthData,
  topProductsTable,
  topSuppliersTable,
  trafficSourceData
} from "@/lib/analytics-data";

const sidebarItems = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
  { label: "Suppliers", href: "#suppliers", icon: Building2 },
  { label: "Buyers", href: "#buyers", icon: Users },
  { label: "Products", href: "#products", icon: Package },
  { label: "Inventory", href: "#inventory", icon: ClipboardList },
  { label: "Orders", href: "#orders", icon: ShoppingCart },
  { label: "Shipping", href: "#shipping", icon: Truck },
  { label: "Vet Consultations", href: "#vet", icon: Stethoscope },
  { label: "B2B Leads", href: "#b2b", icon: ShieldCheck },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Settlements", href: "#settlements", icon: Wallet },
  { label: "Reports", href: "#reports", icon: FileText },
  { label: "Settings", href: "#settings", icon: Settings }
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

export const metadata = {
  title: "Analytics Command Center | AnimKart OS",
  description: "Premium AnimKart marketplace analytics command center for founders and admins."
};

export default function AnalyticsCommandCenterPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <DashboardSidebar active="Analytics" eyebrow="Command Center" items={sidebarItems} />

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge className="bg-emerald-50 text-[#0B8F47]">Founder View</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Real Product Catalog</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Orders/Vet events pending</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">Analytics Command Center</h1>
              </div>
              <div className="flex flex-wrap gap-3 2xl:justify-end">
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
            <section className="rounded-2xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/40" id="dashboard">
              <div className="grid gap-6 lg:grid-cols-[1fr_420px] lg:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Executive Overview</p>
                  <h2 className="mt-3 max-w-4xl text-2xl font-bold leading-tight sm:text-3xl">
                    Real catalog command center for product value, supplier depth, inventory risk and marketplace readiness.
                  </h2>
                  <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300">
                    This view uses the imported AnimKart WooCommerce product catalog. Buyer, order, vet,
                    payment and shipping event counts stay at zero until Supabase event tables are connected.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    ["North Star", "Catalog value"],
                    ["Risk", "Stock gaps"],
                    ["Growth Loop", "Supplier depth"],
                    ["Ops Mode", "Data clean-up"]
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

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1.35fr_0.85fr]" id="analytics">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <LineChart className="text-[#0B8F47]" size={20} />
                    Revenue Trend Line Chart
                  </CardTitle>
                  <CardDescription>Real catalog value and in-stock catalog value by top categories.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueTrendChart data={revenueTrendData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Traffic Source Pie Chart</CardTitle>
                  <CardDescription>Real catalog readiness split by images, stock and discount coverage.</CardDescription>
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
                  <CardDescription>Real product count by price band until order events are connected.</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrdersTrendChart data={ordersTrendData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Growth Area Chart</CardTitle>
                  <CardDescription>Real supplier/brand SKU depth from the product catalog.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierGrowthChart data={supplierGrowthData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Failure Trend Chart</CardTitle>
                  <CardDescription>Catalog operations issues by supplier: stock and image gaps.</CardDescription>
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
              {operationalInsights.map(([title, metric, detail]) => (
                <Card id={sectionId(title)} key={title}>
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
                  <CardTitle id="products">Top Products Table</CardTitle>
                  <CardDescription>Real products sorted by catalog price. Views/orders wait for Supabase events.</CardDescription>
                </CardHeader>
                <CardContent>
                  <AnalyticsTable columns={topProductColumns} rows={topProductsTable} />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle id="suppliers">Top Suppliers Table</CardTitle>
                  <CardDescription>Real supplier/brand grouping from imported products.</CardDescription>
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

            <section className="mt-6 grid gap-4 md:grid-cols-3" id="payments">
              {[
                ["Payments", "0 captured payments", "Payment records will populate from Supabase/Razorpay webhooks."],
                ["Settlements", "0 settlements due", "Supplier payout data is ready for settlement table mapping."],
                ["Settings", "Data mode: real catalog", "Current dashboard shows only verified activity metrics until event tables exist."]
              ].map(([title, metric, detail]) => (
                <Card id={sectionId(title)} key={title}>
                  <CardContent className="p-5">
                    <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">{title}</p>
                    <p className="mt-3 text-xl font-bold text-slate-950">{metric}</p>
                    <p className="mt-2 text-sm leading-6 text-slate-500">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}

function sectionId(title: string) {
  const map: Record<string, string> = {
    "Buyer Analytics": "buyers",
    "Supplier Analytics": "suppliers",
    "Order Analytics": "orders",
    "Shipping Analytics": "shipping-overview",
    "Inventory Analytics": "inventory-overview",
    "Vet Consultation Analytics": "vet",
    "B2B Lead Analytics": "b2b",
    "Marketplace Health": "marketplace-health",
    Payments: "payments",
    Settlements: "settlements",
    Settings: "settings"
  };

  return map[title] ?? title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}
