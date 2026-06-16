import {
  AlertTriangle,
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Headphones,
  LayoutDashboard,
  Megaphone,
  MessageCircle,
  MonitorDot,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Stethoscope,
  Truck,
  Users
} from "lucide-react";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { MetricPanel, RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  adminActions,
  automationRules,
  priorityMetrics,
  supportActivityFeed,
  supportAnalytics,
  supportKpis,
  supportTableColumns,
  supportTabs,
  ticketCategories,
  ticketDetailRows,
  ticketRows,
  ticketStatusMetrics
} from "@/lib/support-data";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Control Room", href: "/admin/control-room", icon: MonitorDot },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Suppliers", href: "#suppliers", icon: Building2 },
  { label: "Buyers", href: "#buyers", icon: Users },
  { label: "Products", href: "#products", icon: Package },
  { label: "Inventory", href: "#inventory", icon: FileText },
  { label: "Orders", href: "#orders", icon: ShoppingCart },
  { label: "Shipping", href: "#shipping", icon: Truck },
  { label: "Vet Consultations", href: "#vet", icon: Stethoscope },
  { label: "Notifications", href: "#notifications", icon: Megaphone },
  { label: "CMS", href: "/admin/cms", icon: FileText },
  { label: "Support", href: "/admin/support", icon: Headphones },
  { label: "Reports", href: "#reports", icon: ShieldCheck },
  { label: "Settings", href: "#settings", icon: Settings }
];

const ticketStatuses = ["Open", "In Progress", "Waiting For User", "Waiting For Supplier", "Escalated", "Resolved", "Closed"];
const priorities = ["Low", "Medium", "High", "Critical"];
const topActions = [
  "Assign Ticket",
  "Reply To User",
  "Escalate Ticket",
  "Mark Resolved",
  "Refund Request",
  "Contact Supplier",
  "Contact Buyer",
  "Send WhatsApp Message",
  "Add Internal Note"
];

export const metadata = {
  title: "Support Ticket Center | AnimKart OS",
  description: "AnimKart OS support command center for buyer, supplier, shipping, payment, order and vet support."
};

