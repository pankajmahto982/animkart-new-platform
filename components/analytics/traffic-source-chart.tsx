"use client";

import { useEffect, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { TrafficSource } from "@/lib/analytics-data";

export function TrafficSourceChart({ data }: { data: TrafficSource[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-72 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_180px] lg:items-center">
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={data} dataKey="visitors" nameKey="source" innerRadius={58} outerRadius={92} paddingAngle={4}>
              {data.map((entry) => (
                <Cell fill={entry.fill} key={entry.source} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => [Number(value).toLocaleString("en-IN"), "Products"]} />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid gap-3">
        {data.map((entry) => (
          <div className="flex items-center justify-between gap-3 text-sm" key={entry.source}>
            <span className="flex items-center gap-2 text-slate-600">
              <span className="size-2.5 rounded-full" style={{ backgroundColor: entry.fill }} />
              {entry.source}
            </span>
            <span className="font-semibold text-slate-950">{entry.visitors.toLocaleString("en-IN")}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
