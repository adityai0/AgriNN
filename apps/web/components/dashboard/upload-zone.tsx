'use client';

import { useRef, useState, type DragEvent, type ChangeEvent } from 'react';
import { UploadCloud, Image as ImageIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface UploadZoneProps {
  onAnalyze: (file: File) => void;
  disabled?: boolean;
}

export function UploadZone({ onAnalyze, disabled }: UploadZoneProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const dropped = e.dataTransfer.files[0];
    if (dropped) handleFile(dropped);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected) handleFile(selected);
  };

  const handleClear = () => {
    setFile(null);
    if (preview) URL.revokeObjectURL(preview);
    setPreview(null);
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="flex flex-col space-y-6">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="hidden"
        onChange={handleChange}
      />

      <div
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        className={`border-2 border-dashed bg-muted/10 hover:bg-muted/30 transition-colors flex flex-col items-center justify-center p-12 text-center cursor-pointer min-h-[400px] ${isDragOver ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}`}
      >
        <div className="h-16 w-16 bg-background border flex items-center justify-center mb-6">
          <UploadCloud className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-xl font-semibold mb-2">Upload Livestock Imagery</h3>
        <p className="text-muted-foreground text-sm max-w-[300px] mb-8">
          Drag and drop an image file here, or click to browse. Supports JPG, PNG, WebP.
        </p>
        <Button variant="outline" className="font-medium bg-background">
          Select File
        </Button>
      </div>

      <div
        className={`flex items-center justify-between border bg-card p-4 ${file ? 'border-primary' : ''}`}
      >
        <div className="flex items-center gap-3">
          {preview ? (
            <div className="h-10 w-16 bg-muted border flex items-center justify-center overflow-hidden">
              <img src={preview} alt="preview" className="h-full w-full object-cover" />
            </div>
          ) : (
            <ImageIcon className="h-5 w-5 text-muted-foreground" />
          )}
          <div className="flex flex-col">
            <span className="text-sm font-medium">{file ? file.name : 'No file selected'}</span>
            {file && (
              <span className="text-xs text-muted-foreground font-mono">
                {(file.size / (1024 * 1024)).toFixed(1)} MB
              </span>
            )}
          </div>
          {file && (
            <button onClick={handleClear} className="ml-2 text-muted-foreground hover:text-foreground">
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        <Button
          onClick={() => file && onAnalyze(file)}
          disabled={!file || disabled}
          className="font-medium"
        >
          Run Inference
        </Button>
      </div>
    </div>
  );
}
