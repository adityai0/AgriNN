import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Image as ImageIcon } from "lucide-react";

export function RecentTable() {
  const records = [
    { id: "REC-001", type: "Cattle (Holstein)", confidence: 98.2, score: 87, date: "2026-05-21 14:22" },
    { id: "REC-002", type: "Buffalo (Murrah)", confidence: 96.5, score: 92, date: "2026-05-21 13:45" },
    { id: "REC-003", type: "Cattle (Jersey)", confidence: 99.1, score: 84, date: "2026-05-21 12:10" },
    { id: "REC-004", type: "Cattle (Angus)", confidence: 94.8, score: 78, date: "2026-05-21 09:30" },
    { id: "REC-005", type: "Buffalo (Nili-Ravi)", confidence: 97.4, score: 89, date: "2026-05-20 18:15" },
  ];

  return (
    <div className="border bg-card">
      <div className="p-6 border-b">
        <h3 className="text-lg font-semibold">Recent Analyses</h3>
        <p className="text-sm text-muted-foreground">Latest livestock evaluation records.</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50 hover:bg-muted/50">
            <TableHead className="w-[100px]">Preview</TableHead>
            <TableHead>Animal Type</TableHead>
            <TableHead>Confidence</TableHead>
            <TableHead>ATC Score</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {records.map((record) => (
            <TableRow key={record.id}>
              <TableCell>
                <div className="h-10 w-16 bg-muted border flex items-center justify-center">
                  <ImageIcon className="h-4 w-4 text-muted-foreground" />
                </div>
              </TableCell>
              <TableCell className="font-medium">{record.type}</TableCell>
              <TableCell>
                <Badge variant="outline" className="font-mono">{record.confidence}%</Badge>
              </TableCell>
              <TableCell>
                <span className="font-bold text-primary">{record.score}</span>
              </TableCell>
              <TableCell className="text-right text-muted-foreground font-mono text-sm">
                {record.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
