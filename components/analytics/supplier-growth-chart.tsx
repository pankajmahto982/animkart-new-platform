"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartPoint } from "@/lib/analytics-data";

export function SupplierGrowthChart({ data }: { data: ChartPoint[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-72 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -16, right: 8, top: 10 }}>
          <defs>
            <linearGradient id="supplierGrowth" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#0B8F47" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#0B8F47" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="suppliers" stroke="#0B8F47" strokeWidth={3} fill="url(#supplierGrowth)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
