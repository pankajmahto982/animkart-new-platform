import { AlertTriangle, CheckCircle2, Clock, Radio } from "lucide-react";
import { ActivityEvent } from "@/lib/control-room-data";

const severityClass = {
  success: "bg-emerald-50 text-[#0B8F47]",
  info: "bg-sky-50 text-sky-700",
  warning: "bg-amber-50 text-amber-700",
  critical: "bg-rose-50 text-rose-700"
};

export function RealTimeActivityFeed({ activities }: { activities: ActivityEvent[] }) {
  return (
    <div className="grid gap-3">
      {activities.map((activity) => {
        const Icon = activity.severity === "success" ? CheckCircle2 : activity.severity === "critical" ? AlertTriangle : Radio;

        return (
          <div className="flex gap-3 rounded-lg border border-slate-100 bg-white p-3" key={activity.id}>
            <span className={`grid size-9 shrink-0 place-items-center rounded-full ${severityClass[activity.severity]}`}>
              <Icon size={16} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-slate-950">{activity.title}</p>
              <p className="mt-1 truncate text-sm text-slate-500">{activity.detail}</p>
            </div>
            <span className="flex shrink-0 items-center gap-1 text-xs text-slate-400">
              <Clock size={13} />
              {activity.time}
            </span>
          </div>
        );
      })}
    </div>
  );
}
