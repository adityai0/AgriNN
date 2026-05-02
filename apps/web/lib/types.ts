export interface Traits {
  stature: number;
  body_length: number;
  chest_width: number;
  body_depth: number;
  rump_width: number;
  rump_angle: number;
  angularity: number;
  dairy_strength: number;
}

export interface Metrics {
  body_width: number;
  body_height: number;
  body_ratio: number;
  contour_area: number;
}

export interface ClassificationResponse {
  id: string;
  success: boolean;
  animal_type: string;
  created_at?: string;
  breed?: string;
  breed_confidence?: number;
  confidence: number;
  metrics: Metrics;
  traits?: Traits;
  composite_score?: number;
  grade?: string;
  score: string;
  original_image_url?: string;
  processed_image_url?: string;
  error?: string;
}

export interface HealthResponse {
  status: string;
  message: string;
}

export interface DashboardStats {
  total_analyses: number;
  average_confidence: number;
  cattle_processed: number;
  buffalo_processed: number;
}

export interface WeeklyVolume {
  name: string;
  cattle: number;
  buffalo: number;
}

export interface ATCDistribution {
  name: string;
  count: number;
}

export interface DashboardAnalytics {
  weekly_volume: WeeklyVolume[];
  atc_distribution: ATCDistribution[];
}
