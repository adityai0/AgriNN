'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Image as ImageIcon } from 'lucide-react';

interface Record {
  id: number;
  animal_type: string;
  breed: string;
  confidence: number;
  breed_confidence: number;
  score: string;
  composite_score?: number;
  grade?: string;
  original_image_url: string | null;
  processed_image_url: string | null;
  created_at: string;
}

export function RecentTable() {
  const [records, setRecords] = useState<Record[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecords() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/`);
        if (res.ok) {
          const data = await res.json();
          setRecords(data);
        }
      } catch (error) {
        console.error('Failed to fetch records:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRecords();
  }, []);

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
            <TableHead>Grade</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                Loading records...
              </TableCell>
            </TableRow>
          ) : records.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                No recent records found.
              </TableCell>
            </TableRow>
          ) : (
            records.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <div className="h-10 w-16 bg-muted border flex items-center justify-center overflow-hidden relative">
                    {record.processed_image_url || record.original_image_url ? (
                      <img 
                        src={record.processed_image_url || record.original_image_url!} 
                        alt="Preview" 
                        className="object-cover w-full h-full"
                      />
                    ) : (
                      <ImageIcon className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  {record.animal_type.charAt(0).toUpperCase() + record.animal_type.slice(1)} 
                  {record.breed && record.breed !== 'Unknown' && ` (${record.breed})`}
                </TableCell>
                <TableCell>
                  <Badge variant="outline" className="font-mono">
                    {Math.round(record.confidence * 100)}%
                  </Badge>
                </TableCell>
                <TableCell>
                  <span className="font-bold text-primary text-lg">
                    {record.composite_score !== undefined ? record.composite_score : record.score}
                  </span>
                </TableCell>
                <TableCell>
                  {record.grade && (
                    <Badge variant={record.grade === 'Excellent' || record.grade === 'Very Good' ? 'default' : 'secondary'} className="font-semibold uppercase tracking-wider">
                      {record.grade}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right text-muted-foreground font-mono text-sm">
                  {new Date(record.created_at).toLocaleString()}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
