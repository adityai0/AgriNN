import { useQuery } from '@tanstack/react-query';
import type { ClassificationResponse } from '@/lib/types';

export function useRecentRecords(limit: number = 50) {
  return useQuery<ClassificationResponse[], Error>({
    queryKey: ['records', { limit }],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/?limit=${limit}`);
      if (!res.ok) {
        throw new Error('Failed to fetch recent records');
      }
      return res.json();
    },
  });
}

export function useRecord(id: string) {
  return useQuery<ClassificationResponse, Error>({
    queryKey: ['records', id],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/records/${id}`);
      if (!res.ok) {
        if (res.status === 404) throw new Error('Record not found');
        throw new Error('Failed to fetch record details');
      }
      return res.json();
    },
    enabled: !!id,
  });
}
