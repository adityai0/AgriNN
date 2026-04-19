import { Ruler, Maximize, GitCommit, FileDiff } from "lucide-react";

export function MetricsGrid() {
  const metrics = [
    { label: "Body Width", value: "245 cm", icon: Ruler },
    { label: "Body Height", value: "142 cm", icon: Maximize },
    { label: "Contour Area", value: "3.2 m²", icon: FileDiff },
    { label: "Anchor Points", value: "18 mapped", icon: GitCommit },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {metrics.map((metric, index) => (
        <div key={index} className="border bg-background p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <metric.icon className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">{metric.label}</span>
          </div>
          <span className="text-xl font-bold font-mono">{metric.value}</span>
        </div>
      ))}
    </div>
  );
}
