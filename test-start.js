// Simple test to verify the application can start
const dotenv = require('dotenv');
const path = require('path');

// Load environment variables
dotenv.config({ path: path.join(__dirname, 'env.example') });

// Mock database connection for testing
jest.mock('sutando', () => ({
  sutando: {
    addConnection: jest.fn(),
    raw: jest.fn().mockResolvedValue([{ '1': 1 }]),
  },
}));

// Test if the application can be imported
try {
  require('./dist/index.js');
  console.log('✅ Application can be imported successfully');
} catch (error) {
  console.error('❌ Application import failed:', error.message);
  process.exit(1);
} 