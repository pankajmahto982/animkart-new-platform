import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  Megaphone,
  Package,
  Radio,
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
  adminAlerts,
  adminHealthScores,
  adminKpis,
  adminPanels,
  adminQuickActions,
  buyerActivityRows,
  notificationCenterRows,
  orderTrendData,
  productApprovalRows,
  recentTransactionRows,
  revenueChartData,
  supplierPerformanceRows,
  tableColumns,
  topCategoryRows,
  topProductRows,
  visitorChartData
} from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
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
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Notifications", href: "#notifications", icon: Megaphone },
  { label: "CMS", href: "#cms", icon: FileText },
  { label: "Reports", href: "#reports", icon: FileText },
  { label: "Settings", href: "#settings", icon: Settings }
];

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export const metadata = {
  title: "Super Admin Dashboard | AnimKart OS",
  description: "Mission control dashboard for AnimKart founders and super admins."
};

export default function AdminDashboardPage() {
  const marketplaceHealth = adminHealthScores[0];
  const criticalAlerts = adminAlerts.filter((alert) => alert.severity === "critical").length;

  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <DashboardSidebar active="Dashboard" eyebrow="Super Admin" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Founder View</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Marketplace OS</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Realtime-ready</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Super Admin Dashboard</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search suppliers, buyers, products, orders..." />
                </div>
                <Button className="w-full sm:w-auto" variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="grid gap-6 px-4 py-6 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
            <div className="min-w-0">
              <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6" id="dashboard">
                <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">AnimKart Mission Control</p>
                    <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-5xl">
                      One command center for animal health commerce, suppliers, vets, logistics and cashflow.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                      Built for founders to monitor growth, operating risk, approvals, marketplace health and real catalog momentum from one screen.
                    </p>
                  </div>
                  <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-slate-300">Marketplace Health</span>
                      <Badge className={statusClass[marketplaceHealth.status]}>{marketplaceHealth.score}%</Badge>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-white/10">
                      <div className="h-full rounded-full bg-[#0B8F47]" style={{ width: `${marketplaceHealth.score}%` }} />
                    </div>
                    <p className="text-sm leading-6 text-slate-300">{marketplaceHealth.detail}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {adminQuickActions.slice(0, 6).map((action) => (
                        <a
                          className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 text-center text-xs font-semibold text-white hover:bg-white/15"
                          href={action.href}
                          key={action.label}
                        >
                          {action.label}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {adminKpis.map((kpi) => (
                  <RoleKpiCard key={kpi.label} kpi={kpi} />
                ))}
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Trend Chart</CardTitle>
                    <CardDescription>Real catalog value by top categories until payments are connected.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardAreaChart data={revenueChartData} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Order Trend Chart</CardTitle>
                    <CardDescription>Live SKU demand proxy by category until order events are connected.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardBarChart data={orderTrendData} />
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <Card>
                  <CardHeader>
                    <CardTitle>Visitor Analytics</CardTitle>
                    <CardDescription>Catalog readiness signals standing in for analytics events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <DashboardBarChart data={visitorChartData} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Alerts</CardTitle>
                    <CardDescription>Founder-level exceptions across inventory, shipping, orders, approvals and vet ops.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 md:grid-cols-2">
                      {adminAlerts.map((alert) => (
                        <div className="rounded-xl border border-slate-200 bg-white p-4" key={alert.title}>
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-950">{alert.title}</p>
                              <p className="mt-1 text-sm leading-5 text-slate-500">{alert.detail}</p>
                            </div>
                            <span className={`grid size-10 shrink-0 place-items-center rounded-xl font-bold ${statusClass[alert.severity]}`}>
                              {alert.count}
                            </span>
                          </div>
                          <Button className="mt-3 h-9 w-full" variant="outline">{alert.action}</Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-3">
                {[
                  ["Order Command Center", "orders", adminPanels.orders],
                  ["Inventory Health Score", "inventory", adminPanels.inventory],
                  ["Shipping Health Score", "shipping", adminPanels.shipping],
                  ["Vet Consultation Queue", "vet", adminPanels.vet],
                  ["Payment & Settlement Overview", "payments", adminPanels.payments]
                ].map(([title, id, metrics]) => (
                  <Card id={id as string} key={id as string}>
                    <CardHeader>
                      <CardTitle>{title as string}</CardTitle>
                      <CardDescription>Operational queue structured for Supabase events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={metrics as typeof adminPanels.orders} />
                    </CardContent>
                  </Card>
                ))}
                <Card id="notifications">
                  <CardHeader>
                    <CardTitle>Notification Center</CardTitle>
                    <CardDescription>WhatsApp, email, SMS and push command layer.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={tableColumns.notificationCenter} rows={notificationCenterRows} />
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6" id="suppliers">
                <Card>
                  <CardHeader>
                    <CardTitle>Supplier Performance Table</CardTitle>
                    <CardDescription>Identify suppliers without shipping setup, inventory gaps and settlement readiness.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={tableColumns.supplierPerformance} rows={supplierPerformanceRows} />
                  </CardContent>
                </Card>
                <div className="grid gap-6 xl:grid-cols-2">
                  <Card id="products">
                    <CardHeader>
                      <CardTitle>Top Products</CardTitle>
                      <CardDescription>Highest catalog-value products from the real AnimKart import.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={tableColumns.topProducts} rows={topProductRows} />
                    </CardContent>
                  </Card>
                  <Card id="b2b">
                    <CardHeader>
                      <CardTitle>Top Categories</CardTitle>
                      <CardDescription>Category size, live products, catalog value and image gaps.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={tableColumns.topCategories} rows={topCategoryRows} />
                    </CardContent>
                  </Card>
                </div>
                <div className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Approval Queue</CardTitle>
                      <CardDescription>Products pending approval, missing images, or requiring catalog review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={tableColumns.productApproval} rows={productApprovalRows} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Supplier Approval Queue</CardTitle>
                      <CardDescription>Supplier approval workflow seeded with real supplier performance rows.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={tableColumns.supplierPerformance} rows={supplierPerformanceRows.slice(0, 5)} />
                    </CardContent>
                  </Card>
                </div>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
                <Card id="buyers">
                  <CardHeader>
                    <CardTitle>Buyer Activity Table</CardTitle>
                    <CardDescription>Buyer structure ready for Supabase events; seeded with real catalog interest.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={tableColumns.buyerActivity} rows={buyerActivityRows} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Activity Feed</CardTitle>
                    <CardDescription>Realtime-ready feed for suppliers, products, inventory, orders and vet cases.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleActivityFeed activities={adminActivityFeed} />
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Transactions</CardTitle>
                    <CardDescription>Payment, settlement, refund and vet revenue events once webhooks are connected.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={tableColumns.recentTransactions} rows={recentTransactionRows} />
                  </CardContent>
                </Card>
                <Card id="support">
                  <CardHeader>
                    <CardTitle>Support, CMS and Reports</CardTitle>
                    <CardDescription>Final operating controls for content, support, reporting and settings.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[
                        ["Support Tickets", "0 open tickets", "support"],
                        ["CMS", "Banner and homepage control ready", "cms"],
                        ["Reports", "Export and founder report ready", "reports"],
                        ["Settings", "Roles, permissions and OS config", "settings"]
                      ].map(([title, detail, id]) => (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" id={id} key={id}>
                          <p className="font-semibold text-slate-950">{title}</p>
                          <p className="mt-1 text-sm text-slate-500">{detail}</p>
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
                  <CardTitle>Platform Health Score</CardTitle>
                  <CardDescription>Right-side founder operating panel.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid place-items-center rounded-2xl bg-slate-950 p-6 text-white">
                    <div className="grid size-32 place-items-center rounded-full border-[10px] border-[#0B8F47] bg-white text-4xl font-black text-slate-950">
                      {marketplaceHealth.score}
                    </div>
                    <p className="mt-4 text-center text-sm text-slate-300">{marketplaceHealth.detail}</p>
                  </div>
                  <div className="mt-4 grid gap-3">
                    {adminHealthScores.slice(1).map((item) => {
                      const Icon = item.status === "healthy" ? CheckCircle2 : item.status === "critical" ? AlertTriangle : Radio;
                      return (
                        <div className="rounded-xl border border-slate-200 bg-white p-3" key={item.label}>
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="text-sm font-semibold text-slate-950">{item.label}</p>
                              <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                            </div>
                            <span className={`grid size-9 shrink-0 place-items-center rounded-lg ${statusClass[item.status]}`}>
                              <Icon size={16} />
                            </span>
                          </div>
                          <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
                            <div className="h-full rounded-full bg-[#0B8F47]" style={{ width: `${item.score}%` }} />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Today</CardTitle>
                  <CardDescription>Revenue, orders, critical alerts and live users online.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      ["Today's Revenue", "Rs 0", "Payment table pending"],
                      ["Today's Orders", "0", "Order table pending"],
                      ["Critical Alerts", criticalAlerts.toString(), "Immediate founder attention"],
                      ["Live Users Online", "0", "Realtime sessions pending"]
                    ].map(([label, value, detail]) => (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}>
                        <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                        <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
                        <p className="mt-1 text-xs text-slate-500">{detail}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>Founder shortcuts for daily control.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-2">
                    {adminQuickActions.map((action) => (
                      <a
                        className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0B8F47] px-4 text-sm font-semibold text-white hover:bg-[#08783c]"
                        href={action.href}
                        key={action.label}
                      >
                        {action.label}
                      </a>
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
