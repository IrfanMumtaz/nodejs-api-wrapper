import 'module-alias/register';
import dotenv from 'dotenv';
import ServiceRegistry from '@container/ServiceRegistry';

// Load test environment variables, fallback to .env if .env.test doesn't exist
try {
  dotenv.config({ path: '.env.test' });
} catch (error) {
  dotenv.config({ path: '.env' });
}

// Register services for testing
ServiceRegistry.register();

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
