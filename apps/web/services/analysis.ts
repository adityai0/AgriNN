import { upload, get } from '@/lib/api';
import type { ClassificationResponse, HealthResponse } from '@/lib/types';

export async function classifyImage(file: File): Promise<ClassificationResponse> {
  const formData = new FormData();
  formData.append('file', file);
  return upload<ClassificationResponse>('/classify/', formData);
}

export async function checkHealth(): Promise<HealthResponse> {
  return get<HealthResponse>('/health/');
}
