import Image from "next/image";
import Link from "next/link";
import {
  AlertTriangle,
  Bell,
  CheckCircle2,
  CreditCard,
  Download,
  FileDown,
  FileSpreadsheet,
  FileText,
  Headphones,
  LayoutDashboard,
  Package,
  PackagePlus,
  Radio,
  RefreshCw,
  Search,
  Settings,
  ShoppingCart,
  Store,
  Truck,
  Upload
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  expiryRows,
  inventoryAlerts,
  inventoryAnalytics,
  inventoryHealthScore,
  inventoryItems,
  inventoryKpis,
  inventoryStatusTabs,
  notificationChannels,
  reminderRules,
  selectedInventoryItem
} from "@/lib/inventory-management-data";

const sidebarItems = [
  { label: "Dashboard", href: "/supplier/dashboard", icon: LayoutDashboard },
  { label: "My Store", href: "/stores", icon: Store },
  { label: "Products", href: "/supplier/dashboard#products", icon: Package },
  { label: "Add Product", href: "/supplier/dashboard#add-product", icon: PackagePlus },
  { label: "Bulk Upload", href: "/supplier/dashboard#bulk-upload", icon: FileText },
  { label: "Inventory", href: "/supplier/inventory", icon: FileSpreadsheet },
  { label: "Orders", href: "/supplier/orders", icon: ShoppingCart },
  { label: "Shipping", href: "/supplier/shipping", icon: Truck },
  { label: "Payments", href: "/supplier/dashboard#payments", icon: CreditCard },
  { label: "Support", href: "/supplier/dashboard#support", icon: Headphones },
  { label: "Settings", href: "/supplier/dashboard#settings", icon: Settings }
];

const toneClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

const statusClass: Record<string, string> = {
  "In Stock": "bg-emerald-50 text-[#0B8F47]",
  "Low Stock": "bg-amber-50 text-amber-700",
  "Out Of Stock": "bg-rose-50 text-rose-700",
  "Confirm Availability": "bg-sky-50 text-sky-700",
  "Seasonal Product": "bg-purple-50 text-purple-700",
  "Bulk Order Only": "bg-indigo-50 text-indigo-700",
  "Made To Order": "bg-blue-50 text-blue-700"
};

export const metadata = {
  title: "Inventory Management Center | AnimKart Supplier OS",
  description: "Premium supplier inventory management center for AnimKart marketplace sellers."
};

