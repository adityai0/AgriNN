'use client';

import { UploadZone } from '@/components/dashboard/upload-zone';
import { AnalysisResult } from '@/components/dashboard/analysis-result';
import { useAnalysis } from '@/hooks/use-analysis';
import { Loader2, AlertCircle } from 'lucide-react';

export default function AnalyzePage() {
  const { analyze, data, error, isPending, reset } = useAnalysis();

  return (
    <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Run Inference</h1>
        <p className="text-muted-foreground text-sm">
          Upload imagery to the AgriNN pipeline for morphological analysis and ATC scoring.
        </p>
      </div>

      <div className="mt-8">
        {!data && !isPending && (
          <>
            {error && (
              <div className="border border-destructive bg-destructive/5 p-4 mb-6 flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-destructive mt-0.5 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-destructive">Inference Failed</p>
                  <p className="text-sm text-muted-foreground mt-1">{error.message}</p>
                </div>
              </div>
            )}
            <UploadZone onAnalyze={analyze} disabled={isPending} />
          </>
        )}

        {isPending && (
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

        {data && <AnalysisResult data={data} onReset={reset} />}
      </div>
    </div>
  );
}
