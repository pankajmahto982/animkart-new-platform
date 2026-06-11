import {
  BarChart3,
  Bell,
  Building2,
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  Megaphone,
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
import { DashboardAreaChart, DashboardBarChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { MetricPanel, RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  adminActivityFeed,
  adminKpis,
  adminPanels,
  adminQuickActions,
  buyerActivityRows,
  productApprovalRows,
  revenueChartData,
  supplierPerformanceRows,
  tableColumns,
  visitorChartData
} from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Suppliers", href: "#suppliers", icon: Building2 },
  { label: "Buyers", href: "#buyers", icon: Users },
  { label: "Products", href: "#products", icon: Package },
  { label: "Inventory", href: "#inventory", icon: FileText },
  { label: "Orders", href: "#orders", icon: ShoppingCart },
  { label: "Shipping", href: "#shipping", icon: Truck },
  { label: "Vet Consultations", href: "#vet", icon: Stethoscope },
  { label: "B2B Leads", href: "#b2b", icon: ShieldCheck },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Settlements", href: "#settlements", icon: Wallet },
  { label: "Notifications", href: "#notifications", icon: Megaphone },
  { label: "Support Tickets", href: "#support", icon: Headphones },
  { label: "CMS", href: "#cms", icon: FileText },
  { label: "Reports", href: "#reports", icon: FileText },
  { label: "Settings", href: "#settings", icon: Settings }
];

export const metadata = {
  title: "Super Admin Dashboard | AnimKart OS",
  description: "Full-platform AnimKart OS dashboard for super admins."
};

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Dashboard" eyebrow="Super Admin" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Super Admin</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Full Platform</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Realtime-ready</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">Super Admin Dashboard</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search suppliers, buyers, products, orders..." />
                </div>
                <Button variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="grid gap-5 2xl:grid-cols-[1fr_auto] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">AnimKart Mission Control</p>
                  <h2 className="mt-3 max-w-5xl text-2xl font-bold sm:text-3xl">
                    Control marketplace growth, supplier operations, inventory risk, vet services and payments in one dashboard.
                  </h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    Real catalog data is connected today. Buyer, order, payment, shipping and support counters are structured for Supabase event tables.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {adminQuickActions.map((action) => (
                    <Button className="h-9 border-white/15 bg-white/10 px-3 text-xs text-white hover:bg-white/15" key={action.label} variant="outline">
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {adminKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend Chart</CardTitle>
                  <CardDescription>Real catalog value by top categories until payment events are connected.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardAreaChart data={revenueChartData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Visitor Analytics Chart</CardTitle>
                  <CardDescription>Catalog readiness signals standing in for visitor events until analytics events exist.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardBarChart data={visitorChartData} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <Card id="orders">
                <CardHeader>
                  <CardTitle>Order Command Center</CardTitle>
                  <CardDescription>Supplier confirmation, processing, shipping, delivery and cancellation queues.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={adminPanels.orders} />
                </CardContent>
              </Card>
              <Card id="inventory">
                <CardHeader>
                  <CardTitle>Inventory Health Panel</CardTitle>
                  <CardDescription>Identify suppliers not updating inventory and products that need cleanup.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={adminPanels.inventory} />
                </CardContent>
              </Card>
              <Card id="shipping">
                <CardHeader>
                  <CardTitle>Shipping Issues Panel</CardTitle>
                  <CardDescription>Orders failed due to shipping and supplier setup gaps once logistics events are connected.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={adminPanels.shipping} />
                </CardContent>
              </Card>
              <Card id="vet">
                <CardHeader>
                  <CardTitle>Vet Consultation Status</CardTitle>
                  <CardDescription>Pending assignments, active cases, completed cases and vet revenue.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={adminPanels.vet} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6" id="suppliers">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Performance Table</CardTitle>
                  <CardDescription>Find suppliers without shipping setup, inventory gaps and settlement readiness.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleTable columns={tableColumns.supplierPerformance} rows={supplierPerformanceRows} />
                </CardContent>
              </Card>
              <Card id="buyers">
                <CardHeader>
                  <CardTitle>Buyer Activity Table</CardTitle>
                  <CardDescription>Buyer activity structure ready for Supabase events; seeded with real catalog interest.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleTable columns={tableColumns.buyerActivity} rows={buyerActivityRows} />
                </CardContent>
              </Card>
              <Card id="products">
                <CardHeader>
                  <CardTitle>Product Approval Queue</CardTitle>
                  <CardDescription>Products pending approval, missing images, or requiring catalog review.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleTable columns={tableColumns.productApproval} rows={productApprovalRows} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
              <Card id="payments">
                <CardHeader>
                  <CardTitle>Payment & Settlement Overview</CardTitle>
                  <CardDescription>Payments, settlements, refunds and platform commission controls.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={adminPanels.payments} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Live Activity Feed</CardTitle>
                  <CardDescription>Realtime-ready feed for orders, suppliers, products, vet, payments and support.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleActivityFeed activities={adminActivityFeed} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["B2B Leads", "0 live leads", "b2b"],
                ["Notifications", "Broadcast-ready", "notifications"],
                ["Support Tickets", "0 open tickets", "support"],
                ["CMS / Reports / Settings", "Ready", "cms"]
              ].map(([title, detail, id]) => (
                <Card id={id} key={id}>
                  <CardContent className="p-5">
                    <p className="font-semibold text-slate-950">{title}</p>
                    <p className="mt-2 text-sm text-slate-500">{detail}</p>
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
