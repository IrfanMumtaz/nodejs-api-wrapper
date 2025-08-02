export interface MemoryUsage {
  rss: number;
  heapTotal: number;
  heapUsed: number;
  external: number;
}

export interface HealthCheckResult {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  checks: Record<string, HealthCheckDetail>;
  error?: string;
}

export interface HealthCheckDetail {
  status: 'healthy' | 'unhealthy';
  message?: string;
  data?: Record<string, unknown>;
}

export interface ReadinessStatus {
  status: 'ready' | 'not_ready';
  timestamp: string;
  checks: {
    database: 'ready' | 'not_ready';
    application: 'ready' | 'not_ready';
  };
  error?: string;
}

export interface LivenessStatus {
  status: 'alive';
  timestamp: string;
  uptime: number;
  memory: MemoryUsage;
}
