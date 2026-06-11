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
  Truck,
  Wallet
} from "lucide-react";
import { DashboardBarChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { MetricPanel, RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  supplierActivityFeed,
  supplierChartData,
  supplierKpis,
  supplierPanels,
  supplierProductRows,
  supplierQuickActions,
  tableColumns
} from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Store", href: "#store", icon: Store },
  { label: "Products", href: "#products", icon: Package },
  { label: "Inventory", href: "#inventory", icon: FileText },
  { label: "Orders", href: "#orders", icon: ShoppingCart },
  { label: "Shipping", href: "#shipping", icon: Truck },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Settlements", href: "#settlements", icon: Wallet },
  { label: "Reports", href: "#reports", icon: BarChart3 },
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Settings", href: "#settings", icon: Settings }
];

export const metadata = {
  title: "Supplier Dashboard | AnimKart OS",
  description: "Supplier operating dashboard for AnimKart marketplace sellers."
};

export default function SupplierDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
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
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search products, orders, settlements..." />
                </div>
                <Button variant="outline">Today</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-2xl bg-slate-950 p-5 text-white" id="store">
              <div className="grid gap-5 2xl:grid-cols-[1fr_auto] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Supplier Operating System</p>
                  <h2 className="mt-3 max-w-5xl text-2xl font-bold sm:text-3xl">
                    Manage catalog health, inventory updates, shipping setup, orders and settlements from one supplier console.
                  </h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    Product and inventory metrics are derived from the imported AnimKart catalog. Orders and settlements are Supabase-ready.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {supplierQuickActions.map((action) => (
                    <Button className="h-9 border-white/15 bg-white/10 px-3 text-xs text-white hover:bg-white/15" key={action.label} variant="outline">
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supplierKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
              <Card>
                <CardHeader>
                  <CardTitle>Supplier Catalog Performance</CardTitle>
                  <CardDescription>Real product prices for this supplier/brand catalog group.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardBarChart data={supplierChartData} />
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
                  <CardTitle>Order Operations</CardTitle>
                  <CardDescription>Confirm orders, prepare shipments and handle returns.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={supplierPanels.orders} />
                </CardContent>
              </Card>
              <Card id="inventory">
                <CardHeader>
                  <CardTitle>Inventory Control</CardTitle>
                  <CardDescription>Update stock and resolve missing catalog assets.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={supplierPanels.inventory} />
                </CardContent>
              </Card>
              <Card id="settlements">
                <CardHeader>
                  <CardTitle>Payments & Settlements</CardTitle>
                  <CardDescription>Payouts, invoices and deductions once payment tables are connected.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={supplierPanels.settlements} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6" id="products">
              <Card>
                <CardHeader>
                  <CardTitle>My Product Catalog</CardTitle>
                  <CardDescription>Real products mapped to the supplier/brand group.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleTable columns={tableColumns.supplierProducts} rows={supplierProductRows} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["Shipping", "Setup pending", "shipping"],
                ["Reports", "Catalog report ready", "reports"],
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
          </div>
        </section>
      </div>
    </main>
  );
}
