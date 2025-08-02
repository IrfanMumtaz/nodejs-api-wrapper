import { sutando } from 'sutando';
import { DatabaseConfig } from '../src/types';
import Logger from './Logger';

const dbConfig: DatabaseConfig = {
  client: process.env.DB_CONNECTION || 'mysql',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : undefined,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    ssl: process.env.PGSSL === 'true' ? { rejectUnauthorized: false } : false,
  },
  pool: {
    min: parseInt(process.env.DB_POOL_MIN || '2'),
    max: parseInt(process.env.DB_POOL_MAX || '10'),
    acquireTimeoutMillis: parseInt(
      process.env.DB_POOL_ACQUIRE_TIMEOUT || '30000'
    ),
    createTimeoutMillis: parseInt(
      process.env.DB_POOL_CREATE_TIMEOUT || '30000'
    ),
    destroyTimeoutMillis: parseInt(
      process.env.DB_POOL_DESTROY_TIMEOUT || '5000'
    ),
    idleTimeoutMillis: parseInt(process.env.DB_POOL_IDLE_TIMEOUT || '30000'),
    reapIntervalMillis: parseInt(process.env.DB_POOL_REAP_INTERVAL || '1000'),
    createRetryIntervalMillis: parseInt(
      process.env.DB_POOL_CREATE_RETRY_INTERVAL || '200'
    ),
  },
};

// Initialize database connection with pooling
try {
  sutando.addConnection(dbConfig);
  Logger.info('✅ Database connection established with pooling');
} catch (error) {
  Logger.error(`❌ Database connection failed: ${(error as Error).message}`);
  // Don't throw error here, let the application start and handle connection issues gracefully
  Logger.warn('⚠️ Database connection failed, but application will continue to start');
}

// Graceful shutdown handling
process.on('SIGINT', async () => {
  Logger.info('Shutting down database connections...');
  try {
    // Note: sutando doesn't have a destroy method, connections will be closed automatically
    Logger.info('Database connections will be closed automatically');
    process.exit(0);
  } catch (error) {
    Logger.error(`Error during shutdown: ${(error as Error).message}`);
    process.exit(1);
  }
});

export default sutando;
