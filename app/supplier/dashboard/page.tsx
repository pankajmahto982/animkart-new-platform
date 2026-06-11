import {
  BarChart3,
  Bell,
  CreditCard,
  FileText,
  Headphones,
  LayoutDashboard,
  Package,
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
  StoreHealthScore,
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
  supplierChartData,
  supplierKpis,
  supplierQuickActions
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

export const metadata = {
  title: "Supplier Dashboard | AnimKart OS",
  description: "Supplier operating dashboard for AnimKart marketplace sellers."
};

export default function SupplierDashboardPage() {
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
                  <Badge className="bg-slate-100 text-slate-700">Catalog + Inventory</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Orders pending backend</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">Supplier Dashboard</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search products, orders, settlements..." />
                </div>
                <Button className="w-full sm:w-auto" variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                  <Bell size={18} />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-2xl bg-slate-950 p-4 text-white sm:p-5" id="dashboard">
              <div className="grid gap-5 xl:grid-cols-[1fr_380px] xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Supplier Operating System</p>
                  <h2 className="mt-3 max-w-5xl text-xl font-bold leading-tight sm:text-3xl">
                    Manage products, shipping, inventory and store trust from one seller console.
                  </h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    Real catalog data powers product health now. Orders, payments and settlement queues are ready for Supabase tables.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 xl:grid-cols-2">
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
            </section>

            <section className="mt-6">
              <SupplierStorefrontPreview />
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supplierKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
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
                  <CardTitle>Supplier Activity Feed</CardTitle>
                  <CardDescription>Realtime-ready feed for catalog, inventory, shipping and orders.</CardDescription>
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
                  <CardDescription>Confirm orders, prepare shipments and handle returns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RecentOrdersTable />
                </CardContent>
              </Card>
              <Card id="inventory">
                <CardHeader>
                  <CardTitle>Inventory Control</CardTitle>
                  <CardDescription>Update stock and resolve missing catalog assets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InventoryAlertsPanel />
                </CardContent>
              </Card>
              <Card id="payments">
                <CardHeader>
                  <CardTitle>Payments & Settlements</CardTitle>
                  <CardDescription>Payouts, invoices and deductions once payment tables are connected.</CardDescription>
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
                  <CardDescription>Real products mapped to the supplier/brand group.</CardDescription>
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
                    Product goes live only when shipping is configured or marked Freight on Actual. Priority: product, pincode, city, state, weight, default.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ShippingSetupPanel />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["Store Health Score", "Calculated from catalog readiness", "store-health"],
                ["Bulk Upload", "CSV/XLSX workflow ready", "bulk-upload"],
                ["Reviews", "Reviews table pending", "reviews"],
                ["Support", "0 open messages", "support"],
                ["Settings", "KYC and bank setup pending", "settings"]
              ].map(([title, detail, id]) => (
                <Card id={id} key={id}>
                  <CardContent className="p-5">
                    <p className="font-semibold text-slate-950">{title}</p>
                    <p className="mt-2 text-sm text-slate-500">{detail}</p>
                  </CardContent>
                </Card>
              ))}
            </section>
            <section className="mt-6" id="store-health">
              <Card>
                <CardHeader>
                  <CardTitle>Store Health Score</CardTitle>
                  <CardDescription>Inventory, image readiness, stock status and supplier setup health.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StoreHealthScore />
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
    </SupplierDashboard>
  );
}
