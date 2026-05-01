'use client';

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from 'recharts';
import { useDashboardAnalytics } from '@/hooks/use-dashboard';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AnalyticsPage() {
  const { analytics, loading, error } = useDashboardAnalytics();

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">System Analytics</h1>
        <p className="text-muted-foreground text-sm">
          Throughput and morphological trait distribution across the inference pipeline.
        </p>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center p-24 space-y-4">
          <Loader2 className="h-8 w-8 text-primary animate-spin" />
          <p className="text-sm text-muted-foreground font-mono">Loading telemetry...</p>
        </div>
      ) : error ? (
        <div className="border border-destructive bg-destructive/5 p-6 flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5" />
          <div>
            <h3 className="text-sm font-semibold text-destructive">Failed to load analytics</h3>
            <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="border bg-card p-6 flex flex-col space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">Weekly Inference Volume</h3>
              <p className="text-sm text-muted-foreground">Analyses performed per day by species (Last 7 Days).</p>
            </div>
            <div className="h-[300px] w-full">
              {analytics?.weekly_volume && analytics.weekly_volume.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.weekly_volume}>
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
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-sm border-2 border-dashed">
                  No volume data available.
                </div>
              )}
            </div>
          </div>

          <div className="border bg-card p-6 flex flex-col space-y-6">
            <div className="space-y-1">
              <h3 className="text-lg font-semibold">ATC Grade Distribution</h3>
              <p className="text-sm text-muted-foreground">
                Aggregated grading distribution over the lifetime of the system.
              </p>
            </div>
            <div className="h-[300px] w-full">
              {analytics?.atc_distribution && analytics.atc_distribution.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analytics.atc_distribution}>
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
                    <Bar dataKey="count" fill="#3b82f6" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex items-center justify-center h-full text-muted-foreground font-mono text-sm border-2 border-dashed">
                  No scoring data available.
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
