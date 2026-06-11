"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CategoryPerformance } from "@/lib/analytics-data";

export function CategoryPerformanceChart({ data }: { data: CategoryPerformance[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-80 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 18, right: 12, top: 10 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" horizontal={false} />
          <XAxis type="number" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis dataKey="category" type="category" tickLine={false} axisLine={false} tick={{ fill: "#334155", fontSize: 12 }} width={96} />
          <Tooltip formatter={(value) => [`Rs ${value} L`, "Revenue"]} />
          <Bar dataKey="revenue" fill="#0B8F47" radius={[0, 8, 8, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
