import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function TableSkeleton() {
  return (
    <div className="border bg-card">
      <div className="p-6 border-b flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Recent Analyses</h3>
          <p className="text-sm text-muted-foreground mt-1">Latest inferences from the AI pipeline.</p>
        </div>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[100px]">Preview</TableHead>
            <TableHead>Animal Type</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>ATC Score</TableHead>
            <TableHead>Grade</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {[...Array(5)].map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-12 w-16" />
              </TableCell>
              <TableCell>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-[100px]" />
                  <Skeleton className="h-3 w-[80px]" />
                </div>
              </TableCell>
              <TableCell>
                <div className="flex flex-col space-y-2">
                  <Skeleton className="h-4 w-[60px]" />
                  <Skeleton className="h-3 w-[90px]" />
                </div>
              </TableCell>
              <TableCell>
                <Skeleton className="h-6 w-[50px]" />
              </TableCell>
              <TableCell>
                <Skeleton className="h-5 w-[80px]" />
              </TableCell>
              <TableCell className="text-right">
                <Skeleton className="h-4 w-[140px] ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
