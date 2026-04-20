import { CheckCircle2, Crosshair, Cpu } from 'lucide-react';
import { MetricsGrid } from './metrics-grid';

export function AnalysisResult({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* Left: Image / Segmentation preview */}
        <div className="border bg-card flex flex-col">
          <div className="p-4 border-b flex items-center justify-between bg-muted/30">
            <span className="text-sm font-semibold tracking-wide flex items-center gap-2">
              <Crosshair className="h-4 w-4" />
              SEGMENTATION_VIEW
            </span>
            <span className="text-xs font-mono bg-background border px-2 py-1">YOLO26</span>
          </div>
          <div className="relative aspect-video bg-muted/50 flex items-center justify-center overflow-hidden p-6">
            <div className="w-full h-full border-2 border-primary/50 bg-primary/5 relative flex items-center justify-center">
              <span className="font-mono text-primary/50 font-bold text-xl tracking-widest">
                [ ANIMAL_MASK_RENDERED ]
              </span>
              <div className="absolute top-4 left-4 h-2 w-2 bg-primary" />
              <div className="absolute top-4 right-4 h-2 w-2 bg-primary" />
              <div className="absolute bottom-4 left-4 h-2 w-2 bg-primary" />
              <div className="absolute bottom-4 right-4 h-2 w-2 bg-primary" />
            </div>
          </div>
        </div>

        {/* Right: Results / Metrics */}
        <div className="flex flex-col space-y-6">
          <div className="border bg-card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1">Cattle (Holstein)</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                  High Confidence Match
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-primary font-mono">87</span>
                <span className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
                  ATC Score
                </span>
              </div>
            </div>
            <MetricsGrid />
          </div>

          <div className="border bg-card p-6 flex-1">
            <h4 className="text-sm font-semibold mb-4 border-b pb-2">Technical Telemetry</h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inference Model</span>
                <span>AgriNN-Vision-v4.2</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Execution Time</span>
                <span>124ms</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bounding Box Conf</span>
                <span>99.2%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Segmentation Conf</span>
                <span>97.8%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compute Node</span>
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> Edge-TPU-01
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end gap-4 border-t pt-6">
        <button
          onClick={onReset}
          className="px-4 py-2 text-sm font-medium border bg-background hover:bg-muted"
        >
          New Analysis
        </button>
        <button className="px-4 py-2 text-sm font-medium border border-primary bg-primary text-primary-foreground hover:bg-primary/90">
          Save Record
        </button>
      </div>
    </div>
  );
}
