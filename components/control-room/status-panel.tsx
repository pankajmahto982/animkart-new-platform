import { AlertTriangle, CheckCircle2, Radio } from "lucide-react";
import { StatusMetric } from "@/lib/control-room-data";

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export function StatusPanel({ metrics }: { metrics: StatusMetric[] }) {
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
