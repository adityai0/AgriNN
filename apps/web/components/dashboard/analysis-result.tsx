import { CheckCircle2, AlertCircle, Crosshair, Cpu } from 'lucide-react';
import { MetricsGrid } from './metrics-grid';
import type { ClassificationResponse } from '@/lib/types';

interface AnalysisResultProps {
  data: ClassificationResponse;
  onReset: () => void;
}

export function AnalysisResult({ data, onReset }: AnalysisResultProps) {
  const isError = !data.success;

  return (
    <div className="flex flex-col space-y-6">
      {isError && (
        <div className="border border-destructive bg-destructive/5 p-6 flex items-start gap-4">
          <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
          <div>
            <h3 className="text-sm font-semibold text-destructive">Analysis Failed</h3>
            <p className="text-sm text-muted-foreground mt-1">{data.error || 'Unknown error'}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
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
              {data.processed_image_url ? (
                <img src={data.processed_image_url} alt="Processed segmentation" className="w-full h-full object-cover" />
              ) : (
                <span className="font-mono text-primary/50 font-bold text-xl tracking-widest">
                  [ PROCESSING FAILED ]
                </span>
              )}
              <div className="absolute top-4 left-4 h-2 w-2 bg-primary" />
              <div className="absolute top-4 right-4 h-2 w-2 bg-primary" />
              <div className="absolute bottom-4 left-4 h-2 w-2 bg-primary" />
              <div className="absolute bottom-4 right-4 h-2 w-2 bg-primary" />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="border bg-card p-6">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold mb-1 capitalize">{data.animal_type}</h3>
                <p className="text-sm text-muted-foreground flex items-center gap-2">
                  {data.confidence >= 0.8 ? (
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-muted-foreground" />
                  )}
                  {data.confidence >= 0.8 ? 'High Confidence Match' : 'Low Confidence Match'}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-3xl font-bold text-primary font-mono">{data.score}</span>
                <span className="text-xs text-muted-foreground font-semibold tracking-wider uppercase">
                  ATC Score
                </span>
              </div>
            </div>
            <MetricsGrid metrics={data.metrics} />
          </div>

          <div className="border bg-card p-6 flex-1">
            <h4 className="text-sm font-semibold mb-4 border-b pb-2">Technical Telemetry</h4>
            <div className="space-y-3 font-mono text-xs">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Inference Model</span>
                <span>YOLO26-seg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Confidence</span>
                <span>{(data.confidence * 100).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Animal Type</span>
                <span className="capitalize">{data.animal_type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Compute</span>
                <span className="flex items-center gap-1">
                  <Cpu className="h-3 w-3" /> Local
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
      </div>
    </div>
  );
}
