import { useMutation } from '@tanstack/react-query';
import { classifyImage } from '@/services/analysis';

export function useAnalysis() {
  const mutation = useMutation({
    mutationFn: classifyImage,
  });

  return {
    analyze: mutation.mutate,
    data: mutation.data,
    error: mutation.error,
    isPending: mutation.isPending,
    reset: mutation.reset,
  };
}
