import { Skeleton } from "@/components/ui/skeleton";

export function ChartSkeleton() {
  return (
    <div className="border bg-card p-6 flex flex-col space-y-6 w-full h-[450px]">
      <div className="space-y-2">
        <Skeleton className="h-6 w-[200px]" />
        <Skeleton className="h-4 w-[300px]" />
      </div>
      <div className="flex-1 flex items-end justify-between gap-4 mt-8 pb-4">
        {[...Array(7)].map((_, i) => (
          <Skeleton key={i} className="w-full" style={{ height: `${Math.max(20, Math.random() * 100)}%` }} />
        ))}
      </div>
    </div>
  );
}
