import {
  AlertTriangle,
  BarChart3,
  Bell,
  CheckCircle2,
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  Package,
  Radio,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Truck
} from "lucide-react";
import { DashboardBarChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import {
  AmazonStyleAddProduct,
  InventoryAlertsPanel,
  ProductManagementTable,
  ProductPerformanceTable,
  RecentOrdersTable,
  SettlementSummary,
  ShippingSetupPanel,
  SupplierDashboard,
  SupplierStorefrontPreview,
  SupplierSalesChart
} from "@/components/dashboard/supplier";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  supplierActivityFeed,
  supplierAlerts,
  supplierChartData,
  supplierHealthScores,
  supplierKpis,
  supplierQuickActions,
  supplierStorefront
} from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "#dashboard", icon: LayoutDashboard },
  { label: "My Store", href: "#store", icon: Store },
  { label: "Products", href: "#products", icon: Package },
  { label: "Add Product", href: "#add-product", icon: Package },
  { label: "Bulk Upload", href: "#bulk-upload", icon: FileText },
  { label: "Inventory", href: "#inventory", icon: FileText },
  { label: "Orders", href: "#orders", icon: ShoppingCart },
  { label: "Shipping", href: "#shipping", icon: Truck },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Analytics", href: "#analytics", icon: BarChart3 },
  { label: "Reviews", href: "#reviews", icon: Store },
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Settings", href: "#settings", icon: Settings }
];

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export const metadata = {
  title: "Supplier Dashboard | AnimKart OS",
  description: "Premium seller operating dashboard for AnimKart marketplace suppliers."
};

