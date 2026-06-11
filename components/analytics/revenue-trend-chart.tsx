"use client";

import { useEffect, useState } from "react";
import { Area, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartPoint } from "@/lib/analytics-data";

export function RevenueTrendChart({ data }: { data: ChartPoint[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-80 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -18, right: 10, top: 10 }}>
          <defs>
            <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#0B8F47" stopOpacity={0.18} />
              <stop offset="95%" stopColor="#0B8F47" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <Tooltip formatter={(value) => [`Rs ${value} L`, ""]} />
          <Area type="monotone" dataKey="revenue" stroke="none" fill="url(#revenueFill)" />
          <Line type="monotone" dataKey="revenue" stroke="#0B8F47" strokeWidth={3} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="gmv" stroke="#0F766E" strokeWidth={2} strokeDasharray="6 5" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
