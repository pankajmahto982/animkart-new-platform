import type { ReactNode } from "react";

export { DashboardAreaChart as RevenueChart, DashboardBarChart as VisitorChart } from "@/components/role-dashboard/dashboard-chart";
export { MetricPanel as OrderCommandCenter, MetricPanel as InventoryHealthPanel, MetricPanel as ShippingIssuesPanel, MetricPanel as VetStatusPanel } from "@/components/role-dashboard/role-panels";
export { RoleActivityFeed as LiveActivityFeed } from "@/components/role-dashboard/role-panels";
export { RoleTable as SupplierPerformanceTable, RoleTable as ProductApprovalQueue } from "@/components/role-dashboard/role-table";

export function AdminDashboard({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
