import {
  Bell,
  CreditCard,
  FileText,
  Headphones,
  HeartPulse,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  UserRound
} from "lucide-react";
import { DashboardAreaChart } from "@/components/role-dashboard/dashboard-chart";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { MetricPanel, RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  buyerActivityFeed,
  buyerChartData,
  buyerKpis,
  buyerPanels,
  buyerProductRows,
  buyerQuickActions,
  tableColumns
} from "@/lib/role-dashboard-data";

const sidebarItems = [
  { label: "Dashboard", href: "/buyer/dashboard", icon: LayoutDashboard },
  { label: "My Orders", href: "#orders", icon: ShoppingCart },
  { label: "Recommended Products", href: "#reorder", icon: Package },
  { label: "Vet Consultations", href: "#vet", icon: Stethoscope },
  { label: "B2B Quotes", href: "#b2b", icon: ShieldCheck },
  { label: "Invoices", href: "#invoices", icon: FileText },
  { label: "Payments", href: "#payments", icon: CreditCard },
  { label: "Delivery", href: "#delivery", icon: Truck },
  { label: "Care Reminders", href: "#care", icon: HeartPulse },
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Profile", href: "#profile", icon: UserRound },
  { label: "Settings", href: "#settings", icon: Settings }
];

export const metadata = {
  title: "Buyer Dashboard | AnimKart OS",
  description: "Buyer account dashboard for AnimKart marketplace customers."
};

export default function BuyerDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Dashboard" eyebrow="Buyer Account" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Buyer View</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Farm Account</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Orders pending backend</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight">Buyer Dashboard</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search orders, products, invoices..." />
                </div>
                <Button variant="outline">This month</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-2xl bg-slate-950 p-5 text-white">
              <div className="grid gap-5 2xl:grid-cols-[1fr_auto] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Buyer Account System</p>
                  <h2 className="mt-3 max-w-5xl text-2xl font-bold sm:text-3xl">
                    Track orders, reorder animal health products, manage vet consultations, invoices and bulk quote requests.
                  </h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    Product recommendations are real AnimKart catalog items. Buyer orders, invoices and vet history are Supabase-ready.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {buyerQuickActions.map((action) => (
                    <Button className="h-9 border-white/15 bg-white/10 px-3 text-xs text-white hover:bg-white/15" key={action.label} variant="outline">
                      {action.label}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {buyerKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-[1fr_420px]">
              <Card id="reorder">
                <CardHeader>
                  <CardTitle>Reorder & Recommendation Value</CardTitle>
                  <CardDescription>Real catalog recommendations by selling price.</CardDescription>
                </CardHeader>
                <CardContent>
                  <DashboardAreaChart data={buyerChartData} />
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Buyer Activity Feed</CardTitle>
                  <CardDescription>Realtime-ready account feed for orders, vet, invoices and support.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleActivityFeed activities={buyerActivityFeed} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-3">
              <Card id="orders">
                <CardHeader>
                  <CardTitle>My Orders</CardTitle>
                  <CardDescription>Open, delivered, invoice and support status.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={buyerPanels.orders} />
                </CardContent>
              </Card>
              <Card id="vet">
                <CardHeader>
                  <CardTitle>Vet Consultation Hub</CardTitle>
                  <CardDescription>Upcoming consults, active cases, prescriptions and reminders.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={buyerPanels.vet} />
                </CardContent>
              </Card>
              <Card id="profile">
                <CardHeader>
                  <CardTitle>Account & B2B</CardTitle>
                  <CardDescription>Saved suppliers, bulk quotes, wishlist and wallet/credit.</CardDescription>
                </CardHeader>
                <CardContent>
                  <MetricPanel metrics={buyerPanels.account} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recommended Products</CardTitle>
                  <CardDescription>Real AnimKart catalog products for reorder and discovery.</CardDescription>
                </CardHeader>
                <CardContent>
                  <RoleTable columns={tableColumns.buyerProducts} rows={buyerProductRows} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-4">
              {[
                ["B2B Quotes", "0 live inquiries", "b2b"],
                ["Invoices", "0 connected invoices", "invoices"],
                ["Delivery", "Tracking table pending", "delivery"],
                ["Care / Support / Settings", "Ready", "care"]
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