export default function SupplierInventoryPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-slate-100 text-slate-950">
      <div className="flex min-h-screen flex-col xl:flex-row">
        <aside className="hidden w-72 shrink-0 border-r border-slate-200 bg-slate-950 text-white xl:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-white/10 p-6">
              <Link className="flex items-center gap-3" href="/supplier/dashboard">
                <span className="grid size-11 place-items-center rounded-xl bg-[#0B8F47] text-xl font-black">A</span>
                <span>
                  <span className="block text-lg font-bold">AnimKart OS</span>
                  <span className="text-xs font-semibold uppercase tracking-wide text-emerald-300">Supplier Inventory</span>
                </span>
              </Link>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {sidebarItems.map((item) => {
                const active = item.href === "/supplier/inventory";
                return (
                  <Link
                    className={
                      active
                        ? "flex items-center gap-3 rounded-lg bg-[#0B8F47] px-3 py-2.5 text-sm font-semibold text-white"
                        : "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/8 hover:text-white"
                    }
                    href={item.href}
                    key={item.label}
                  >
                    <item.icon size={18} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            <div className="m-4 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-4">
              <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Inventory SLA</p>
              <p className="mt-2 text-sm leading-6 text-slate-300">
                Keep stock fresh to avoid cancelled orders, buyer frustration and product visibility loss.
              </p>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="border-b border-slate-200 bg-white">
            <div className="grid gap-4 px-4 py-4 sm:px-6 2xl:grid-cols-[1fr_auto] 2xl:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge>Supplier OS</Badge>
                  <Badge className="bg-slate-100 text-slate-700">Inventory Management Center</Badge>
                  <Badge className="bg-amber-50 text-amber-700">Stock accuracy required</Badge>
                </div>
                <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">Inventory Management Center</h1>
              </div>
              <div className="grid gap-2 sm:flex sm:flex-wrap sm:items-center 2xl:justify-end">
                <div className="relative min-w-0 sm:w-96">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                  <Input className="pl-10" placeholder="Search product, SKU, batch, category..." />
                </div>
                <Button className="w-full sm:w-auto" variant="outline">Last 30 days</Button>
                <Button aria-label="Notifications" className="relative w-full px-3 sm:w-auto" variant="outline">
                  <Bell size={18} />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500" />
                </Button>
              </div>
            </div>
            <div className="border-t border-slate-100 px-4 py-3 sm:px-6">
              <div className="flex gap-2 overflow-x-auto">
                {inventoryStatusTabs.map((tab) => (
                  <button
                    className={
                      tab === "All Products"
                        ? "inline-flex h-10 shrink-0 items-center rounded-full bg-[#0B8F47] px-4 text-sm font-semibold text-white"
                        : "inline-flex h-10 shrink-0 items-center rounded-full border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 hover:border-[#0B8F47] hover:text-[#0B8F47]"
                    }
                    key={tab}
                    type="button"
                  >
                    {tab}
                  </button>
                ))}
              </div>
            </div>
          </header>

          <div className="grid gap-6 px-4 py-6 sm:px-6 2xl:grid-cols-[minmax(0,1fr)_380px]">
            <div className="min-w-0">
              <section className="rounded-2xl bg-slate-950 p-5 text-white sm:p-6">
                <div className="grid gap-6 xl:grid-cols-[1fr_440px] xl:items-center">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.22em] text-emerald-300">Inventory control workspace</p>
                    <h2 className="mt-4 max-w-5xl text-3xl font-bold leading-tight sm:text-5xl">
                      Manage stock accuracy, batch expiry, SKU visibility and bulk updates from one control center.
                    </h2>
                    <p className="mt-4 max-w-3xl text-sm leading-6 text-slate-300 sm:text-base">
                      Built for suppliers managing thousands of veterinary medicines, feed, supplements, equipment and animal care SKUs.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { label: "Add Inventory", Icon: PackagePlus },
                      { label: "Bulk Update Inventory", Icon: RefreshCw },
                      { label: "Import CSV", Icon: Upload },
                      { label: "Export Inventory", Icon: FileDown },
                      { label: "Download Template", Icon: Download },
                      { label: "Sync Products", Icon: RefreshCw }
                    ].map(({ label, Icon }) => (
                      <button className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/15 bg-white/10 px-3 text-sm font-semibold text-white hover:bg-white/15" key={label} type="button">
                        <Icon size={16} />
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                {inventoryKpis.map((kpi) => {
                  const Icon = kpi.tone === "healthy" ? CheckCircle2 : kpi.tone === "critical" ? AlertTriangle : Radio;
                  return (
                    <Card key={kpi.label}>
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{kpi.label}</p>
                            <p className="mt-2 text-2xl font-black text-slate-950">{kpi.value}</p>
                          </div>
                          <span className={`grid size-9 place-items-center rounded-lg ${toneClass[kpi.tone]}`}>
                            <Icon size={16} />
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-5 text-slate-500">{kpi.helper}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </section>

              <section className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {inventoryAlerts.map((alert) => (
                  <Card key={alert.title}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold text-slate-950">{alert.title}</p>
                          <p className="mt-1 text-sm leading-5 text-slate-500">{alert.detail}</p>
                        </div>
                        <span className={`grid min-h-10 min-w-10 place-items-center rounded-xl px-2 text-sm font-bold ${toneClass[alert.tone]}`}>
                          {alert.count}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </section>

              <section className="mt-6">
                <Card>
                  <CardHeader className="gap-3 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <CardTitle>Main Inventory Table</CardTitle>
                      <CardDescription>SKU-level inventory control with reserved stock, MOQ, freshness and action state.</CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {["Update Stock", "Mark Out Of Stock", "Hide Product", "Update Price", "Update MOQ", "Generate Inventory Report"].map((action) => (
                        <Button className="h-9" key={action} variant="outline">{action}</Button>
                      ))}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full min-w-[1240px] text-left text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500">
                            {[
                              "Product Image",
                              "Product Name",
                              "SKU",
                              "Category",
                              "Current Stock",
                              "Reserved Stock",
                              "Available Stock",
                              "MOQ",
                              "Last Updated",
                              "Inventory Status",
                              "Actions"
                            ].map((column) => (
                              <th className="px-4 py-3 font-semibold" key={column}>{column}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {inventoryItems.map((item) => (
                            <tr className="border-b border-slate-100 last:border-0" key={item.sku}>
                              <td className="px-4 py-4">
                                <div className="grid size-14 place-items-center rounded-lg bg-slate-50">
                                  {item.productImage ? (
                                    <Image alt={item.productName} className="h-12 w-12 object-contain" height={48} src={item.productImage} width={48} />
                                  ) : (
                                    <Package className="text-slate-300" size={22} />
                                  )}
                                </div>
                              </td>
                              <td className="max-w-[280px] px-4 py-4 font-semibold text-slate-950">
                                <span className="line-clamp-2">{item.productName}</span>
                              </td>
                              <td className="px-4 py-4 text-slate-600">{item.sku}</td>
                              <td className="px-4 py-4 text-slate-600">{item.category}</td>
                              <td className="px-4 py-4 font-bold text-slate-950">{item.currentStock}</td>
                              <td className="px-4 py-4 text-slate-600">{item.reservedStock}</td>
                              <td className="px-4 py-4 font-bold text-[#0B8F47]">{item.availableStock}</td>
                              <td className="px-4 py-4 text-slate-600">{item.moq}</td>
                              <td className="px-4 py-4 text-slate-600">{item.lastUpdated}</td>
                              <td className="px-4 py-4">
                                <Badge className={statusClass[item.inventoryStatus]}>{item.inventoryStatus}</Badge>
                              </td>
                              <td className="px-4 py-4">
                                <Button className="h-9" variant="outline">Update</Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </section>

              <section className="mt-6 grid gap-6 xl:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Bulk Inventory Update</CardTitle>
                    <CardDescription>CSV/Excel upload, preview, validate and submit changes.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                        <FileSpreadsheet className="mx-auto text-[#0B8F47]" size={34} />
                        <p className="mt-3 text-lg font-bold text-slate-950">Upload CSV or Excel inventory file</p>
                        <p className="mt-1 text-sm text-slate-500">Preview changes, validate stock, then submit updates.</p>
                        <Button className="mt-5">Choose file</Button>
                      </div>
                      <div className="grid gap-2 sm:grid-cols-4">
                        {["CSV Upload", "Excel Upload", "Preview Changes", "Validate Data", "Submit Changes"].map((step) => (
                          <div className="rounded-lg bg-emerald-50 p-3 text-center text-sm font-bold text-[#0B8F47]" key={step}>{step}</div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Analytics Widgets</CardTitle>
                    <CardDescription>Movement and demand signals for inventory decisions.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {inventoryAnalytics.map((item) => (
                        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4" key={item.label}>
                          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">{item.label}</p>
                          <p className="mt-2 text-2xl font-black text-slate-950">{item.value}</p>
                          <p className="mt-1 text-sm text-slate-500">{item.helper}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </section>
            </div>

            <aside className="space-y-4 2xl:sticky 2xl:top-6 2xl:self-start">
              <Card>
                <CardHeader>
                  <CardTitle>Inventory Health Score</CardTitle>
                  <CardDescription>95+ Excellent, 80+ Good, 60+ Warning, below 60 Critical.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid place-items-center rounded-2xl bg-slate-950 p-6 text-white">
                    <div className="grid size-32 place-items-center rounded-full border-[10px] border-[#0B8F47] bg-white text-4xl font-black text-slate-950">
                      {inventoryHealthScore}
                    </div>
                    <p className="mt-4 text-center text-sm text-slate-300">
                      Based on update frequency, stock accuracy, order fulfillment and cancellation due to stock.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expiry Management</CardTitle>
                  <CardDescription>Batch, manufacturing date, expiry and alert state.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {expiryRows.map((row) => (
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={`${row.product}-${row.batchNumber}`}>
                        <p className="line-clamp-1 text-sm font-bold text-slate-950">{row.product}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-slate-500">
                          <span>Batch: {row.batchNumber}</span>
                          <span>MFG: {row.manufacturingDate}</span>
                          <span>EXP: {row.expiryDate}</span>
                          <Badge className={row.alert === "Expired" ? "bg-rose-50 text-rose-700" : row.alert === "Near Expiry" ? "bg-amber-50 text-amber-700" : "bg-emerald-50 text-[#0B8F47]"}>
                            {row.alert}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Auto Reminder System</CardTitle>
                  <CardDescription>Visibility rules when inventory is stale.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {reminderRules.map((rule) => (
                      <div className="rounded-xl border border-slate-200 bg-white p-3" key={rule.day}>
                        <div className="flex items-center gap-3">
                          <span className="grid size-10 place-items-center rounded-full bg-emerald-50 text-xs font-black text-[#0B8F47]">{rule.day}</span>
                          <div>
                            <p className="text-sm font-bold text-slate-950">{rule.action}</p>
                            <p className="mt-1 text-xs text-slate-500">{rule.detail}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                  <CardDescription>Dashboard, Email, WhatsApp and SMS channels.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {notificationChannels.map((item) => (
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3" key={item.channel}>
                        <div>
                          <p className="text-sm font-bold text-slate-950">{item.channel}</p>
                          <p className="mt-1 text-xs text-slate-500">{item.detail}</p>
                        </div>
                        <Badge>{item.status}</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Selected SKU</CardTitle>
                  <CardDescription>{selectedInventoryItem.sku}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-3">
                    {[
                      ["Current Stock", selectedInventoryItem.currentStock],
                      ["Reserved Stock", selectedInventoryItem.reservedStock],
                      ["Available Stock", selectedInventoryItem.availableStock],
                      ["MOQ", selectedInventoryItem.moq],
                      ["Last Updated", selectedInventoryItem.lastUpdated],
                      ["Status", selectedInventoryItem.inventoryStatus]
                    ].map(([label, value]) => (
                      <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3" key={label as string}>
                        <p className="text-sm font-semibold text-slate-600">{label as string}</p>
                        <p className="text-right text-sm font-bold text-slate-950">{value as string | number}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </aside>
          </div>
        </section>
      </div>
    </main>
  );
}
