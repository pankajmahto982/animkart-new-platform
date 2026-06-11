import type { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MetricPanel } from "@/components/role-dashboard/role-panels";
import { RoleTable } from "@/components/role-dashboard/role-table";
import {
  buyerOrderRows,
  buyerPanels,
  buyerProductRows,
  buyerSupportRows,
  savedSupplierRows,
  tableColumns
} from "@/lib/role-dashboard-data";

export function BuyerDashboard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export function RecentOrders() {
  return <RoleTable columns={tableColumns.buyerOrders} rows={buyerOrderRows} />;
}

export function TrackOrderPanel() {
  return <MetricPanel metrics={buyerPanels.orders} />;
}

export function RepeatPurchaseSuggestions() {
  return <RoleTable columns={tableColumns.buyerProducts} rows={buyerProductRows} />;
}

export function SavedSuppliers() {
  return <RoleTable columns={tableColumns.savedSuppliers} rows={savedSupplierRows} />;
}

export function VetConsultationHistory() {
  return <MetricPanel metrics={buyerPanels.vet} />;
}

export function SupportTickets() {
  return <RoleTable columns={tableColumns.supportTickets} rows={buyerSupportRows} />;
}

export function BuyerShippingUxPanel() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buyer Shipping UX</CardTitle>
        <CardDescription>Checkout/order-level states buyers must clearly see before payment.</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {[
          "Shipping available",
          "Shipping charge visible",
          "Freight on Actual",
          "Buyer pickup available",
          "Delivery not available to this pincode",
          "Request quote instead"
        ].map((item) => (
          <div className="rounded-lg bg-slate-50 p-3 text-sm font-semibold text-slate-700" key={item}>
            {item}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
