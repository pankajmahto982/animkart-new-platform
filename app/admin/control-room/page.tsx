import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  CreditCard,
  FileText,
  LayoutDashboard,
  Megaphone,
  MonitorDot,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  UserCircle,
  Users,
  Wallet
} from "lucide-react";
import { ControlRoomKpiCard } from "@/components/control-room/control-room-kpi-card";
import { InventoryControlPanel } from "@/components/control-room/inventory-control-panel";
import { MarketplaceHealthScore } from "@/components/control-room/marketplace-health-score";
import { NotificationBroadcastCenter } from "@/components/control-room/notification-broadcast-center";
import { OrderCommandCenter } from "@/components/control-room/order-command-center";
import { PendingActionsPanel } from "@/components/control-room/pending-actions-panel";
import { RealTimeActivityFeed } from "@/components/control-room/real-time-activity-feed";
import { ShippingControlPanel } from "@/components/control-room/shipping-control-panel";
import { StatusPanel } from "@/components/control-room/status-panel";
import { SupplierControlPanel } from "@/components/control-room/supplier-control-panel";
import { VetOperationsPanel } from "@/components/control-room/vet-operations-panel";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  broadcastActions,
  b2bLeadMetrics,
  buyerMetrics,
  controlRoomSummary,
  controlRoomKpis,
  emergencyAlerts,
  healthMetrics,
  inventoryMetrics,
  liveUsers,
  notificationMetrics,
  orderMetrics,
  pendingActions,
  platformScore,
  productMetrics,
  quickActions,
  realTimeActivities,
  rightPanelMetrics,
  shippingMetrics,
  supplierMetrics,
  vetMetrics
} from "@/lib/control-room-data";

const sidebarItems = [
  { label: "Dashboard", href: "#overview", icon: LayoutDashboard },
  { label: "Control Room", href: "#control-room", icon: MonitorDot },
  { label: "Analytics", href: "#health", icon: BarChart3 },
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
  { label: "CMS", href: "#cms", icon: FileText },
  { label: "Support", href: "#support", icon: ShieldCheck },
  { label: "Reports", href: "#reports", icon: FileText },
  { label: "Settings", href: "#settings", icon: Settings }
];

export const metadata = {
  title: "Super Admin Control Room | AnimKart OS",
  description: "AnimKart OS super admin command center for full marketplace control."
};

