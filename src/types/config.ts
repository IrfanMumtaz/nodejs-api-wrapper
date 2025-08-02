import { ApiResponse } from './api';
import { ExpressRequest, ExpressResponse } from './express';
import { Router } from 'express';

export interface DatabaseConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dialect: 'mysql' | 'postgresql' | 'sqlite';
}

export interface AppConfig {
  port: number;
  environment: string;
  debug: boolean;
  cors: {
    origin: string | string[];
    credentials: boolean;
  };
  rateLimit: {
    windowMs: number;
    max: number;
  };
}

export interface LoggerConfig {
  level: string;
  format: string;
  transports: Record<string, unknown>[];
}

export interface RabbitMQConfig {
  host: string;
  port: number;
  username: string;
  password: string;
  vhost: string;
}

export interface ConfigInterface {
  database: DatabaseConfig;
  app: AppConfig;
  logger: LoggerConfig;
  rabbitmq: RabbitMQConfig;
}

export interface SecurityConfig {
  rateLimit: {
    windowMs: number;
    max: number;
    message: ApiResponse;
    standardHeaders: boolean;
    legacyHeaders: boolean;
  };
  compression: {
    level: number;
    threshold: number;
    filter: (req: ExpressRequest, res: ExpressResponse) => boolean;
  };
}

export interface RouteConfig {
  path: string;
  handler: Router | ((req: ExpressRequest, res: ExpressResponse) => void);
}
