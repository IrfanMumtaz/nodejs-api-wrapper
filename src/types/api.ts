export interface ApiResponse<T = Record<string, unknown>> {
  data: T;
  error: Record<string, unknown>;
  success: boolean;
  message: string;
}

export interface ApiError {
  message: string;
  code: number;
  details?: Record<string, unknown>;
}
