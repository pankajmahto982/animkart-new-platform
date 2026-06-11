import { ArrowRight, Flame } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PendingAction } from "@/lib/control-room-data";

const priorityClass = {
  high: "bg-rose-50 text-rose-700",
  medium: "bg-amber-50 text-amber-700",
  low: "bg-emerald-50 text-[#0B8F47]"
};

export function PendingActionsPanel({ actions }: { actions: PendingAction[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {actions.map((action) => (
        <div className="rounded-xl border border-slate-200 bg-white p-4" key={action.title}>
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-semibold text-slate-950">{action.title}</p>
              <p className="mt-1 text-sm text-slate-500">{action.action}</p>
            </div>
            <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-bold ${priorityClass[action.priority]}`}>
              <Flame size={13} />
              {action.count}
            </span>
          </div>
          <Button className="mt-4 h-9 w-full" variant="outline">
            Open queue
            <ArrowRight size={15} />
          </Button>
        </div>
      ))}
    </div>
  );
}
