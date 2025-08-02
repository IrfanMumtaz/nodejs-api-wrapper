// ============================================================================
// TYPE DEFINITIONS - MAIN INDEX
// ============================================================================
// This file re-exports all type definitions from their respective modules
// for convenient importing throughout the application.

// Express types
export * from './express';

// API types
export * from './api';

// Controller types
export * from './controller';

// Service types
export * from './service';

// Model types
export * from './models';

// Resource types
export * from './resources';

// Validation types
export * from './validation';

// Database types
export * from './database';

// Health check types
export * from './health';

// Configuration types - re-export with explicit naming to avoid conflicts
export type {
  AppConfig,
  DatabaseConfig as AppDatabaseConfig,
  ConfigInterface,
  LoggerConfig,
  RabbitMQConfig,
  RouteConfig,
  SecurityConfig,
} from './config';

// Middleware types
export * from './middleware';

// Exception types
export * from './exceptions';

// Cron types
export * from './cron';

// Consumer types
export * from './consumers';

// Environment types
export * from './environment';

// Container types - re-export with explicit naming to avoid conflicts
export type {
  ContainerInterface,
  ServiceContainerInterface as ContainerServiceInterface,
  ServiceFactory,
  ServiceIdentifier,
  ServiceInstance,
} from './container';

// Testing types
export * from './testing';

// Re-export DatabaseConfig from database.ts to avoid conflict with config.ts
export type { DatabaseConfig as SutandoDatabaseConfig } from './database';
