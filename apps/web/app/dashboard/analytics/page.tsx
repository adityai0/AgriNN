'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';

const data = [
  { name: 'Mon', cattle: 400, buffalo: 240 },
  { name: 'Tue', cattle: 300, buffalo: 139 },
  { name: 'Wed', cattle: 200, buffalo: 980 },
  { name: 'Thu', cattle: 278, buffalo: 390 },
  { name: 'Fri', cattle: 189, buffalo: 480 },
  { name: 'Sat', cattle: 239, buffalo: 380 },
  { name: 'Sun', cattle: 349, buffalo: 430 },
];

export default function AnalyticsPage() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Throughput and morphological trait distribution across the inference pipeline.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="border bg-card p-6 flex flex-col space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">Weekly Inference Volume</h3>
            <p className="text-sm text-muted-foreground">Analyses performed per day by species.</p>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12 }}
                  dy={10}
                />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} dx={-10} />
                <Tooltip
                  cursor={{ fill: '#f3f4f6' }}
                  contentStyle={{ borderRadius: 0, border: '1px solid #e5e7eb', boxShadow: 'none' }}
                />
                <Bar dataKey="cattle" fill="#0f172a" radius={[2, 2, 0, 0]} />
                <Bar dataKey="buffalo" fill="#64748b" radius={[2, 2, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="border bg-card p-6 flex flex-col space-y-6">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">ATC Score Distribution</h3>
            <p className="text-sm text-muted-foreground">
              Aggregated scoring metrics over the last 30 days.
            </p>
          </div>
          <div className="flex-1 flex items-center justify-center text-muted-foreground font-mono text-sm border-2 border-dashed">
            [ DISTRIBUTION_CHART_PLACEHOLDER ]
          </div>
        </div>
      </div>
    </div>
  );
}
