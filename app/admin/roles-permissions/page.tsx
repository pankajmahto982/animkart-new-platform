import {
  BarChart3,
  Bell,
  Building2,
  FileText,
  Headphones,
  LayoutDashboard,
  LockKeyhole,
  Megaphone,
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
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  auditLogColumns,
  auditLogRows,
  permissionActivity,
  permissionColumns,
  permissionMatrixColumns,
  permissionMatrixRows,
  permissionModules,
  roleExamples,
  securityMetrics,
  userRoles
} from "@/lib/rbac-data";

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
  title: "Roles & Permissions | AnimKart OS",
  description: "AnimKart OS role-based permissions matrix and audit logs."
};

export default function RolesPermissionsPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <DashboardSidebar active="Settings" eyebrow="RBAC Console" items={sidebarItems} />
        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Permissions Matrix</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Enterprise RBAC</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">Audit-ready</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Roles & Permissions</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search role, module, permission..." />
                </div>
                <Button className="bg-[#0B8F47] text-white hover:bg-[#08783c]"><LockKeyhole size={18} /> Save Permissions</Button>
                <Button aria-label="Notifications" className="relative px-3" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
          </header>

          <div className="px-4 py-6 sm:px-6">
            <section className="overflow-hidden rounded-3xl bg-slate-950 text-white shadow-xl shadow-slate-300/50">
              <div className="grid gap-6 p-6 xl:grid-cols-[1fr_420px]">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Secure permission operating system</p>
                  <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Control who can view, create, edit, delete, approve and export every AnimKart module.
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300">
                    Role templates are ready for Supabase Auth claims, Postgres RLS policies and enterprise audit logs.
                  </p>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {[["Roles", userRoles.length], ["Modules", permissionModules.length], ["Permission Columns", permissionColumns.length], ["Audit Events", auditLogRows.length]].map(([label, value]) => (
                    <div className="rounded-xl border border-white/10 bg-white/8 p-4" key={label as string}>
                      <p className="text-[11px] font-bold uppercase tracking-wide text-emerald-300">{label as string}</p>
                      <p className="mt-2 text-3xl font-black">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
              <div className="grid gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Permissions Matrix</CardTitle>
                    <CardDescription>Rows are modules; columns are View, Create, Edit, Delete, Approve and Export.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={permissionMatrixColumns} rows={permissionMatrixRows} />
                  </CardContent>
                </Card>
                <section className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Role Permission Examples</CardTitle>
                      <CardDescription>Common access templates for real AnimKart teams.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={roleExamples} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Security Features</CardTitle>
                      <CardDescription>Authentication, session and audit controls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={securityMetrics} />
                    </CardContent>
                  </Card>
                </section>
                <Card>
                  <CardHeader>
                    <CardTitle>Audit Log</CardTitle>
                    <CardDescription>User login, permission changes, approvals, payments and order status changes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={auditLogColumns} rows={auditLogRows} />
                  </CardContent>
                </Card>
              </div>
              <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Role Templates</CardTitle>
                    <CardDescription>Available roles in AnimKart OS.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {userRoles.map((role) => (
                      <Badge className={role === "Super Admin" ? undefined : "bg-slate-100 text-slate-700"} key={role}>{role}</Badge>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Permission Activity</CardTitle>
                    <CardDescription>Realtime-ready role and security events.</CardDescription>
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
