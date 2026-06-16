import {
  BarChart3,
  Bell,
  Building2,
  CalendarDays,
  FileText,
  Headphones,
  Image as ImageIcon,
  LayoutDashboard,
  Megaphone,
  MonitorDot,
  Package,
  Search,
  Settings,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
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
  bannerFields,
  blogRows,
  categoryBannerRows,
  cmsActivityFeed,
  cmsAnalytics,
  cmsKpis,
  cmsQuickActions,
  cmsRealCatalogSummary,
  cmsTableColumns,
  cmsTabs,
  homepageSections,
  mediaRows,
  offerRows,
  popupRows,
  previewMetrics,
  seoRows
} from "@/lib/cms-data";

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
  { label: "Support", href: "#support", icon: Headphones },
  { label: "Reports", href: "#reports", icon: ShieldCheck },
  { label: "Settings", href: "#settings", icon: Settings }
];

const statusTypes = ["Draft", "Scheduled", "Published", "Expired", "Archived"];
const quickActions = ["Publish", "Duplicate", "Schedule", "Preview", "Archive", "Delete"];
const mediaTypes = ["Images", "Videos", "PDFs", "Icons", "Documents", "Search Media", "Bulk Upload"];

export const metadata = {
  title: "CMS & Banner Management | AnimKart OS",
  description: "AnimKart OS CMS center for banners, offers, promotions, blogs, media and SEO."
};

