'use client';

import { StatCard } from '@/components/dashboard/stat-card';
import { RecentTable } from '@/components/dashboard/recent-table';
import { Activity, Target, ScanLine, Database } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard';

export default function DashboardOverview() {
  const { stats, loading, error } = useDashboardStats();

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">System Overview</h1>
        <p className="text-muted-foreground text-sm">
          High-level telemetry for the AgriNN ATC inference engine.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Analyses"
          value={loading ? "..." : (stats?.total_analyses.toLocaleString() || "0")}
          description={error ? "Failed to load" : "Processed via API"}
          icon={Database}
        />
        <StatCard
          title="Avg. Confidence"
          value={loading ? "..." : `${((stats?.average_confidence || 0) * 100).toFixed(1)}%`}
          description={error ? "Failed to load" : "MobileNetv2 + YOLO26 inference"}
          icon={Target}
        />
        <StatCard
          title="Cattle Processed"
          value={loading ? "..." : (stats?.cattle_processed.toLocaleString() || "0")}
          description={error ? "Failed to load" : "Cattle subset"}
          icon={ScanLine}
        />
        <StatCard
          title="Buffaloes Processed"
          value={loading ? "..." : (stats?.buffalo_processed.toLocaleString() || "0")}
          description={error ? "Failed to load" : "Buffalo subset"}
          icon={Activity}
        />
      </div>

      <div className="pt-4">
        <RecentTable />
      </div>
    </div>
  );
}
