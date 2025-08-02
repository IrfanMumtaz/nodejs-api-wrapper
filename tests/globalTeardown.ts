import path from 'path';

/**
 * Global teardown for parallel test execution
 * This runs once after all tests complete
 */
export default async function globalTeardown(): Promise<void> {
  console.log('🧹 Starting global test teardown...');

  // Cleanup test database connections
  await cleanupTestDatabase();

  // Cleanup test data and temporary files
  await cleanupTestData();

  // Cleanup test services and containers
  await cleanupTestServices();

  // Generate test performance report
  await generatePerformanceReport();

  console.log('✅ Global test teardown completed');
}

/**
 * Cleanup test database connections
 */
async function cleanupTestDatabase(): Promise<void> {
  try {
    // Import database configuration
    const { default: db } = await import('../config/db');

    // Close database connections
    await db.close();

    console.log('📊 Test database connections closed');
  } catch (error) {
    console.warn('⚠️ Test database cleanup failed:', error);
  }
}

/**
 * Cleanup test data and temporary files
 */
async function cleanupTestData(): Promise<void> {
  try {
    const fs = await import('fs');
    const rimraf = await import('rimraf');

    // Cleanup test data directory
    const testDataDir = path.join(process.cwd(), 'tests', 'data');
    if (fs.existsSync(testDataDir)) {
      await rimraf.default(testDataDir);
    }

    // Cleanup Jest cache
    const jestCacheDir = path.join(process.cwd(), '.jest-cache');
    if (fs.existsSync(jestCacheDir)) {
      await rimraf.default(jestCacheDir);
    }

    // Cleanup temporary test files
    const tempTestFiles = [
      path.join(process.cwd(), 'tests', 'temp'),
      path.join(process.cwd(), 'tests', 'logs'),
    ];

    for (const tempDir of tempTestFiles) {
      if (fs.existsSync(tempDir)) {
        await rimraf.default(tempDir);
      }
    }

    console.log('📁 Test data cleanup completed');
  } catch (error) {
    console.warn('⚠️ Test data cleanup failed:', error);
  }
}

/**
 * Cleanup test services and containers
 */
async function cleanupTestServices(): Promise<void> {
  try {
    // Cleanup any test-specific services
    // This could include stopping test containers, mock services, etc.

    console.log('🔧 Test services cleanup completed');
  } catch (error) {
    console.warn('⚠️ Test services cleanup failed:', error);
  }
}

/**
 * Generate test performance report
 */
async function generatePerformanceReport(): Promise<void> {
  try {
    const fs = await import('fs');
    const path = await import('path');

    // Create performance report directory
    const reportDir = path.join(process.cwd(), 'tests', 'reports');
    if (!fs.existsSync(reportDir)) {
      fs.mkdirSync(reportDir, { recursive: true });
    }

    // Generate performance report
    const reportPath = path.join(reportDir, 'performance-report.json');
    const performanceData = {
      timestamp: new Date().toISOString(),
      testMode: 'parallel',
      environment: process.env.NODE_ENV,
      nodeVersion: process.version,
      platform: process.platform,
      // Add more performance metrics as needed
    };

    fs.writeFileSync(reportPath, JSON.stringify(performanceData, null, 2));

    console.log('📊 Performance report generated');
  } catch (error) {
    console.warn('⚠️ Performance report generation failed:', error);
  }
}
