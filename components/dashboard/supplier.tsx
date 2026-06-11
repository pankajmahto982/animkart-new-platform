import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricPanel } from "@/components/role-dashboard/role-panels";
import { RoleTable } from "@/components/role-dashboard/role-table";
import {
  supplierPanels,
  supplierProductManagementRows,
  supplierProductRows,
  supplierShippingRules,
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

export function ProductManagementTable() {
  return (
    <Card>
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
