"use client";

import { useEffect, useState } from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ChartDatum } from "@/lib/role-dashboard-data";

export function DashboardAreaChart({ data }: { data: ChartDatum[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-72 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ left: -16, right: 12, top: 10 }}>
          <defs>
            <linearGradient id="roleArea" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#0B8F47" stopOpacity={0.34} />
              <stop offset="95%" stopColor="#0B8F47" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <Tooltip />
          <Area type="monotone" dataKey="value" stroke="#0B8F47" strokeWidth={3} fill="url(#roleArea)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DashboardBarChart({ data }: { data: ChartDatum[] }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className="h-72 rounded-lg bg-slate-50" />;
  }

  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ left: -16, right: 12, top: 10 }}>
          <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <YAxis tickLine={false} axisLine={false} tick={{ fill: "#64748B", fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="value" fill="#0B8F47" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
