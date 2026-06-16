import {
  BarChart3,
  Bell,
  Building2,
  CheckCircle2,
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
  Users
} from "lucide-react";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { MetricPanel, RoleActivityFeed } from "@/components/role-dashboard/role-panels";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { ProductImage } from "@/components/product-image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  adminAlerts,
  aiQualityChecks,
  approvalActions,
  approvalActivity,
  approvalProducts,
  bulkActions,
  productAnalytics,
  productApprovalKpis,
  productApprovalTabs,
  quickActions,
  reviewDrawerSections,
  validationRules,
  warningRules
} from "@/lib/product-approval-data";

const sidebarItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Control Room", href: "/admin/control-room", icon: MonitorDot },
  { label: "Analytics", href: "/admin/analytics", icon: BarChart3 },
  { label: "Suppliers", href: "#suppliers", icon: Building2 },
  { label: "Buyers", href: "#buyers", icon: Users },
  { label: "Products", href: "/admin/products", icon: Package },
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

const statusClass: Record<string, string> = {
  Draft: "bg-slate-100 text-slate-700",
  "Pending Approval": "bg-amber-50 text-amber-700",
  Approved: "bg-emerald-50 text-[#0B8F47]",
  Rejected: "bg-rose-50 text-rose-700",
  Hidden: "bg-slate-100 text-slate-700",
  Flagged: "bg-orange-50 text-orange-700",
  "Review Required": "bg-sky-50 text-sky-700",
  Configured: "bg-emerald-50 text-[#0B8F47]",
  "Freight / missing rule": "bg-amber-50 text-amber-700"
};

export const metadata = {
  title: "Product Approval & Quality Control | AnimKart OS",
  description: "AnimKart OS product approval and catalog quality control center."
};

