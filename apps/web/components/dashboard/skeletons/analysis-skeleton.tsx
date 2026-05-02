import { Skeleton } from "@/components/ui/skeleton";

export function AnalysisSkeleton() {
  return (
    <div className="p-6 md:p-10 space-y-8 max-w-6xl mx-auto">
      <div className="flex flex-col space-y-4 border-b pb-8">
        <Skeleton className="h-10 w-[300px]" />
        <Skeleton className="h-5 w-[150px]" />
        <div className="flex gap-4 pt-4">
          <Skeleton className="h-8 w-[100px]" />
          <Skeleton className="h-8 w-[120px]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
        <div className="space-y-4">
          <Skeleton className="h-[400px] w-full" />
        </div>
      </div>

      <div className="space-y-6 pt-8">
        <Skeleton className="h-8 w-[200px]" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="border p-4 space-y-4">
              <Skeleton className="h-4 w-[100px]" />
              <Skeleton className="h-8 w-[60px]" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
