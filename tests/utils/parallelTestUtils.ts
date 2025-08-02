import { v4 as uuidv4 } from 'uuid';
import path from 'path';
import fs from 'fs';

/**
 * Utilities for parallel test execution
 */
export class ParallelTestUtils {
  private static testIds = new Set<string>();
  private static startTimes = new Map<string, number>();

  /**
   * Generate a unique test identifier for isolation
   */
  static generateTestId(prefix: string = 'test'): string {
    const testId = `${prefix}_${uuidv4()}`;
    this.testIds.add(testId);
    return testId;
  }

  /**
   * Start performance monitoring for a test
   */
  static startTestTimer(testId: string): void {
    this.startTimes.set(testId, Date.now());
  }

  /**
   * End performance monitoring and return execution time
   */
  static endTestTimer(testId: string): number {
    const startTime = this.startTimes.get(testId);
    if (!startTime) {
      throw new Error(`Test timer not started for: ${testId}`);
    }

    const executionTime = Date.now() - startTime;
    this.startTimes.delete(testId);
    return executionTime;
  }

  /**
   * Create isolated test data directory
   */
  static createTestDataDir(testId: string): string {
    const testDataDir = path.join(process.cwd(), 'tests', 'data', testId);
    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }
    return testDataDir;
  }

  /**
   * Cleanup test data directory
   */
  static cleanupTestDataDir(testId: string): void {
    const testDataDir = path.join(process.cwd(), 'tests', 'data', testId);
    if (fs.existsSync(testDataDir)) {
      fs.rmSync(testDataDir, { recursive: true, force: true });
    }
  }

  /**
   * Create isolated database connection for test
   */
  static async createTestDatabase(testId: string): Promise<any> {
    // This would create an isolated database connection for the test
    // Implementation depends on your database setup
    return {
      testId,
      connection: null, // Replace with actual database connection
      cleanup: () => {
        // Cleanup database connection
      },
    };
  }

  /**
   * Wait for a condition with timeout
   */
  static async waitFor(
    condition: () => boolean | Promise<boolean>,
    timeout: number = 5000,
    interval: number = 100
  ): Promise<void> {
    const startTime = Date.now();

    while (Date.now() - startTime < timeout) {
      if (await condition()) {
        return;
      }
      await new Promise(resolve => setTimeout(resolve, interval));
    }

    throw new Error(`Condition not met within ${timeout}ms`);
  }

  /**
   * Retry a function with exponential backoff
   */
  static async retry<T>(
    fn: () => Promise<T>,
    maxRetries: number = 3,
    baseDelay: number = 1000
  ): Promise<T> {
    let lastError: Error;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await fn();
      } catch (error) {
        lastError = error as Error;

        if (attempt === maxRetries) {
          break;
        }

        const delay = baseDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }

    throw lastError!;
  }

  /**
   * Create test-specific environment variables
   */
  static createTestEnv(testId: string): Record<string, string> {
    return {
      TEST_ID: testId,
      TEST_MODE: 'parallel',
      NODE_ENV: 'test',
      // Add more test-specific environment variables as needed
    };
  }

  /**
   * Get all active test IDs
   */
  static getActiveTestIds(): string[] {
    return Array.from(this.testIds);
  }

  /**
   * Cleanup all test resources
   */
  static cleanupAll(): void {
    // Cleanup all test data directories
    const testDataBaseDir = path.join(process.cwd(), 'tests', 'data');
    if (fs.existsSync(testDataBaseDir)) {
      const testDirs = fs.readdirSync(testDataBaseDir);
      for (const testDir of testDirs) {
        const testDataDir = path.join(testDataBaseDir, testDir);
        if (fs.statSync(testDataDir).isDirectory()) {
          fs.rmSync(testDataDir, { recursive: true, force: true });
        }
      }
    }

    // Clear test tracking
    this.testIds.clear();
    this.startTimes.clear();
  }
}

/**
 * Test isolation decorator for class methods
 */
export function isolatedTest(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const testId = ParallelTestUtils.generateTestId(
      `${this.constructor.name}_${propertyName}`
    );

    try {
      // Setup test isolation
      const testDataDir = ParallelTestUtils.createTestDataDir(testId);
      const testEnv = ParallelTestUtils.createTestEnv(testId);

      // Set test environment variables
      Object.assign(process.env, testEnv);

      // Start performance monitoring
      ParallelTestUtils.startTestTimer(testId);

      // Execute the test
      const result = await originalMethod.apply(this, args);

      // End performance monitoring
      const executionTime = ParallelTestUtils.endTestTimer(testId);
      console.log(`Test ${testId} completed in ${executionTime}ms`);

      return result;
    } finally {
      // Cleanup test resources
      ParallelTestUtils.cleanupTestDataDir(testId);
    }
  };

  return descriptor;
}

/**
 * Performance monitoring decorator
 */
export function monitorPerformance(
  target: any,
  propertyName: string,
  descriptor: PropertyDescriptor
) {
  const originalMethod = descriptor.value;

  descriptor.value = async function (...args: any[]) {
    const startTime = Date.now();
    const testName = `${this.constructor.name}.${propertyName}`;

    try {
      const result = await originalMethod.apply(this, args);
      const executionTime = Date.now() - startTime;

      // Log performance metrics
      console.log(`Performance: ${testName} took ${executionTime}ms`);

      return result;
    } catch (error) {
      const executionTime = Date.now() - startTime;
      console.error(
        `Performance: ${testName} failed after ${executionTime}ms`,
        error
      );
      throw error;
    }
  };

  return descriptor;
}