export default function AdminProductsPage() {
  const averageHealth = Math.round(approvalProducts.reduce((sum, product) => sum + product.healthScore, 0) / approvalProducts.length);

  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="Products" eyebrow="Catalog Quality" items={sidebarItems} />

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Product Approval</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Quality Control</Badge>
                  <Badge className="bg-emerald-50 text-[#0B8F47]">Real catalog connected</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">Product Approval & Quality Control</h1>
              </div>
              <div className="flex flex-wrap items-center gap-3 2xl:justify-end">
                <div className="relative min-w-0 xl:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search product, supplier, SKU, category..." />
                </div>
                <Button className="bg-[#0B8F47] text-white hover:bg-[#08783c]">Bulk Export</Button>
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
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Amazon-style catalog quality desk</p>
                  <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Review, approve, reject, flag and monitor every supplier product before it goes live.
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">
                    Built for AnimKart catalog teams to maintain image quality, shipping readiness, stock accuracy, GST compliance,
                    supplier verification and product trust across thousands of animal health SKUs.
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {bulkActions.map((action) => (
                      <Button className="border-white/15 bg-white/10 text-white hover:bg-white/15" key={action} variant="outline">
                        {action}
                      </Button>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Product Health Score</p>
                      <p className="mt-2 text-5xl font-black">{averageHealth}</p>
                      <p className="mt-2 text-sm text-slate-300">80 good, 60 warning, below 60 critical.</p>
                    </div>
                    <span className="grid size-14 place-items-center rounded-2xl bg-[#0B8F47]">
                      <CheckCircle2 size={26} />
                    </span>
                  </div>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-white/10">
                    <div className="h-full rounded-full bg-[#0B8F47]" style={{ width: `${averageHealth}%` }} />
                  </div>
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {productApprovalKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <nav className="sticky top-0 z-30 mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur" id="all-products">
              {productApprovalTabs.map((tab) => (
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
                <Card id="pending-approval">
                  <CardHeader>
                    <CardTitle>Product Approval Workspace</CardTitle>
                    <CardDescription>Review product image, supplier, category, price, stock, MOQ, shipping and approval status.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProductApprovalTable />
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Product Validation Rules</CardTitle>
                      <CardDescription>Required fields before any product can go live.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={validationRules} />
                    </CardContent>
                  </Card>
                  <Card id="flagged">
                    <CardHeader>
                      <CardTitle>Warnings</CardTitle>
                      <CardDescription>Catalog risks that require admin review.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={warningRules} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Quality Check</CardTitle>
                      <CardDescription>Image, SEO, shipping, inventory and health scores.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={aiQualityChecks} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1fr_0.95fr]">
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Product Review Drawer</CardTitle>
                      <CardDescription>Drawer-ready fields for deep product review and approval history.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={reviewDrawerSections} />
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Admin Alerts</CardTitle>
                      <CardDescription>Shipping, image, approval SLA, duplicate, GST and supplier verification alerts.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={adminAlerts} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle>Approval Actions</CardTitle>
                      <CardDescription>Actions catalog admins can apply to a product review.</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-wrap gap-2">
                      {approvalActions.map((action) => (
                        <Button className={action.includes("Reject") || action.includes("Suspend") ? "border-rose-200 text-rose-700" : ""} key={action} variant="outline">
                          {action}
                        </Button>
                      ))}
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader>
                      <CardTitle>Analytics</CardTitle>
                      <CardDescription>Upload volume, approval quality, category and supplier insights.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel metrics={productAnalytics} />
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Daily catalog operations shortcuts.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {quickActions.map((action) => (
                      <Button className="justify-start" key={action} variant={action === "Approve" ? "default" : "outline"}>
                        {action}
                      </Button>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Approval Status</CardTitle>
                    <CardDescription>Supported catalog workflow states.</CardDescription>
                  </CardHeader>
                  <CardContent className="flex flex-wrap gap-2">
                    {["Draft", "Pending Approval", "Approved", "Rejected", "Hidden", "Flagged", "Review Required"].map((status) => (
                      <Badge className={statusClass[status]} key={status}>{status}</Badge>
                    ))}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Live Catalog Activity</CardTitle>
                    <CardDescription>Realtime-ready approval feed.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleActivityFeed activities={approvalActivity} />
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

function ProductApprovalTable() {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[1280px] text-left text-sm">
        <thead>
          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
            {[
              "Product Image",
              "Product Name",
              "Supplier",
              "Category",
              "Brand",
              "Price",
              "Stock",
              "MOQ",
              "Shipping Status",
              "Approval Status",
              "Created Date",
              "Actions"
            ].map((heading) => (
              <th className="px-4 py-3 font-semibold" key={heading}>{heading}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {approvalProducts.map((product) => (
            <tr className="border-b border-slate-100 last:border-0" key={product.id}>
              <td className="px-4 py-4">
                <div className="relative size-16 overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                  <ProductImage alt={product.name} category={product.category} src={product.image} />
                </div>
              </td>
              <td className="max-w-[280px] px-4 py-4">
                <p className="line-clamp-2 font-black text-slate-950">{product.name}</p>
                <p className="mt-1 text-xs text-slate-500">Health score {product.healthScore}/100</p>
              </td>
              <td className="px-4 py-4 font-semibold text-slate-700">{product.supplier}</td>
              <td className="px-4 py-4 text-slate-700">{product.category}</td>
              <td className="px-4 py-4 text-slate-700">{product.brand}</td>
              <td className="px-4 py-4 font-black text-slate-950">{product.price}</td>
              <td className="px-4 py-4 text-slate-700">{product.stock}</td>
              <td className="px-4 py-4 text-slate-700">{product.moq}</td>
              <td className="px-4 py-4">
                <Badge className={statusClass[product.shippingStatus]}>{product.shippingStatus}</Badge>
              </td>
              <td className="px-4 py-4">
                <Badge className={statusClass[product.approvalStatus]}>{product.approvalStatus}</Badge>
              </td>
              <td className="px-4 py-4 text-slate-700">{product.createdDate}</td>
              <td className="px-4 py-4">
                <div className="flex gap-2">
                  <Button className="h-8 px-3 text-xs">Approve</Button>
                  <Button className="h-8 px-3 text-xs" variant="outline">Review</Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
