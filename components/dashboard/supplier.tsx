"use client";

import { useMemo, useState, type ReactNode } from "react";
import Image from "next/image";
import { Camera, CheckCircle2, ImagePlus, PackagePlus, ShieldCheck, Store, Truck } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MetricPanel } from "@/components/role-dashboard/role-panels";
import { RoleTable } from "@/components/role-dashboard/role-table";
import {
  addProductSteps,
  supplierPanels,
  supplierProductManagementRows,
  supplierProductRows,
  supplierShippingRules,
  supplierStorefront,
  tableColumns
} from "@/lib/role-dashboard-data";

export function StoreHealthScore() {
  return <MetricPanel metrics={supplierPanels.inventory.slice(0, 4)} />;
}

export function SupplierSalesChart({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function RecentOrdersTable() {
  return <MetricPanel metrics={supplierPanels.orders} />;
}

export function ProductPerformanceTable() {
  return <RoleTable columns={tableColumns.supplierProducts} rows={supplierProductRows} />;
}

export function InventoryAlertsPanel() {
  return <MetricPanel metrics={supplierPanels.inventory} />;
}

export function ShippingSetupPanel() {
  return (
    <div className="grid gap-3">
      {supplierShippingRules.map((rule) => (
        <div className="grid gap-3 rounded-lg bg-slate-50 p-3 sm:grid-cols-[150px_1fr_80px]" key={rule.type}>
          <div>
            <p className="text-sm font-semibold text-slate-950">{rule.type}</p>
            <p className="text-xs text-slate-500">Priority {rule.priority}</p>
          </div>
          <p className="text-sm text-slate-600">{rule.example}</p>
          <p className="text-sm font-semibold text-amber-700">{rule.status}</p>
        </div>
      ))}
    </div>
  );
}

export function SettlementSummary() {
  return <MetricPanel metrics={supplierPanels.settlements} />;
}

export function SupplierDashboard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function SupplierStorefrontPreview() {
  return (
    <Card id="store">
      <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <Store size={20} />
            My Store Preview
          </CardTitle>
          <CardDescription>How buyers will experience your supplier store inside AnimKart.</CardDescription>
        </div>
        <Button className="w-full sm:w-auto" variant="outline">
          View public store
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
          <div className="bg-gradient-to-r from-[#0B8F47] via-emerald-700 to-slate-950 p-4 text-white sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <div className="grid size-16 place-items-center rounded-2xl bg-white text-2xl font-black text-[#0B8F47]">
                  {supplierStorefront.name.slice(0, 1).toUpperCase()}
                </div>
                <h3 className="mt-4 text-2xl font-bold">{supplierStorefront.name}</h3>
                <p className="mt-1 text-sm text-emerald-50">{supplierStorefront.tagline}</p>
              </div>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {[
                  ["Products", supplierStorefront.products],
                  ["Live", supplierStorefront.liveProducts],
                  ["Catalog", supplierStorefront.catalogValue],
                  ["Rating", supplierStorefront.rating]
                ].map(([label, value]) => (
                  <div className="rounded-xl bg-white/12 p-3 backdrop-blur" key={label}>
                    <p className="text-[11px] uppercase tracking-wide text-emerald-100">{label}</p>
                    <p className="mt-1 text-lg font-bold">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="border-b border-slate-200 px-4 py-3">
            <div className="flex gap-2 overflow-x-auto">
              {supplierStorefront.categories.map((category) => (
                <Badge className="shrink-0 bg-slate-100 text-slate-700" key={category}>
                  {category}
                </Badge>
              ))}
            </div>
          </div>
          <div className="grid gap-3 p-4 sm:grid-cols-2 xl:grid-cols-4">
            {supplierStorefront.featured.map((product) => (
              <div className="overflow-hidden rounded-xl border border-slate-200 bg-white" key={product.name}>
                <div className="aspect-[4/3] bg-slate-100">
                  {product.image ? (
                    <Image
                      alt={product.name}
                      className="h-full w-full object-contain p-3"
                      height={220}
                      src={product.image}
                      width={280}
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-slate-300">
                      <ImagePlus size={34} />
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold uppercase text-[#0B8F47]">{product.category}</p>
                  <p className="mt-1 line-clamp-2 min-h-10 text-sm font-bold text-slate-950">{product.name}</p>
                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="font-bold text-slate-950">{product.price}</span>
                    <Badge className="bg-emerald-50 text-[#0B8F47]">{product.stock}</Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function AmazonStyleAddProduct() {
  const [shippingRule, setShippingRule] = useState("product-wise");
  const [freightOnActual, setFreightOnActual] = useState(false);
  const [buyerPickup, setBuyerPickup] = useState(false);
  const shippingReady = Boolean(shippingRule) || freightOnActual || buyerPickup;
  const validationMessage = useMemo(() => {
    if (freightOnActual) {
      return "Ready: buyer will see that freight will be confirmed after order placement.";
    }

    if (buyerPickup) {
      return "Ready: buyer pickup is enabled from supplier warehouse.";
    }

    if (shippingRule) {
      return "Ready: shipping charge is configured for this product.";
    }

    return "Blocked: configure shipping, enable Freight On Actual, or allow Buyer Pickup before submit.";
  }, [buyerPickup, freightOnActual, shippingRule]);

  const shippingRuleOptions = [
    { id: "product-wise", title: "Product-wise rule", detail: "Best for medicines, feed, equipment and cold chain products." },
    { id: "pincode", title: "Pincode rule", detail: "Use exact serviceability and delivery charge for buyer location." },
    { id: "city-state", title: "City / State rule", detail: "Use for standard regional delivery charges." },
    { id: "weight", title: "Weight slab rule", detail: "Use when charge depends on 0-1kg, 1-5kg, 5-10kg or bulk." }
  ];

  return (
    <Card id="add-product">
      <CardHeader className="gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <CardTitle className="flex items-center gap-2">
            <PackagePlus size={20} />
            Add Product
          </CardTitle>
          <CardDescription>
            Seller Central style workflow for listing medicine, feed, equipment and bulk products.
          </CardDescription>
        </div>
        <Badge className="bg-amber-50 text-amber-700">Approval required before live</Badge>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 xl:grid-cols-[320px_1fr]">
          <div className="grid gap-3">
            {addProductSteps.map((item) => (
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={item.step}>
                <div className="flex items-center justify-between gap-3">
                  <span className="grid size-8 place-items-center rounded-full bg-white text-xs font-bold text-[#0B8F47]">
                    {item.step}
                  </span>
                  <Badge className={item.status === "Required" ? "bg-rose-50 text-rose-700" : ""}>{item.status}</Badge>
                </div>
                <p className="mt-3 font-semibold text-slate-950">{item.title}</p>
                <p className="mt-1 text-sm text-slate-500">{item.detail}</p>
              </div>
            ))}
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-4">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Product title</span>
                <Input placeholder="Cattle calcium supplement 5L" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">SKU</span>
                <Input placeholder="Auto or supplier SKU" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Category</span>
                <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
                  <option>Animal Healthcare</option>
                  <option>Animal Feed</option>
                  <option>Animal feed supplement</option>
                  <option>Veterinary</option>
                  <option>Equipment</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Animal type</span>
                <select className="h-10 rounded-lg border border-slate-200 bg-white px-3 text-sm text-slate-700">
                  <option>Cattle</option>
                  <option>Poultry</option>
                  <option>Aqua</option>
                  <option>Pet</option>
                  <option>All livestock</option>
                </select>
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Selling price</span>
                <Input placeholder="Rs 1,250" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">MOQ</span>
                <Input placeholder="1 unit / 10 bags / bulk only" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Stock quantity</span>
                <Input placeholder="Available quantity" />
              </label>
              <label className="grid gap-2">
                <span className="text-sm font-semibold text-slate-700">Expiry / batch</span>
                <Input placeholder="Batch number and expiry date" />
              </label>
              <label className="grid gap-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Product description</span>
                <textarea
                  className="min-h-24 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700"
                  placeholder="Dosage, ingredients, pack size, precautions and usage instructions"
                />
              </label>
            </div>

            <div className="mt-5 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-[#0B8F47]">Step 3: Shipping Configuration</p>
                  <h3 className="mt-1 text-xl font-bold text-slate-950">Set shipping before product goes live</h3>
                  <p className="mt-1 text-sm text-slate-600">
                    AnimKart will block product approval unless shipping is configured, Freight On Actual is enabled, or buyer pickup is allowed.
                  </p>
                </div>
                <Badge className={shippingReady ? "bg-emerald-100 text-[#0B8F47]" : "bg-rose-50 text-rose-700"}>
                  {shippingReady ? "Shipping ready" : "Shipping required"}
                </Badge>
              </div>

              <div className="mt-4 grid gap-3 lg:grid-cols-4">
                {shippingRuleOptions.map((rule) => {
                  const active = shippingRule === rule.id;
                  return (
                    <button
                      className={`rounded-xl border p-3 text-left transition ${
                        active
                          ? "border-[#0B8F47] bg-white shadow-sm"
                          : "border-slate-200 bg-white/70 hover:border-[#0B8F47]"
                      }`}
                      key={rule.id}
                      onClick={() => setShippingRule(active ? "" : rule.id)}
                      type="button"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="text-sm font-bold text-slate-950">{rule.title}</span>
                        {active ? <CheckCircle2 className="text-[#0B8F47]" size={18} /> : null}
                      </span>
                      <span className="mt-2 block text-xs leading-5 text-slate-500">{rule.detail}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-4 grid gap-4 lg:grid-cols-[1.1fr_1fr]">
                <div className="grid gap-3 rounded-xl border border-slate-200 bg-white p-4 sm:grid-cols-2">
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-slate-700">Product weight</span>
                    <Input placeholder="5 kg" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-slate-700">Delivery charge</span>
                    <Input placeholder="Rs 120" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-slate-700">Free shipping above</span>
                    <Input placeholder="Rs 5,000" />
                  </label>
                  <label className="grid gap-2">
                    <span className="text-sm font-semibold text-slate-700">Serviceable locations</span>
                    <Input placeholder="Delhi, Haryana, Rajasthan..." />
                  </label>
                  <label className="grid gap-2 sm:col-span-2">
                    <span className="text-sm font-semibold text-slate-700">Blocked locations</span>
                    <Input placeholder="States, cities or pincodes where delivery is not available" />
                  </label>
                </div>

                <div className="grid gap-3">
                  {[
                    {
                      title: "Freight On Actual",
                      detail: "For feed, equipment and bulk orders where final freight is confirmed after order placement.",
                      active: freightOnActual,
                      toggle: () => setFreightOnActual((value) => !value)
                    },
                    {
                      title: "Buyer Pickup",
                      detail: "Buyer can pickup from warehouse when delivery is expensive or not serviceable.",
                      active: buyerPickup,
                      toggle: () => setBuyerPickup((value) => !value)
                    }
                  ].map((option) => (
                    <button
                      className={`rounded-xl border p-4 text-left transition ${
                        option.active ? "border-[#0B8F47] bg-white shadow-sm" : "border-slate-200 bg-white/70 hover:border-[#0B8F47]"
                      }`}
                      key={option.title}
                      onClick={option.toggle}
                      type="button"
                    >
                      <span className="flex items-center justify-between gap-3">
                        <span className="font-bold text-slate-950">{option.title}</span>
                        <span
                          className={`grid h-6 w-11 place-items-center rounded-full text-[10px] font-bold ${
                            option.active ? "bg-[#0B8F47] text-white" : "bg-slate-200 text-slate-500"
                          }`}
                        >
                          {option.active ? "ON" : "OFF"}
                        </span>
                      </span>
                      <span className="mt-2 block text-sm leading-6 text-slate-500">{option.detail}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className={`mt-4 rounded-xl border p-3 text-sm font-semibold ${shippingReady ? "border-emerald-200 bg-white text-[#0B8F47]" : "border-rose-200 bg-rose-50 text-rose-700"}`}>
                {validationMessage}
              </div>
            </div>

            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {[
                { Icon: Camera, title: "Upload product images", detail: "Front, back, label and pack shots" },
                { Icon: Truck, title: "Configure shipping", detail: "Required or mark Freight on Actual" },
                { Icon: ShieldCheck, title: "Submit for approval", detail: "AnimKart verifies listing quality" }
              ].map(({ Icon, title, detail }) => (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3" key={title}>
                  <Icon className="text-[#0B8F47]" size={20} />
                  <p className="mt-2 text-sm font-semibold text-slate-950">{title}</p>
                  <p className="mt-1 text-xs text-slate-500">{detail}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:justify-end">
              <Button className="w-full sm:w-auto" variant="outline">
                Save draft
              </Button>
              <Button
                className={`w-full sm:w-auto ${shippingReady ? "" : "cursor-not-allowed opacity-60"}`}
                disabled={!shippingReady}
              >
                <CheckCircle2 size={16} />
                Submit for approval
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function ProductManagementTable() {
  return (
    <Card id="product-management">
      <CardHeader>
        <CardTitle>Product Management Features</CardTitle>
        <CardDescription>
          Add/edit/delete, approval status, SKU, price, stock, MOQ, expiry, image upload and category mapping workflow.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <RoleTable columns={tableColumns.supplierProductManagement} rows={supplierProductManagementRows} />
      </CardContent>
    </Card>
  );
}
