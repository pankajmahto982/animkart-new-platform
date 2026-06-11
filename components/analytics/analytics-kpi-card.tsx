import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { AnalyticsKpi } from "@/lib/analytics-data";

type AnalyticsKpiCardProps = {
  kpi: AnalyticsKpi;
};

export function AnalyticsKpiCard({ kpi }: AnalyticsKpiCardProps) {
  const isUp = kpi.trend === "up";

  return (
    <Card className="overflow-hidden border-slate-200/80">
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{kpi.label}</p>
            <p className="mt-3 text-2xl font-bold text-slate-950">{kpi.value}</p>
          </div>
          <span
            className={
              isUp
                ? "inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-1 text-xs font-bold text-[#0B8F47]"
                : "inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-1 text-xs font-bold text-rose-600"
            }
          >
            {isUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            {kpi.change}
          </span>
        </div>
        <p className="mt-4 text-sm text-slate-500">{kpi.helper}</p>
      </CardContent>
    </Card>
  );
}