export default function AdminSupportPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Support" eyebrow="Support OS" items={sidebarItems} />

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Support Center</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Marketplace Trust</Badge>
                  <Badge className="bg-rose-50 text-rose-700">SLA Command</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Support Ticket Center</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search tickets, users, orders, suppliers..." />
                </div>
                <Button className="gap-2" variant="outline">
                  <CalendarDays className="text-[#0B8F47]" size={17} />
                  Last 7 days
                </Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/50">
              <div className="grid gap-6 p-5 sm:p-6 2xl:grid-cols-[1fr_420px] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Trust and resolution command center</p>
                  <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Resolve buyer complaints, supplier disputes, shipping failures, payment issues, order problems and vet support from one backend.
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">
                    Built like a Zendesk-grade marketplace support desk for AnimKart: SLA alerts, assignment queues, refund workflows,
                    supplier warnings, WhatsApp updates and internal notes in one support operating screen.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Critical trust watch</p>
                      <p className="mt-2 text-3xl font-black">29 high priority</p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">Shipping disputes and supplier response delays need immediate attention.</p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-xl bg-rose-500/15 text-rose-200">
                      <AlertTriangle size={24} />
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      ["Avg first response", "18m"],
                      ["SLA risk", "17"],
                      ["Resolved today", "42"],
                      ["CSAT", "91%"]
                    ].map(([label, value]) => (
                      <div className="rounded-xl border border-white/10 bg-white/8 p-3" key={label}>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-slate-400">{label}</p>
                        <p className="mt-1 text-xl font-black">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="border-t border-white/10 px-5 py-4 sm:px-6">
                <div className="flex flex-wrap gap-2">
                  {topActions.slice(0, 6).map((action) => (
                    <Button className="h-10 border-white/15 bg-white/10 px-4 text-sm text-white hover:bg-white/15" key={action} variant="outline">
                      {action}
                    </Button>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {supportKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <nav className="sticky top-0 z-30 mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur" id="all-tickets">
              {supportTabs.map((tab) => (
                <a
                  className="inline-flex h-10 shrink-0 items-center justify-center rounded-xl px-4 text-sm font-bold text-slate-700 hover:bg-emerald-50 hover:text-[#0B8F47]"
                  href={tab.href}
                  key={tab.label}
                >
                  {tab.label}
                </a>
              ))}
            </nav>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="grid gap-6">
                <Card id="open">
                  <CardHeader>
                    <CardTitle>Ticket Workspace</CardTitle>
                    <CardDescription>Central table for buyer, supplier, shipping, payment, order, product, vet and technical support.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={supportTableColumns.tickets} rows={ticketRows} />
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-3">
                  <Card id="pending">
                    <CardHeader>
                      <CardTitle>Ticket Categories</CardTitle>
                      <CardDescription>Issue type routing and ticket volume.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={ticketCategories} />
                    </CardContent>
                  </Card>
                  <Card id="resolved">
                    <CardHeader>
                      <CardTitle>Ticket Status</CardTitle>
                      <CardDescription>Open, progress, waiting, escalated, resolved and closed queues.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={ticketStatusMetrics} />
                    </CardContent>
                  </Card>
                  <Card id="high-priority">
                    <CardHeader>
                      <CardTitle>Priority Queue</CardTitle>
                      <CardDescription>Low, medium, high and critical SLA load.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={priorityMetrics} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Ticket Detail Drawer</CardTitle>
                      <CardDescription>Drawer-ready sections for full complaint resolution workflow.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={supportTableColumns.detail} rows={ticketDetailRows} />
                    </CardContent>
                  </Card>
                  <Card id="escalated">
                    <CardHeader>
                      <CardTitle>Admin Actions</CardTitle>
                      <CardDescription>Every action needed to resolve and protect marketplace trust.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={adminActions} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="buyer-tickets">
                    <CardHeader>
                      <CardTitle>Buyer Tickets</CardTitle>
                      <CardDescription>Buyer complaints, refund requests, order issues and product complaints.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel
                        metrics={[
                          { label: "Buyer Complaints", value: "62", detail: "Complaints from farmers, farms and pet buyers", status: "watch" },
                          { label: "Order Issues", value: "42", detail: "Delayed, wrong or missing items", status: "watch" },
                          { label: "Refund Requests", value: "13", detail: "Payment and cancellation linked", status: "watch" },
                          { label: "Buyer Satisfaction", value: "91%", detail: "Post-resolution survey score", status: "healthy" }
                        ]}
                      />
                    </CardContent>
                  </Card>
                  <Card id="supplier-tickets">
                    <CardHeader>
                      <CardTitle>Supplier Tickets</CardTitle>
                      <CardDescription>Supplier complaints, shipping disputes, payment issues and warnings.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel
                        metrics={[
                          { label: "Supplier Complaints", value: "31", detail: "Supplier-side marketplace issues", status: "watch" },
                          { label: "Payment Issues", value: "18", detail: "Settlement and payout problems", status: "watch" },
                          { label: "Supplier Warnings", value: "7", detail: "Created from complaint workflows", status: "critical" },
                          { label: "Avg Supplier Response", value: "2h 12m", detail: "Support response SLA", status: "healthy" }
                        ]}
                      />
                    </CardContent>
                  </Card>
                  <Card id="vet-tickets">
                    <CardHeader>
                      <CardTitle>Vet Tickets</CardTitle>
                      <CardDescription>Consultation, prescription, appointment and follow-up issues.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel
                        metrics={[
                          { label: "Vet Support Cases", value: "14", detail: "Active support cases", status: "healthy" },
                          { label: "Prescription Issues", value: "4", detail: "PDF, dosage or recommendation questions", status: "watch" },
                          { label: "Appointment Issues", value: "6", detail: "Reschedule or missed consultation", status: "watch" },
                          { label: "Follow-up Pending", value: "8", detail: "Needs vet support follow-up", status: "watch" }
                        ]}
                      />
                    </CardContent>
                  </Card>
                  <Card id="shipping">
                    <CardHeader>
                      <CardTitle>Shipping Dispute Desk</CardTitle>
                      <CardDescription>Failed deliveries, delayed orders, freight disputes and courier escalations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel
                        metrics={[
                          { label: "Failed Deliveries", value: "18", detail: "Needs courier or supplier action", status: "critical" },
                          { label: "Stuck In Transit", value: "21", detail: "Courier tracking stale", status: "critical" },
                          { label: "Freight Disputes", value: "7", detail: "Freight on actual confirmation issue", status: "watch" },
                          { label: "WhatsApp Updates Sent", value: "286", detail: "Buyer and supplier updates", status: "healthy" }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Automation</CardTitle>
                      <CardDescription>Auto-assignment, escalation, WhatsApp, email, refund and supplier warning workflows.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={automationRules} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Support Analytics</CardTitle>
                      <CardDescription>Ticket volume, resolution time, complaint scores and issue frequency.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={supportAnalytics} />
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Priority Operations</CardTitle>
                    <CardDescription>Actions support team uses all day.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {topActions.map((action) => (
                      <Button className="justify-start gap-2" key={action} variant={action === "Escalate Ticket" ? "default" : "outline"}>
                        <MessageCircle size={16} />
                        {action}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Ticket Status</CardTitle>
                    <CardDescription>Supported workflow states.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {ticketStatuses.map((status) => (
                        <Badge className={status === "Escalated" ? "bg-rose-50 text-rose-700" : "bg-slate-100 text-slate-700"} key={status}>
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Priority</CardTitle>
                    <CardDescription>Low, medium, high and critical routing.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2">
                      {priorities.map((priority) => (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={priority}>
                          <p className="text-sm font-black text-slate-950">{priority}</p>
                          <p className="mt-1 text-xs text-slate-500">SLA routing</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Live Support Feed</CardTitle>
                    <CardDescription>Realtime-ready support events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleActivityFeed activities={supportActivityFeed} />
                  </CardContent>
                </Card>
              </aside>
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
