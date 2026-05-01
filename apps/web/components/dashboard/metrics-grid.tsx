import { Ruler, Maximize, Ratio, Scan, BarChart3 } from 'lucide-react';
import type { Metrics, Traits } from '@/lib/types';

interface MetricsGridProps {
  metrics: Metrics;
  traits?: Traits;
}

export function MetricsGrid({ metrics, traits }: MetricsGridProps) {
  if (traits) {
    const traitItems = [
      { label: 'Stature', value: traits.stature },
      { label: 'Body Length', value: traits.body_length },
      { label: 'Chest Width', value: traits.chest_width },
      { label: 'Body Depth', value: traits.body_depth },
      { label: 'Rump Width', value: traits.rump_width },
      { label: 'Rump Angle', value: traits.rump_angle },
      { label: 'Angularity', value: traits.angularity },
      { label: 'Dairy Strength', value: traits.dairy_strength },
    ];

    return (
      <div className="space-y-4">
        <h4 className="text-sm font-semibold border-b pb-2">Linear Trait Evaluation (1-9)</h4>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {traitItems.map((item) => (
            <div key={item.label} className="border bg-background p-3 flex flex-col justify-between h-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground mb-2">
                {item.label}
              </span>
              <div className="flex items-end justify-between">
                <span className="text-2xl font-black font-mono leading-none">{item.value}</span>
                <span className="text-[10px] text-muted-foreground font-mono mb-0.5">/ 9</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Fallback for older records
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
