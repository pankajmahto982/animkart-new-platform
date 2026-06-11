import { CalendarDays } from "lucide-react";

export function DateRangeFilter() {
  return (
    <div className="flex h-10 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700">
      <CalendarDays className="text-[#0B8F47]" size={17} />
      Last 30 days
    </div>
  );
}
