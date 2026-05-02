import { useQuery } from '@tanstack/react-query';
import type { DashboardStats, DashboardAnalytics } from '@/lib/types';

export function useDashboardStats() {
  const query = useQuery<DashboardStats, Error>({
    queryKey: ['dashboard', 'stats'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`);
      if (!res.ok) throw new Error('Failed to fetch dashboard stats');
      return res.json();
    },
  });

  return {
    stats: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}

export function useDashboardAnalytics() {
  const query = useQuery<DashboardAnalytics, Error>({
    queryKey: ['dashboard', 'analytics'],
    queryFn: async () => {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/analytics`);
      if (!res.ok) throw new Error('Failed to fetch dashboard analytics');
      return res.json();
    },
  });

  return {
    analytics: query.data,
    loading: query.isLoading,
    error: query.error,
  };
}
