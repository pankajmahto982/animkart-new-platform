"use client";

import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { HealthMetric } from "@/lib/control-room-data";

export function MarketplaceHealthScore({
  score,
  metrics
}: {
  score: number;
  metrics: HealthMetric[];
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <Card id="health">
      <CardHeader>
        <CardTitle>Marketplace Health Score</CardTitle>
        <CardDescription>Supabase-ready platform score across supplier, inventory, shipping, order and vet operations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 xl:grid-cols-[220px_1fr] xl:items-center">
          <div className="rounded-2xl bg-slate-950 p-6 text-white">
            <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">Overall Score</p>
            <p className="mt-4 text-6xl font-black">{score}</p>
            <p className="mt-2 text-sm text-slate-300">Real catalog + pending event readiness</p>
          </div>
          <div>
            {mounted ? (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={metrics} layout="vertical" margin={{ left: 18, right: 16 }}>
                    <CartesianGrid stroke="#E2E8F0" strokeDasharray="4 4" horizontal={false} />
                    <XAxis type="number" domain={[0, 100]} tickLine={false} axisLine={false} />
                    <YAxis dataKey="label" type="category" width={124} tickLine={false} axisLine={false} tick={{ fontSize: 12 }} />
                    <Tooltip />
                    <Bar dataKey="score" fill="#0B8F47" radius={[0, 8, 8, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ) : (
              <div className="h-64 rounded-lg bg-slate-50" />
            )}
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {metrics.map((metric) => (
                <div className="rounded-lg bg-slate-50 p-3" key={metric.label}>
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-slate-900">{metric.label}</p>
                    <span className="text-sm font-bold text-[#0B8F47]">{metric.score}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">{metric.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
