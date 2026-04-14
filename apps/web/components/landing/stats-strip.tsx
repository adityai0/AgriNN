import { Cpu, Zap, Activity, Database } from "lucide-react";

export function StatsStrip() {
  const stats = [
    { label: "AI-Powered Analysis", icon: Cpu },
    { label: "Real-Time Inference", icon: Zap },
    { label: "Automated ATC Scoring", icon: Activity },
    { label: "Computer Vision Pipeline", icon: Database },
  ];

  return (
    <div className="w-full border-b bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left divide-x-0 md:divide-x border-0">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col md:flex-row items-center justify-center gap-3 px-4">
              <stat.icon className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm font-medium tracking-wide">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
