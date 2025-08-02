import express, { Application } from 'express';
import dotenv from 'dotenv';
import 'module-alias/register';
import Logger from './config/Logger';

dotenv.config();

// Validate configuration before starting the application
import ConfigValidator from '@config/ConfigValidator';
try {
  ConfigValidator.validate();
  ConfigValidator.validateDatabaseConfig();
  Logger.info('✅ Configuration validation passed');
} catch (error) {
  Logger.error(
    `❌ Configuration validation failed: ${(error as Error).message}`
  );
  process.exit(1);
}

import '@config/db';

// Initialize service registry
import ServiceRegistry from '@container/ServiceRegistry';
ServiceRegistry.register();

// remove comment from CronRegistry to enable cron jobs
// import '@cron/CronRegistry';

const app: Application = express();

// Security configuration
import Security from '@config/Security';
Security.configure(app);

// Request timeout middleware
import { timeoutMiddleware } from '@middlewares/TimeoutMiddleware';
app.use(timeoutMiddleware(parseInt(process.env.REQUEST_TIMEOUT || '30000')));

// Correlation ID middleware
import { correlationMiddleware } from '@middlewares/CorrelationMiddleware';
app.use(correlationMiddleware);

// Request logging middleware
import { requestLoggingMiddleware } from '@middlewares/LoggingMiddleware';
app.use(requestLoggingMiddleware);

// Sanitization middleware
import { sanitizationMiddleware } from '@middlewares/SanitizationMiddleware';
app.use(sanitizationMiddleware);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

import Registry from './Registry';
Registry.routes(app);
Registry.errors(app);

const port: number = parseInt(process.env.APP_PORT || '3000', 10);
app.listen(port, () => {
  Logger.info(
    `Server running on http://localhost:${port} (${new Date().toString()})`
  );
});