export default function SupplierDashboardPage() {
  const storeHealth = supplierHealthScores[0];

  return (
    <SupplierDashboard>
      <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
        <div className="flex min-h-screen">
          <DashboardSidebar active="Dashboard" eyebrow="Supplier OS" items={sidebarItems} />
          <section className="min-w-0 flex-1">
            <header className="border-b border-slate-200 bg-white">
              <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Supplier View</Badge>
                    <Badge className="bg-slate-100 text-slate-700">Seller Operating System</Badge>
                    <Badge className="bg-amber-50 text-amber-700">Shipping setup required</Badge>
                  </div>
                  <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Supplier Dashboard</h1>
                </div>
                <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                  <div className="relative min-w-0 sm:w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <Input className="pl-10" placeholder="Search products, orders, settlements..." />
                  </div>
                  <Button className="w-full sm:w-auto" variant="outline">Today</Button>
                  <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                    <Bell size={18} />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-amber-500" />
                  </Button>
                </div>
              </div>
            </header>

            <div className="grid gap-6 px-4 py-6 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6" id="dashboard">
                  <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-center">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">
                        AnimKart Supplier Command Center
                      </p>
                      <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-5xl">
                        Manage products, pricing, inventory, shipping, orders and payouts from one seller OS.
                      </h2>
                      <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                        Built for veterinary medicine, feed, supplements, equipment and animal care suppliers who need marketplace control like Amazon Seller Central.
                      </p>
                    </div>
                    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold text-slate-300">Store Health</span>
                        <Badge className={statusClass[storeHealth.status]}>{storeHealth.score}%</Badge>
                      </div>
                      <div className="h-3 overflow-hidden rounded-full bg-white/10">
                        <div className="h-full rounded-full bg-[#0B8F47]" style={{ width: `${storeHealth.score}%` }} />
                      </div>
                      <p className="text-sm leading-6 text-slate-300">{storeHealth.detail}</p>
                      <div className="grid grid-cols-2 gap-2">
                        {supplierQuickActions.map((action) => (
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

                <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                  {supplierAlerts.map((alert) => (
                    <Card key={alert.title}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0">
                            <p className="font-semibold text-slate-950">{alert.title}</p>
                            <p className="mt-1 text-sm leading-5 text-slate-500">{alert.detail}</p>
                          </div>
                          <span className={`grid min-h-10 min-w-10 shrink-0 place-items-center rounded-xl px-2 text-sm font-bold ${statusClass[alert.severity]}`}>
                            {alert.count}
                          </span>
                        </div>
                        <Button className="mt-3 h-9 w-full" variant="outline">{alert.action}</Button>
                      </CardContent>
                    </Card>
                  ))}
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                  {supplierKpis.map((kpi) => (
                    <RoleKpiCard key={kpi.label} kpi={kpi} />
                  ))}
                </section>

                <section className="mt-6">
                  <SupplierStorefrontPreview />
                </section>

                <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]" id="analytics">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sales Graph</CardTitle>
                      <CardDescription>Real product prices for this supplier/brand catalog group.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SupplierSalesChart>
                        <DashboardBarChart data={supplierChartData} />
                      </SupplierSalesChart>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Notifications</CardTitle>
                      <CardDescription>Realtime-ready supplier activity and operating reminders.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleActivityFeed activities={supplierActivityFeed} />
                    </CardContent>
                  </Card>
                </section>

                <section className="mt-6 grid gap-6 xl:grid-cols-3">
                  <Card id="orders">
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Accept orders, prepare shipments and handle returns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentOrdersTable />
                    </CardContent>
                  </Card>
                  <Card id="inventory">
                    <CardHeader>
                      <CardTitle>Inventory Alerts</CardTitle>
                      <CardDescription>Stock, availability, low-stock and catalog readiness controls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InventoryAlertsPanel />
                    </CardContent>
                  </Card>
                  <Card id="payments">
                    <CardHeader>
                      <CardTitle>Payment Summary</CardTitle>
                      <CardDescription>Pending payments, invoices, deductions and payout setup.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SettlementSummary />
                    </CardContent>
                  </Card>
                </section>

                <section className="mt-6 grid gap-6" id="products">
                  <AmazonStyleAddProduct />
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Performance</CardTitle>
                      <CardDescription>Add/edit products, prices, MOQ, stock, approval status and image readiness.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ProductPerformanceTable />
                    </CardContent>
                  </Card>
                  <ProductManagementTable />
                  <Card id="shipping">
                    <CardHeader>
                      <CardTitle>Shipping Setup Status</CardTitle>
                      <CardDescription>
                        Configure delivery charge by state, city, pincode, weight slab, product type, order value, freight, pickup and blocked locations.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ShippingSetupPanel />
                    </CardContent>
                  </Card>
                </section>

                <section className="mt-6 grid gap-4 md:grid-cols-4">
                  {[
                    ["Bulk Upload", "CSV/XLSX catalog upload workflow", "bulk-upload"],
                    ["Reviews", "Store rating and buyer reviews pending", "reviews"],
                    ["Support", "Supplier support inbox ready", "support"],
                    ["Settings", "KYC, bank, warehouse and permissions", "settings"]
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

              <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card id="store-health">
                  <CardHeader>
                    <CardTitle>Store Health Score</CardTitle>
                    <CardDescription>{supplierStorefront.name}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid place-items-center rounded-2xl bg-slate-950 p-6 text-white">
                      <div className="grid size-32 place-items-center rounded-full border-[10px] border-[#0B8F47] bg-white text-4xl font-black text-slate-950">
                        {storeHealth.score}
                      </div>
                      <p className="mt-4 text-center text-sm text-slate-300">{storeHealth.detail}</p>
                    </div>
                    <div className="mt-4 grid gap-3">
                      {supplierHealthScores.slice(1).map((item) => {
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
                    <CardTitle>Seller Snapshot</CardTitle>
                    <CardDescription>Store, catalog, rating and fulfillment readiness.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {[
                        ["Products", supplierStorefront.products],
                        ["Live Products", supplierStorefront.liveProducts],
                        ["Catalog Value", supplierStorefront.catalogValue],
                        ["Store Rating", supplierStorefront.rating],
                        ["Fulfillment", supplierStorefront.fulfillment]
                      ].map(([label, value]) => (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={label}>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{label}</p>
                          <p className="mt-2 text-xl font-black text-slate-950">{value}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Daily seller operations.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-2">
                      {supplierQuickActions.map((action) => (
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
    </SupplierDashboard>
  );
}
