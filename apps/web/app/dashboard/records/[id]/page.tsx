'use client';

import { use } from 'react';
import { useRecord } from '@/hooks/use-records';
import { AnalysisSkeleton } from '@/components/dashboard/skeletons/analysis-skeleton';
import { AlertCircle, ArrowLeft, CheckCircle2, ChevronRight, Ruler, Scan, Target, Brain } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function RecordDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: record, isLoading, error } = useRecord(id);

  if (isLoading) {
    return <AnalysisSkeleton />;
  }

  if (error || !record) {
    return (
      <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-6">
        <Link href="/dashboard" className="text-sm text-muted-foreground flex items-center gap-2 hover:text-primary transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Dashboard
        </Link>
        <div className="border border-destructive bg-destructive/5 p-6 flex flex-col items-center justify-center space-y-4 text-center h-[400px]">
          <AlertCircle className="h-10 w-10 text-destructive" />
          <div>
            <h3 className="text-lg font-semibold text-destructive">Record Not Found</h3>
            <p className="text-sm text-muted-foreground mt-1">
              {error?.message || "The analysis record you are looking for does not exist."}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-10 space-y-12 max-w-7xl mx-auto">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard" className="hover:text-primary transition-colors">Dashboard</Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/dashboard" className="hover:text-primary transition-colors">Records</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground font-mono">{record.id.split('-')[0]}</span>
      </div>

      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 border-b pb-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <h1 className="text-4xl font-bold tracking-tight capitalize">
              {record.animal_type}
            </h1>
            {record.breed && record.breed !== 'Unknown' && (
              <span className="text-2xl text-muted-foreground font-medium">/ {record.breed}</span>
            )}
          </div>
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="font-mono text-xs px-3 py-1">
              <Target className="h-3 w-3 mr-2" />
              {Math.round(record.confidence * 100)}% Confidence
            </Badge>
            <span className="text-sm text-muted-foreground font-mono">
              {new Date(record.created_at || '').toLocaleString()}
            </span>
          </div>
        </div>
        
        <div className="flex flex-col items-end border bg-card p-4 min-w-[200px]">
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-1">
            ATC Score
          </span>
          <div className="flex items-baseline gap-3">
            <span className="text-5xl font-black font-mono leading-none tracking-tighter text-primary">
              {record.composite_score !== undefined ? record.composite_score : record.score}
            </span>
            {record.grade && (
              <Badge variant={record.grade === 'Excellent' || record.grade === 'Very Good' ? 'default' : 'secondary'} className="uppercase tracking-wider font-bold">
                {record.grade}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Imagery & Technicals */}
        <div className="lg:col-span-5 space-y-8">
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Scan className="h-4 w-4" /> Processed Visual
            </h3>
            <div className="border bg-muted aspect-square flex items-center justify-center overflow-hidden relative group">
              {record.processed_image_url || record.original_image_url ? (
                <img 
                  src={record.processed_image_url || record.original_image_url!} 
                  alt="Processed Segmentation" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <span className="text-muted-foreground font-mono text-sm">Image Unavailable</span>
              )}
            </div>
          </div>

          <div className="border p-6 bg-card space-y-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2 border-b pb-3">
              <Brain className="h-4 w-4" /> AI Telemetry
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Detection Confidence</span>
                <span className="text-sm font-mono font-bold">{Math.round(record.confidence * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Breed Confidence</span>
                <span className="text-sm font-mono font-bold">{Math.round((record.breed_confidence || 0) * 100)}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Primary Pipeline</span>
                <span className="text-xs font-mono text-muted-foreground">YOLO26 + MobileNetV2</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Record ID</span>
                <span className="text-xs font-mono text-muted-foreground truncate max-w-[120px]">{record.id}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Morphology & Insights */}
        <div className="lg:col-span-7 space-y-8">
          
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
              <Ruler className="h-4 w-4" /> Morphology Trait Evaluation
            </h3>
            
            {record.traits ? (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Stature', value: record.traits.stature },
                  { label: 'Body Length', value: record.traits.body_length },
                  { label: 'Chest Width', value: record.traits.chest_width },
                  { label: 'Body Depth', value: record.traits.body_depth },
                  { label: 'Rump Width', value: record.traits.rump_width },
                  { label: 'Rump Angle', value: record.traits.rump_angle },
                  { label: 'Angularity', value: record.traits.angularity },
                  { label: 'Dairy Strength', value: record.traits.dairy_strength },
                ].map((item) => (
                  <div key={item.label} className="border bg-card p-4 flex flex-col justify-between h-[100px]">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                      {item.label}
                    </span>
                    <div className="flex items-end justify-between">
                      <span className="text-3xl font-black font-mono leading-none">{item.value}</span>
                      <span className="text-xs text-muted-foreground font-mono mb-1">/ 9</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed p-12 flex items-center justify-center">
                <p className="text-sm text-muted-foreground font-mono">No linear traits extracted.</p>
              </div>
            )}
          </div>

          <div className="border bg-card p-6 space-y-4">
            <h3 className="text-lg font-bold">AI Advisory Insights</h3>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Based on the linear trait evaluation, this {record.breed} {record.animal_type} exhibits a 
              <span className="font-semibold text-foreground"> {record.grade?.toLowerCase() || 'standard'} </span> 
              phenotype. The composite score of <span className="font-mono font-bold text-foreground">{record.composite_score}</span> suggests 
              {record.composite_score && record.composite_score >= 85 ? ' high structural efficiency suitable for premier genetic selection.' : ' standard morphological development.'} 
              <br/><br/>
              Consistent observation of these traits ensures accurate automated type classification and long-term herd productivity tracking.
            </p>
          </div>
          
        </div>
      </div>
    </div>
  );
}
