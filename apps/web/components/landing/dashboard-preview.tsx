import { BarChart, Activity, Image as ImageIcon, Crosshair } from "lucide-react";

export function DashboardPreview() {
  return (
    <section id="preview" className="w-full py-24 bg-muted/30 border-y">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col lg:flex-row gap-12 items-center">
          
          <div className="flex-1 space-y-8 w-full">
            <div className="space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Live Evaluation Dashboard</h2>
              <p className="text-muted-foreground md:text-lg leading-relaxed max-w-[600px]">
                Monitor real-time inference telemetry. Our command center provides detailed transparency into the segmentation masks, confidence thresholds, and derived morphometric datasets.
              </p>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="border bg-background p-5 flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Detection Confidence</span>
                <span className="text-3xl font-bold">98.4%</span>
              </div>
              <div className="border bg-background p-5 flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Inference Time</span>
                <span className="text-3xl font-bold">124ms</span>
              </div>
              <div className="border bg-background p-5 flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Structural Traits</span>
                <span className="text-3xl font-bold">14<span className="text-base font-normal text-muted-foreground ml-2">Extracted</span></span>
              </div>
              <div className="border bg-background p-5 flex flex-col gap-2">
                <span className="text-sm font-medium text-muted-foreground">Final ATC Score</span>
                <span className="text-3xl font-bold text-primary">87<span className="text-base font-normal text-muted-foreground ml-2">/ 100</span></span>
              </div>
            </div>
          </div>

          <div className="flex-1 w-full max-w-2xl">
            <div className="border bg-background p-4 shadow-sm">
              <div className="border-b pb-4 mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity className="h-4 w-4" />
                  <span className="text-sm font-semibold tracking-wide">INFERENCE_NODE_ACTIVE</span>
                </div>
                <div className="flex gap-2">
                  <span className="h-3 w-3 bg-primary" />
                  <span className="h-3 w-3 bg-muted" />
                  <span className="h-3 w-3 bg-muted" />
                </div>
              </div>
              
              <div className="aspect-video bg-muted border relative flex items-center justify-center overflow-hidden group">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <ImageIcon className="h-16 w-16" />
                </div>
                <div className="absolute inset-8 border border-primary/50 flex flex-col justify-between p-2 bg-primary/5">
                   <div className="flex justify-between w-full">
                     <Crosshair className="h-4 w-4 text-primary" />
                     <Crosshair className="h-4 w-4 text-primary" />
                   </div>
                   <div className="text-center font-mono text-xs text-primary bg-background/90 px-3 py-1.5 mx-auto border border-primary/20">
                     YOLO_BBOX_DETECTED
                   </div>
                   <div className="flex justify-between w-full">
                     <Crosshair className="h-4 w-4 text-primary" />
                     <Crosshair className="h-4 w-4 text-primary" />
                   </div>
                </div>
                <div className="absolute bottom-4 left-4 border bg-background px-3 py-2 flex items-center gap-2">
                  <BarChart className="h-4 w-4 text-primary" />
                  <span className="text-xs font-bold font-mono tracking-wider">MORPH_ANALYSIS_OK</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