export default function ControlRoomPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <DashboardSidebar active="Control Room" eyebrow="Super Admin" items={sidebarItems} />

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Super Admin</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Control Room</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Realtime-ready</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Super Admin Control Room</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search orders, suppliers, SKUs..." />
                </div>
                <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
                  <CalendarDays className="text-[#0B8F47]" size={17} />
                  Today
                </div>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
                <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3">
                  <UserCircle className="text-[#0B8F47]" size={20} />
                  <span className="text-sm font-semibold">Admin</span>
                </div>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6" id="overview">
            <section className="overflow-hidden rounded-3xl bg-slate-950 p-5 text-white shadow-xl shadow-slate-300/40" id="control-room">
              <div className="grid gap-5 2xl:grid-cols-[1fr_560px] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-emerald-300">Main operating screen</p>
                  <h2 className="mt-3 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Mission Control Center for buyers, suppliers, products, orders, shipping, vet services, payments and B2B growth.
                  </h2>
                  <p className="mt-3 max-w-4xl text-sm leading-6 text-slate-300">
                    Built like the operating system of a funded marketplace: real product catalog data, Supabase-ready event queues,
                    command panels, emergency alerts and founder-level health signals in one screen.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {controlRoomSummary.map((item) => (
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={item.label}>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-300">{item.label}</p>
                      <p className="mt-2 text-2xl font-bold">{item.value}</p>
                      <p className="mt-1 text-xs text-slate-400">{item.detail}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                {quickActions.map((action) => (
                  <Button className="h-9 border-white/15 bg-white/10 px-3 text-xs text-white hover:bg-white/15" key={action} variant="outline">
                    {action}
                  </Button>
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6">
              {controlRoomKpis.map((kpi) => (
                <ControlRoomKpiCard key={kpi.id} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_360px]" id="health">
              <div className="grid gap-6">
                <MarketplaceHealthScore metrics={healthMetrics} score={platformScore} />
                <section className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Real-Time Activity Feed</CardTitle>
                      <CardDescription>Supplier, product, order, buyer, vet, inventory, shipping and payment events.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RealTimeActivityFeed activities={realTimeActivities} />
                    </CardContent>
                  </Card>
                  <Card id="live-users">
                    <CardHeader>
                      <CardTitle>Live Users Widget</CardTitle>
                      <CardDescription>Realtime online presence across buyer, supplier and vet surfaces.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <StatusPanel metrics={liveUsers} />
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Founder Side Panel</CardTitle>
                    <CardDescription>Today&apos;s revenue, orders, critical alerts and uptime.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <StatusPanel metrics={rightPanelMetrics} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Emergency Alerts</CardTitle>
                    <CardDescription>Incidents that need immediate operator attention.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RealTimeActivityFeed activities={emergencyAlerts} />
                  </CardContent>
                </Card>
              </aside>
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[0.95fr_1.05fr]" id="actions">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Actions Panel</CardTitle>
                  <CardDescription>Approval, exception and escalation queues for the operations team.</CardDescription>
                </CardHeader>
                <CardContent>
                  <PendingActionsPanel actions={pendingActions} />
                </CardContent>
              </Card>
              <Card id="orders">
                <CardHeader>
                  <CardTitle>Order Command Center</CardTitle>
                  <CardDescription>New orders, supplier confirmation, processing, shipped, delivered and cancelled.</CardDescription>
                </CardHeader>
                <CardContent>
                  <OrderCommandCenter metrics={orderMetrics} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 xl:grid-cols-2">
              <Card id="suppliers">
                <CardHeader>
                  <CardTitle>Supplier Command Center</CardTitle>
                  <CardDescription>Approvals, verified suppliers, shipping setup, inventory freshness and top suppliers.</CardDescription>
                </CardHeader>
                <CardContent>
                  <SupplierControlPanel metrics={supplierMetrics} />
                </CardContent>
              </Card>
              <Card id="buyers">
                <CardHeader>
                  <CardTitle>Buyer Command Center</CardTitle>
                  <CardDescription>New buyers, repeat buyers, B2B buyers, inactive accounts and top locations.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusPanel metrics={buyerMetrics} />
                </CardContent>
              </Card>
              <Card id="products">
                <CardHeader>
                  <CardTitle>Product Command Center</CardTitle>
                  <CardDescription>Approvals, rejections, stock issues, missing shipping and top products.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusPanel metrics={productMetrics} />
                </CardContent>
              </Card>
              <Card id="inventory">
                <CardHeader>
                  <CardTitle>Inventory Command Center</CardTitle>
                  <CardDescription>Low stock, out of stock, expired products, stale updates and inventory accuracy.</CardDescription>
                </CardHeader>
                <CardContent>
                  <InventoryControlPanel metrics={inventoryMetrics} />
                </CardContent>
              </Card>
              <Card id="shipping">
                <CardHeader>
                  <CardTitle>Shipping Command Center</CardTitle>
                  <CardDescription>Failed deliveries, high costs, freight orders, blocked pincodes and non-serviceability.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ShippingControlPanel metrics={shippingMetrics} />
                </CardContent>
              </Card>
              <Card id="vet">
                <CardHeader>
                  <CardTitle>Vet Command Center</CardTitle>
                  <CardDescription>New consultations, pending cases, completed cases, top vets and vet revenue.</CardDescription>
                </CardHeader>
                <CardContent>
                  <VetOperationsPanel metrics={vetMetrics} />
                </CardContent>
              </Card>
              <Card id="b2b">
                <CardHeader>
                  <CardTitle>B2B Lead Command Center</CardTitle>
                  <CardDescription>Generated leads, supplier responses, conversions, lead revenue and conversion rate.</CardDescription>
                </CardHeader>
                <CardContent>
                  <StatusPanel metrics={b2bLeadMetrics} />
                </CardContent>
              </Card>
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[1fr_360px]">
              <Card id="notifications">
                <CardHeader>
                  <CardTitle>Notifications Center</CardTitle>
                  <CardDescription>WhatsApp, SMS, email, push notifications and recent notification volume.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-5 xl:grid-cols-2">
                  <StatusPanel metrics={notificationMetrics} />
                  <NotificationBroadcastCenter actions={broadcastActions} />
                </CardContent>
              </Card>
              <Card id="reports">
                <CardHeader>
                  <CardTitle>Reports & System Modules</CardTitle>
                  <CardDescription>Buyers, products, B2B, payments, settlements, CMS and settings remain on this operating screen.</CardDescription>
                </CardHeader>
                <CardContent className="grid gap-3">
                  {[
                    ["Buyers", "0 live buyer profiles", "buyers"],
                    ["Products", "Real catalog connected", "products"],
                    ["B2B Leads", "0 live leads", "b2b"],
                    ["Payments", "0 captured payments", "payments"],
                    ["Settlements", "0 settlements due", "settlements"],
                    ["CMS", "Ready for content ops", "cms"],
                    ["Settings", "Supabase-ready", "settings"]
                  ].map(([title, value, id]) => (
                    <div className="rounded-lg bg-slate-50 p-3" id={id} key={title}>
                      <p className="text-sm font-semibold text-slate-950">{title}</p>
                      <p className="mt-1 text-xs text-slate-500">{value}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
