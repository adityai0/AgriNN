"use client";

import { useState } from "react";
import { UploadZone } from "@/components/dashboard/upload-zone";
import { AnalysisResult } from "@/components/dashboard/analysis-result";
import { Loader2 } from "lucide-react";

export default function AnalyzePage() {
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");

  const handleAnalyze = () => {
    setStatus("analyzing");
    // Simulate AI inference delay
    setTimeout(() => {
      setStatus("complete");
    }, 2000);
  };

  const handleReset = () => {
    setStatus("idle");
  };

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Run Inference</h1>
        <p className="text-muted-foreground text-sm">
          Upload imagery to the AgriNN pipeline for morphological analysis and ATC scoring.
        </p>
      </div>

      <div className="mt-8">
        {status === "idle" && (
          <UploadZone onAnalyze={handleAnalyze} />
        )}

        {status === "analyzing" && (
          <div className="border bg-card p-24 flex flex-col items-center justify-center space-y-6 text-center">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
            <div className="space-y-2">
              <h3 className="text-xl font-semibold">Processing Visual Data...</h3>
              <p className="text-muted-foreground font-mono text-sm max-w-[300px]">
                Initializing YOLO26 node. Extracting bounding boxes and segmenting background.
              </p>
            </div>
          </div>
        )}

        {status === "complete" && (
          <AnalysisResult onReset={handleReset} />
        )}
      </div>
    </div>
  );
}
