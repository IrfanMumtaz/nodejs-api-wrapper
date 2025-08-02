import Joi from 'joi';
import { AppConfig } from '../src/types';

class ConfigValidator {
  static validate(): AppConfig {
    const schema = Joi.object({
      // App configuration
      NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
      APP_PORT: Joi.number().default(3000),
      APP_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),

      // Database configuration
      DB_CONNECTION: Joi.string()
        .valid('mysql', 'mysql2', 'pg', 'sqlite3')
        .required(),
      DB_HOST: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_PORT: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.number().required(),
      }),
      DB_USER: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_PASSWORD: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_DATABASE: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      PGSSL: Joi.boolean().default(false),

      // Security configuration
      JWT_SECRET: Joi.string().min(32).optional(),
      JWT_EXPIRES_IN: Joi.string().default('24h'),

      // Logging configuration
      LOG_LEVEL: Joi.string()
        .valid('error', 'warn', 'info', 'debug')
        .default('info'),
      LOG_FILE: Joi.string().default('logs/app.log'),

      // Rate limiting
      RATE_LIMIT_WINDOW_MS: Joi.number().default(900000), // 15 minutes
      RATE_LIMIT_MAX_REQUESTS: Joi.number().default(100),

      // Compression
      COMPRESSION_LEVEL: Joi.number().min(0).max(9).default(6),
      COMPRESSION_THRESHOLD: Joi.number().default(1024),

      // CORS
      CORS_ORIGIN: Joi.string().default('*'),

      // Request timeout
      REQUEST_TIMEOUT: Joi.number().default(30000),

      // Database pooling
      DB_POOL_MIN: Joi.number().default(2),
      DB_POOL_MAX: Joi.number().default(10),
      DB_POOL_ACQUIRE_TIMEOUT: Joi.number().default(30000),
      DB_POOL_CREATE_TIMEOUT: Joi.number().default(30000),
      DB_POOL_DESTROY_TIMEOUT: Joi.number().default(5000),
      DB_POOL_IDLE_TIMEOUT: Joi.number().default(30000),
      DB_POOL_REAP_INTERVAL: Joi.number().default(1000),
      DB_POOL_CREATE_RETRY_INTERVAL: Joi.number().default(200),
    });

    const { error, value } = schema.validate(process.env, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details
        .map(detail => detail.message)
        .join(', ');
      throw new Error(`Configuration validation failed: ${errorMessages}`);
    }

    return value as AppConfig;
  }

  static validateDatabaseConfig(): void {
    const dbSchema = Joi.object({
      DB_CONNECTION: Joi.string()
        .valid('mysql', 'mysql2', 'pg', 'sqlite3')
        .required(),
      DB_HOST: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_PORT: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.number().required(),
      }),
      DB_USER: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_PASSWORD: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
      DB_DATABASE: Joi.when('DB_CONNECTION', {
        is: 'sqlite3',
        then: Joi.optional(),
        otherwise: Joi.string().required(),
      }),
    });

    const { error } = dbSchema.validate(process.env, {
      allowUnknown: true,
      abortEarly: false,
    });

    if (error) {
      const errorMessages = error.details
        .map(detail => detail.message)
        .join(', ');
      throw new Error(
        `Database configuration validation failed: ${errorMessages}`
      );
    }
  }
}

export default ConfigValidator;
