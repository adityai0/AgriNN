import { UploadCloud, Image as ImageIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onAnalyze: () => void;
}

export function UploadZone({ onAnalyze }: UploadZoneProps) {
  return (
    <div className="flex flex-col space-y-6">
      <div className="border-2 border-dashed border-muted-foreground/25 bg-muted/10 hover:bg-muted/30 transition-colors flex flex-col items-center justify-center p-12 text-center cursor-pointer min-h-[400px]">
        <div className="h-16 w-16 bg-background border flex items-center justify-center mb-6">
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Upload Livestock Imagery</h3>
        <p className="text-muted-foreground text-sm max-w-[300px] mb-8">
          Drag and drop an image or video file here, or click to browse. Supports JPG, PNG, MP4.
        </p>
        <Button variant="outline" className="font-medium bg-background">
          Select File
        </Button>
      </div>

      <div className="flex items-center justify-between border bg-card p-4">
        <div className="flex items-center gap-3">
          <ImageIcon className="h-5 w-5 text-muted-foreground" />
          <span className="text-sm font-medium">No file selected</span>
        </div>
        <Button
          onClick={onAnalyze}
          disabled
          className="font-medium bg-primary/50 text-primary-foreground/50"
        >
          Run Inference
        </Button>
      </div>

      {/* Mock state for demonstration: pretend a file was selected immediately to let user proceed */}
      <div className="flex items-center justify-between border bg-card p-4 border-primary">
        <div className="flex items-center gap-3">
          <div className="h-10 w-16 bg-muted border flex items-center justify-center overflow-hidden">
            <ImageIcon className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">cattle_sample_04.jpg</span>
            <span className="text-xs text-muted-foreground font-mono">2.4 MB</span>
          </div>
        </div>
        <Button onClick={onAnalyze} className="font-medium">
          Run Inference
        </Button>
      </div>
    </div>
  );
}
