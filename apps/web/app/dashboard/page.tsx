import { StatCard } from "@/components/dashboard/stat-card";
import { RecentTable } from "@/components/dashboard/recent-table";
import { Activity, Target, ScanLine, Database } from "lucide-react";

export default function DashboardOverview() {
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
          value="14,208" 
          description="+12% this week" 
          icon={Database} 
        />
        <StatCard 
          title="Avg. Confidence" 
          value="97.6%" 
          description="YOLO26 inference" 
          icon={Target} 
        />
        <StatCard 
          title="Cattle Processed" 
          value="9,842" 
          description="69.2% of total" 
          icon={ScanLine} 
        />
        <StatCard 
          title="Buffaloes Processed" 
          value="4,366" 
          description="30.8% of total" 
          icon={Activity} 
        />
      </div>

      <div className="pt-4">
        <RecentTable />
      </div>
    </div>
  );
}