export default function AdminCmsPage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-950">
      <div className="flex min-h-screen">
        <DashboardSidebar active="CMS" eyebrow="Content OS" items={sidebarItems} />

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Admin CMS</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Banner Management</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Promotion-ready</Badge>
                </div>
                <h1 className="mt-2 text-3xl font-black tracking-tight">CMS & Banner Management Center</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-80">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search banners, blogs, offers, media..." />
                </div>
                <Button className="gap-2" variant="outline">
                  <CalendarDays className="text-[#0B8F47]" size={17} />
                  This month
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
              <div className="grid gap-6 p-5 sm:p-6 2xl:grid-cols-[1fr_460px] 2xl:items-center">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-emerald-300">Website content command center</p>
                  <h2 className="mt-4 max-w-5xl text-3xl font-black leading-tight sm:text-5xl">
                    Control homepage banners, category creatives, offers, popups, blogs, media and SEO without developer support.
                  </h2>
                  <p className="mt-4 max-w-4xl text-sm leading-6 text-slate-300 sm:text-base">
                    A premium AnimKart content operating layer for marketing teams to publish campaigns, schedule promotions,
                    preview responsive banners and keep the marketplace fresh across farmer, supplier and vet journeys.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/8 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Live catalog context</p>
                      <p className="mt-2 text-2xl font-black">Content tied to real products</p>
                    </div>
                    <span className="grid size-12 place-items-center rounded-xl bg-[#0B8F47]">
                      <Sparkles size={22} />
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    {[
                      ["Products", cmsRealCatalogSummary.products],
                      ["Live SKUs", cmsRealCatalogSummary.liveProducts],
                      ["Media-ready", cmsRealCatalogSummary.mediaReadyProducts],
                      ["Categories", cmsRealCatalogSummary.categories]
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
                  {cmsQuickActions.map((action) => (
                    <a
                      className="inline-flex h-10 items-center justify-center rounded-lg border border-white/15 bg-white/10 px-4 text-sm font-semibold text-white hover:bg-white/15"
                      href={action.href}
                      key={action.label}
                    >
                      {action.label}
                    </a>
                  ))}
                </div>
              </div>
            </section>

            <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-6">
              {cmsKpis.map((kpi) => (
                <RoleKpiCard key={kpi.label} kpi={kpi} />
              ))}
            </section>

            <nav className="sticky top-0 z-30 mt-6 flex gap-2 overflow-x-auto rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-sm backdrop-blur">
              {cmsTabs.map((tab) => (
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
                <Card id="homepage">
                  <CardHeader>
                    <CardTitle>Homepage Management</CardTitle>
                    <CardDescription>Drag-and-drop homepage sections for the marketplace storefront.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-6 xl:grid-cols-[1fr_1fr]">
                    <MetricPanel metrics={homepageSections} />
                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                      <p className="text-sm font-black text-slate-950">Homepage section builder</p>
                      <div className="mt-4 grid gap-3">
                        {["Hero Banner", "Categories Grid", "Featured Products", "Top Suppliers", "Vet Consultation Banner", "Bulk Inquiry Section", "Brands", "Knowledge Center", "Testimonials", "Footer"].map((section, index) => (
                          <div className="flex items-center justify-between rounded-xl bg-white p-3 shadow-sm" id={index === 0 ? "homepage-sections" : undefined} key={section}>
                            <div className="flex items-center gap-3">
                              <span className="grid size-8 place-items-center rounded-lg bg-emerald-50 text-sm font-black text-[#0B8F47]">{index + 1}</span>
                              <span className="text-sm font-semibold text-slate-950">{section}</span>
                            </div>
                            <Badge className={index === 5 ? "bg-amber-50 text-amber-700" : undefined}>{index === 5 ? "Draft" : "Live"}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Homepage Banner Fields</CardTitle>
                    <CardDescription>Structured fields ready for Supabase CMS tables and storage buckets.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MetricPanel metrics={bannerFields} />
                  </CardContent>
                </Card>

                <Card id="category-pages">
                  <CardHeader>
                    <CardTitle>Category Banner Management</CardTitle>
                    <CardDescription>Desktop and mobile creative control by animal-health category.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleTable columns={cmsTableColumns.categoryBanners} rows={categoryBannerRows} />
                  </CardContent>
                </Card>

                <section className="grid gap-6 xl:grid-cols-2">
                  <Card id="offers">
                    <CardHeader>
                      <CardTitle>Offer Management</CardTitle>
                      <CardDescription>Coupons, discounts, category offers and campaign date controls.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={cmsTableColumns.offers} rows={offerRows} />
                    </CardContent>
                  </Card>
                  <Card id="popups">
                    <CardHeader>
                      <CardTitle>Popup Management</CardTitle>
                      <CardDescription>Exit intent, homepage, offer, newsletter and vet consultation popups.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={cmsTableColumns.popups} rows={popupRows} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                  <Card id="blogs">
                    <CardHeader>
                      <CardTitle>Blog Management</CardTitle>
                      <CardDescription>Rich text editor, image upload, SEO title, slug, category and publish schedule.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={cmsTableColumns.blogs} rows={blogRows} />
                    </CardContent>
                  </Card>
                  <Card id="media">
                    <CardHeader>
                      <CardTitle>Media Library</CardTitle>
                      <CardDescription>Images, videos, PDFs, icons and campaign documents.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {mediaTypes.map((type) => (
                          <Badge className="bg-slate-100 text-slate-700" key={type}>{type}</Badge>
                        ))}
                      </div>
                      <RoleTable columns={cmsTableColumns.media} rows={mediaRows} />
                    </CardContent>
                  </Card>
                </section>

                <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                  <Card id="seo">
                    <CardHeader>
                      <CardTitle>SEO Management</CardTitle>
                      <CardDescription>Homepage, category, product and blog SEO with schema markup readiness.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <RoleTable columns={cmsTableColumns.seo} rows={seoRows} />
                    </CardContent>
                  </Card>
                  <Card id="product-pages">
                    <CardHeader>
                      <CardTitle>Product Page Content Modules</CardTitle>
                      <CardDescription>Reusable product-page content slots for trust, offers and recommendations.</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <MetricPanel
                        metrics={[
                          { label: "Offer Strip", value: "Ready", detail: "Product-level promo banner slot", status: "healthy" },
                          { label: "Trust Badges", value: "Live", detail: "Verified supplier, GST invoice, secure payment", status: "healthy" },
                          { label: "Vet Recommendation Widget", value: "Live", detail: "Ask Vet and book consultation modules", status: "healthy" },
                          { label: "Bulk Inquiry Widget", value: "Ready", detail: "Quantity, location and phone capture", status: "healthy" },
                          { label: "Related Products", value: "Auto", detail: "Catalog category matching", status: "healthy" }
                        ]}
                      />
                    </CardContent>
                  </Card>
                </section>
              </div>

              <aside className="space-y-6 2xl:sticky 2xl:top-6 2xl:self-start">
                <Card>
                  <CardHeader>
                    <CardTitle>Preview Studio</CardTitle>
                    <CardDescription>Responsive review before publishing campaigns.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                      <div className="grid h-36 place-items-center bg-gradient-to-br from-emerald-50 via-white to-slate-100">
                        <div className="text-center">
                          <span className="mx-auto grid size-12 place-items-center rounded-xl bg-[#0B8F47] text-white">
                            <ImageIcon size={22} />
                          </span>
                          <p className="mt-3 text-sm font-black text-slate-950">Homepage Hero Preview</p>
                          <p className="text-xs text-slate-500">Desktop, tablet and mobile creative checks</p>
                        </div>
                      </div>
                    </div>
                    <MetricPanel metrics={previewMetrics} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Status Types</CardTitle>
                    <CardDescription>Publishing states for all CMS content.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {statusTypes.map((status) => (
                        <Badge className={status === "Published" ? undefined : "bg-slate-100 text-slate-700"} key={status}>
                          {status}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Content workflow controls.</CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-2">
                    {quickActions.map((action) => (
                      <Button className={action === "Delete" ? "justify-start border-rose-200 text-rose-700" : "justify-start"} key={action} variant="outline">
                        {action}
                      </Button>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics</CardTitle>
                    <CardDescription>Banner, offer, popup, blog and homepage performance.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <MetricPanel metrics={cmsAnalytics} />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent CMS Activity</CardTitle>
                    <CardDescription>Publishing and approval events.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RoleActivityFeed activities={cmsActivityFeed} />
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
