import { Ruler, Maximize, Ratio, Scan } from 'lucide-react';
import type { Metrics } from '@/lib/types';

interface MetricsGridProps {
  metrics: Metrics;
}

export function MetricsGrid({ metrics }: MetricsGridProps) {
  const items = [
    { label: 'Body Width', value: metrics.body_width.toFixed(1), icon: Ruler },
    { label: 'Body Height', value: metrics.body_height.toFixed(1), icon: Maximize },
    { label: 'Body Ratio', value: metrics.body_ratio.toFixed(3), icon: Ratio },
    { label: 'Contour Area', value: metrics.contour_area.toFixed(1), icon: Scan },
  ];

  return (
    <div className="grid grid-cols-2 gap-4">
      {items.map((item) => (
        <div key={item.label} className="border bg-background p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-muted-foreground">
            <item.icon className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wider">{item.label}</span>
          </div>
          <span className="text-xl font-bold font-mono">{item.value}</span>
        </div>
      ))}
    </div>
  );
}
