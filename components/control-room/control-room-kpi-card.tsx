import { AlertTriangle, CheckCircle2, Radio } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { ControlRoomKpi } from "@/lib/control-room-data";

const statusClass = {
  healthy: "bg-emerald-50 text-[#0B8F47]",
  watch: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export function ControlRoomKpiCard({ kpi }: { kpi: ControlRoomKpi }) {
  const Icon = kpi.status === "healthy" ? CheckCircle2 : kpi.status === "critical" ? AlertTriangle : Radio;

  return (
    <Card className="border-slate-200/80">
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wide text-slate-500">{kpi.label}</p>
            <p className="mt-2 text-2xl font-bold text-slate-950">{kpi.value}</p>
          </div>
          <span className={`grid size-9 place-items-center rounded-lg ${statusClass[kpi.status]}`}>
            <Icon size={17} />
          </span>
        </div>
        <p className="mt-3 text-xs leading-5 text-slate-500">{kpi.helper}</p>
      </CardContent>
    </Card>
  );
}
