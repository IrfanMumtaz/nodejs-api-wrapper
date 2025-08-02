import { config } from 'dotenv';
import path from 'path';

/**
 * Global setup for parallel test execution
 * This runs once before all tests start
 */
export default async function globalSetup(): Promise<void> {
  console.log('🚀 Starting global test setup...');

  // Load environment variables
  try {
    config({ path: path.resolve(process.cwd(), '.env.test') });
  } catch (error) {
    config({ path: path.resolve(process.cwd(), '.env') });
  }

  // Set test-specific environment variables
  process.env.NODE_ENV = 'test';
  process.env.TEST_MODE = 'parallel';

  // Initialize test database connections
  await initializeTestDatabase();

  // Setup test data and shared resources
  await setupTestData();

  // Initialize test containers or services
  await initializeTestServices();

  console.log('✅ Global test setup completed');
}

/**
 * Initialize test database connections
 */
async function initializeTestDatabase(): Promise<void> {
  try {
    // Import database configuration
    const { default: db } = await import('../config/db');

    // Initialize test database
    await db.initialize();

    console.log('📊 Test database initialized');
  } catch (error) {
    console.warn('⚠️ Test database initialization failed:', error);
    // Continue without database for unit tests
  }
}

/**
 * Setup test data and shared resources
 */
async function setupTestData(): Promise<void> {
  try {
    // Create test data directory if it doesn't exist
    const fs = await import('fs');
    const testDataDir = path.join(process.cwd(), 'tests', 'data');

    if (!fs.existsSync(testDataDir)) {
      fs.mkdirSync(testDataDir, { recursive: true });
    }

    // Setup shared test fixtures
    await setupTestFixtures();

    console.log('📁 Test data setup completed');
  } catch (error) {
    console.warn('⚠️ Test data setup failed:', error);
  }
}

/**
 * Setup test fixtures
 */
async function setupTestFixtures(): Promise<void> {
  // Create test fixtures file if it doesn't exist
  const fs = await import('fs');
  const fixturesPath = path.join(
    process.cwd(),
    'tests',
    'fixtures',
    'index.ts'
  );

  if (!fs.existsSync(fixturesPath)) {
    const fixturesDir = path.dirname(fixturesPath);
    if (!fs.existsSync(fixturesDir)) {
      fs.mkdirSync(fixturesDir, { recursive: true });
    }

    // Create basic fixtures file
    const fixturesContent = `// Test fixtures for parallel testing
export const testFixtures = {
  users: [
    { id: 1, name: 'Test User 1', email: 'test1@example.com' },
    { id: 2, name: 'Test User 2', email: 'test2@example.com' }
  ],
  // Add more fixtures as needed
};

export default testFixtures;
`;

    fs.writeFileSync(fixturesPath, fixturesContent);
  }
}

/**
 * Initialize test services
 */
async function initializeTestServices(): Promise<void> {
  try {
    // Initialize any test-specific services
    // This could include mock services, test containers, etc.

    console.log('🔧 Test services initialized');
  } catch (error) {
    console.warn('⚠️ Test services initialization failed:', error);
  }
}
