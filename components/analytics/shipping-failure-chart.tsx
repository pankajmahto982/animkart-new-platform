"use client";

import { useEffect, useState } from "react";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartPoint } from "@/lib/analytics-data";

export function ShippingFailureChart({ data }: { data: ChartPoint[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-72 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ left: -18, right: 8, top: 10 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="period" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <Tooltip formatter={(value) => [Number(value).toLocaleString("en-IN"), "Catalog issues"]} />
          <Line type="monotone" dataKey="failures" stroke="#DC2626" strokeWidth={3} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
