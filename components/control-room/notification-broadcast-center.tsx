import { Mail, MessageCircle, Send, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BroadcastAction } from "@/lib/control-room-data";

const icons = [MessageCircle, Mail, Smartphone, Send];

export function NotificationBroadcastCenter({ actions }: { actions: BroadcastAction[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {actions.map((action, index) => {
        const Icon = icons[index] ?? Send;

        return (
          <div className="rounded-xl border border-slate-200 bg-white p-4" key={action.label}>
            <Icon className="text-[#0B8F47]" size={22} />
            <p className="mt-3 font-semibold text-slate-950">{action.label}</p>
            <p className="mt-1 text-sm text-slate-500">{action.audience}</p>
            <Button className="mt-4 h-9 w-full" variant="outline">
              Target {action.count}
            </Button>
          </div>
        );
      })}
    </div>
  );
}
