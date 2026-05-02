import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { classifyImage } from '@/services/analysis';
import type { ClassificationResponse } from '@/lib/types';

export function useAnalysis() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const mutation = useMutation<ClassificationResponse, Error, File>({
    mutationFn: classifyImage,
    onSuccess: (data) => {
      // Invalidate dashboard and records queries so they refetch the newly added analysis
      queryClient.invalidateQueries({ queryKey: ['records'] });
      queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      
      if (data.id) {
        router.push(`/dashboard/records/${data.id}`);
      }
    },
  });

  return {
    analyze: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    reset: mutation.reset,
  };
}
