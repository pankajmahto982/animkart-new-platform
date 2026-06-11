import { AlertTriangle, CheckCircle2, Radio } from "lucide-react";
import { ActivityItem, PanelMetric } from "@/lib/role-dashboard-data";

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  success: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  warning: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700",
  info: "bg-sky-50 text-sky-700"
};

export function MetricPanel({ metrics }: { metrics: PanelMetric[] }) {
  return (
    <div className="grid gap-3">
      {metrics.map((metric) => {
        const Icon = metric.status === "healthy" ? CheckCircle2 : metric.status === "critical" ? AlertTriangle : Radio;

        return (
          <div className="flex items-center justify-between gap-3 rounded-lg bg-slate-50 p-3" key={metric.label}>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-slate-950">{metric.label}</p>
              <p className="mt-1 truncate text-xs text-slate-500">{metric.detail}</p>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <span className="text-lg font-bold text-slate-950">{metric.value}</span>
              <span className={`grid size-8 place-items-center rounded-lg ${statusClass[metric.status]}`}>
                <Icon size={15} />
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export function RoleActivityFeed({ activities }: { activities: ActivityItem[] }) {
  return (
    <div className="grid gap-3">
      {activities.map((activity) => {
        const Icon = activity.status === "success" ? CheckCircle2 : activity.status === "critical" ? AlertTriangle : Radio;

        return (
          <div className="flex gap-3 rounded-lg border border-slate-100 bg-white p-3" key={`${activity.title}-${activity.time}`}>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${statusClass[activity.status]}`}>
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-950">{activity.title}</p>
              <p className="mt-1 truncate text-sm text-slate-500">{activity.detail}</p>
            </div>
            <span className="shrink-0 text-xs font-medium text-slate-400">{activity.time}</span>
          </div>
        );
      })}
    </div>
  );
}
