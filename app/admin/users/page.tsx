import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Headphones,
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
  UserPlus,
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
import { adminActions, permissionActivity, securityMetrics, userKpis, usersRows, usersTableColumns, userStatusMetrics } from "@/lib/rbac-data";

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
  { label: "Settings", href: "/admin/roles-permissions", icon: Settings }
];

export const metadata = {
  title: "User Management | AnimKart OS",
  description: "Role-based user management for AnimKart OS."
};

export default function AdminUsersPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Settings" eyebrow="Access Control" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>User Management</Badge>
                  <Badge className="bg-slate-100 text-slate-700">RBAC</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">Supabase Auth-ready</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Admin Users</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search users, roles, phone, email..." />
                </div>
                <Button variant="outline"><CalendarDays size={17} /> Last 30 days</Button>
                <Button className="bg-[#0B8F47] text-white hover:bg-[#08783c]"><UserPlus size={18} /> Create User</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-xl shadow-slate-300/50">
              <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Enterprise identity layer</p>
              <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                Manage super admins, staff, suppliers, buyers, vets, support, finance, operations and content users from one secure console.
              </h2>
              <div className="mt-5 flex flex-wrap gap-2">
                {["Create User", "Edit Role", "Suspend User", "Reset Password", "Send Invite", "View Activity", "Change Permissions"].map((action) => (
                  <Button className="border-white/15 bg-white/10 text-white hover:bg-white/15" key={action} variant="outline">{action}</Button>
                ))}
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {userKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>User Table</CardTitle>
                    <CardDescription>Name, email, phone, role, status, last login, created date and actions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={usersTableColumns} rows={usersRows} />
                  </CardContent>
                </Card>
                <section className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>User Status</CardTitle>
                      <CardDescription>Active, inactive, pending, suspended and blocked access states.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={userStatusMetrics} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Features</CardTitle>
                      <CardDescription>Two-factor authentication, OTP, sessions, login history and audit logs.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={securityMetrics} />
                    </CardContent>
                  </Card>
                </section>
              </div>
              <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Admin Actions</CardTitle>
                    <CardDescription>Account control workflows.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MetricPanel metrics={adminActions} />
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Access Events</CardTitle>
                    <CardDescription>Realtime-ready permission activity.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleActivityFeed activities={permissionActivity} />
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
