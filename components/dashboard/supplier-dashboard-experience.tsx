"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
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

type SupplierTabId =
  | "dashboard"
  | "store"
  | "products"
  | "add-product"
  | "bulk-upload"
  | "inventory"
  | "orders"
  | "shipping"
  | "payments"
  | "analytics"
  | "reviews"
  | "support"
  | "settings";

const supplierTabs = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "store", label: "My Store", icon: Store },
  { id: "products", label: "Products", icon: Package },
  { id: "add-product", label: "Add Product", icon: Package },
  { id: "bulk-upload", label: "Bulk Upload", icon: FileText },
  { id: "inventory", label: "Inventory", icon: FileText, href: "/supplier/inventory" },
  { id: "orders", label: "Orders", icon: ShoppingCart },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "payments", label: "Payments", icon: CreditCard },
  { id: "analytics", label: "Analytics", icon: BarChart3 },
  { id: "reviews", label: "Reviews", icon: Store },
  { id: "support", label: "Support", icon: Headphones },
  { id: "settings", label: "Settings", icon: Settings }
] satisfies Array<{ id: SupplierTabId; label: string; icon: typeof LayoutDashboard; href?: string }>;

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export function SupplierDashboardExperience() {
  const [activeTab, setActiveTab] = useState<SupplierTabId>("dashboard");
  const storeHealth = supplierHealthScores[0];
  const activeTabLabel = useMemo(
    () => supplierTabs.find((tab) => tab.id === activeTab)?.label ?? "Dashboard",
    [activeTab]
  );

  useEffect(() => {
    const hash = window.location.hash.replace("#", "") as SupplierTabId;
    if (supplierTabs.some((tab) => tab.id === hash)) {
      setActiveTab(hash);
    }
  }, []);

  function showTab(tabId: SupplierTabId) {
    setActiveTab(tabId);
    window.history.replaceState(null, "", `#${tabId}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function tabFromHref(href: string): SupplierTabId {
    const tabId = href.replace("#", "") as SupplierTabId;
    return supplierTabs.some((tab) => tab.id === tabId) ? tabId : "dashboard";
  }

  return (
    <SupplierDashboard>
      <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
        <div className="flex min-h-screen">
          <SupplierSidebar activeTab={activeTab} onSelect={showTab} />
          <section className="min-w-0 flex-1">
            <header className="border-b border-slate-200 bg-white">
              <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge>Supplier View</Badge>
                    <Badge className="bg-slate-100 text-slate-700">Seller Operating System</Badge>
                    <Badge className="bg-amber-50 text-amber-700">Current: {activeTabLabel}</Badge>
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
              <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
                <div className="flex gap-2 overflow-x-auto">
                  {supplierTabs.map((tab) => {
                    const className =
                      activeTab === tab.id
                        ? "inline-flex h-10 shrink-0 items-center gap-2 rounded-full bg-[#0B8F47] px-4 text-sm font-semibold text-white"
                        : "inline-flex h-10 shrink-0 items-center gap-2 rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-[#0B8F47] hover:text-[#0B8F47]";

                    return tab.href ? (
                      <Link className={className} href={tab.href} key={tab.id}>
                        <tab.icon size={16} />
                        {tab.label}
                      </Link>
                    ) : (
                      <button className={className} key={tab.id} onClick={() => showTab(tab.id)} type="button">
                        <tab.icon size={16} />
                        {tab.label}
                      </button>
                    );
                  })}
                </div>
              </div>
            </header>

            <div className="grid gap-6 px-4 py-6 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="min-w-0">
                {activeTab === "dashboard" && (
                  <div className="grid gap-6">
                    <CommandHero storeHealth={storeHealth} onSelect={showTab} tabFromHref={tabFromHref} />
                    <SupplierAlertsPanel />
                    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                      {supplierKpis.map((kpi) => (
                        <RoleKpiCard key={kpi.label} kpi={kpi} />
                      ))}
                    </section>
                    <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                      <SalesGraphCard />
                      <NotificationsCard />
                    </section>
                  </div>
                )}

                {activeTab === "store" && <SupplierStorefrontPreview />}

                {activeTab === "products" && (
                  <div className="grid gap-6">
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
                  </div>
                )}

                {activeTab === "add-product" && <AmazonStyleAddProduct />}

                {activeTab === "bulk-upload" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Bulk Upload</CardTitle>
                      <CardDescription>Upload CSV/XLSX catalogs like a serious seller hub.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-4 xl:grid-cols-[1fr_320px]">
                        <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
                          <p className="text-lg font-bold text-slate-950">Drop CSV/XLSX file here</p>
                          <p className="mt-2 text-sm text-slate-500">Products, SKUs, prices, MOQ, stock, expiry and category mapping.</p>
                          <Button className="mt-5">Choose file</Button>
                        </div>
                        <div className="grid gap-3">
                          {["Download template", "Validate rows", "Fix category mapping", "Submit for approval"].map((item) => (
                            <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item}>
                              <p className="font-semibold text-slate-950">{item}</p>
                              <p className="mt-1 text-sm text-slate-500">Bulk workflow ready for Supabase storage and import jobs.</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}

                {activeTab === "inventory" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Inventory Alerts</CardTitle>
                      <CardDescription>Stock, availability, low-stock and catalog readiness controls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <InventoryAlertsPanel />
                    </CardContent>
                  </Card>
                )}

                {activeTab === "orders" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Recent Orders</CardTitle>
                      <CardDescription>Accept orders, prepare shipments and handle returns.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RecentOrdersTable />
                    </CardContent>
                  </Card>
                )}

                {activeTab === "shipping" && (
                  <Card>
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
                )}

                {activeTab === "payments" && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Summary</CardTitle>
                      <CardDescription>Pending payments, invoices, deductions and payout setup.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <SettlementSummary />
                    </CardContent>
                  </Card>
                )}

                {activeTab === "analytics" && (
                  <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
                    <SalesGraphCard />
                    <NotificationsCard />
                  </section>
                )}

                {activeTab === "reviews" && <SimpleTabCard title="Reviews" detail="Store rating and buyer review workflows are ready for review tables." />}
                {activeTab === "support" && <SimpleTabCard title="Support" detail="Supplier support inbox, ticket routing and marketplace help workflows." />}
                {activeTab === "settings" && <SimpleTabCard title="Settings" detail="KYC, bank details, warehouse, permissions and shipping defaults." />}
              </div>

              <SupplierRightPanel storeHealth={storeHealth} onSelect={showTab} tabFromHref={tabFromHref} />
            </div>
          </section>
        </div>
      </main>
    </SupplierDashboard>
  );
}

function SupplierSidebar({
  activeTab,
  onSelect
}: {
  activeTab: SupplierTabId;
  onSelect: (tabId: SupplierTabId) => void;
}) {
  return (
    <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white xl:block">
      <div className="sticky top-0 flex h-screen flex-col">
        <div className="border-b border-white/10 p-6">
          <button className="flex items-center gap-3 text-left" onClick={() => onSelect("dashboard")} type="button">
            <span className="grid size-11 place-items-center rounded-xl bg-[#0B8F47] text-xl font-black">A</span>
            <span>
              <span className="block text-lg font-bold">AnimKart OS</span>
              <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Supplier OS</span>
            </span>
          </button>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto p-4">
          {supplierTabs.map((tab) => {
            const className =
              activeTab === tab.id
                ? "flex w-full items-center gap-3 rounded-lg bg-[#0B8F47] px-3 py-2.5 text-left text-sm font-semibold text-white"
                : "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white";

            return tab.href ? (
              <Link className={className} href={tab.href} key={tab.id}>
                <tab.icon size={18} />
                {tab.label}
              </Link>
            ) : (
              <button className={className} key={tab.id} onClick={() => onSelect(tab.id)} type="button">
                <tab.icon size={18} />
                {tab.label}
              </button>
            );
          })}
        </nav>
        <div className="m-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Tabbed workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-300">
            Click a section to switch panels without scrolling through unrelated content.
          </p>
        </div>
      </div>
    </aside>
  );
}

function CommandHero({
  storeHealth,
  onSelect,
  tabFromHref
}: {
  storeHealth: (typeof supplierHealthScores)[number];
  onSelect: (tabId: SupplierTabId) => void;
  tabFromHref: (href: string) => SupplierTabId;
}) {
  return (
    <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
      <div className="grid gap-6 xl:grid-cols-[1fr_420px] xl:items-center">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">AnimKart Supplier Command Center</p>
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
              <button
                className="inline-flex min-h-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 px-3 text-center text-xs font-semibold text-white hover:bg-white/15"
                key={action.label}
                onClick={() => onSelect(tabFromHref(action.href))}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SupplierAlertsPanel() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
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
  );
}

function SalesGraphCard() {
  return (
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
  );
}

function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>Realtime-ready supplier activity and operating reminders.</CardDescription>
      </CardHeader>
      <CardContent>
        <RoleActivityFeed activities={supplierActivityFeed} />
      </CardContent>
    </Card>
  );
}

function SimpleTabCard({ title, detail }: { title: string; detail: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{detail}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
          <p className="text-sm font-semibold text-slate-950">{title} workspace</p>
          <p className="mt-2 text-sm leading-6 text-slate-500">
            This panel is now isolated like a professional seller console tab. Supabase tables can power the workflow next.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

function SupplierRightPanel({
  storeHealth,
  onSelect,
  tabFromHref
}: {
  storeHealth: (typeof supplierHealthScores)[number];
  onSelect: (tabId: SupplierTabId) => void;
  tabFromHref: (href: string) => SupplierTabId;
}) {
  return (
    <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
      <Card>
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
              <button
                className="inline-flex h-10 items-center justify-center rounded-lg bg-[#0B8F47] px-4 text-sm font-semibold text-white hover:bg-[#08783c]"
                key={action.label}
                onClick={() => onSelect(tabFromHref(action.href))}
                type="button"
              >
                {action.label}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>
    </aside>
  );
}
