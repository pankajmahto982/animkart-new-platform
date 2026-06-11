import { ReactNode } from "react";
import { DashboardSidebar } from "@/components/role-dashboard/dashboard-sidebar";
import { RoleKpiCard } from "@/components/role-dashboard/role-kpi-card";
import { RoleTable } from "@/components/role-dashboard/role-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export function DashboardLayout({ children }: { children: ReactNode }) {
  return <main className="min-h-screen bg-slate-100 text-slate-950">{children}</main>;
}

export const Sidebar = DashboardSidebar;
export const KpiCard = RoleKpiCard;
export const DataTable = RoleTable;
export const StatusBadge = Badge;

export function ActionButton({ children }: { children: ReactNode }) {
  return (
    <Button className="h-9 bg-[#0B8F47] px-3 text-xs text-white hover:bg-[#08783c]">
      {children}
    </Button>
  );
}

export function Topbar({ children }: { children: ReactNode }) {
  return <header className="border-b border-slate-200 bg-white">{children}</header>;
}

export function NotificationPanel({ children }: { children: ReactNode }) {
  return <div className="grid gap-3">{children}</div>;
}
