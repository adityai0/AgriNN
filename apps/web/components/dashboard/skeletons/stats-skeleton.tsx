import { Skeleton } from "@/components/ui/skeleton";

export function StatsSkeleton() {
  return (
    <div className="border bg-card p-6 flex flex-col space-y-4">
      <div className="flex items-center justify-between">
        <Skeleton className="h-4 w-[120px]" />
        <Skeleton className="h-4 w-4 rounded-full" />
      </div>
      <div className="space-y-2">
        <Skeleton className="h-8 w-[80px]" />
        <Skeleton className="h-3 w-[140px]" />
      </div>
    </div>
  );
}
