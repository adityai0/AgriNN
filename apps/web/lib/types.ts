export interface Metrics {
  body_width: number;
  body_height: number;
  body_ratio: number;
  contour_area: number;
}

export interface ClassificationResponse {
  success: boolean;
  animal_type: string;
  confidence: number;
  metrics: Metrics;
  score: string;
  original_image_url?: string;
  processed_image_url?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}
