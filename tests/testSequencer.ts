import type { Test } from '@jest/test-result';

/**
 * Custom test sequencer for optimal parallel test execution
 * Orders tests by:
 * 1. Fastest tests first (unit tests)
 * 2. Integration tests
 * 3. Slowest tests last (e2e, database tests)
 */
class CustomTestSequencer {
  private testExecutionTimes: Map<string, number> = new Map();
  private readonly defaultExecutionTime = 1000; // 1 second default

  /**
   * Sort tests for optimal parallel execution
   */
  sort(tests: Test[]): Test[] {
    return tests.sort((testA, testB) => {
      const timeA = this.getTestExecutionTime(testA);
      const timeB = this.getTestExecutionTime(testB);

      // Sort by execution time (fastest first)
      if (timeA !== timeB) {
        return timeA - timeB;
      }

      // If execution times are equal, sort by test type
      const typeA = this.getTestType(testA);
      const typeB = this.getTestType(testB);

      return this.getTestTypePriority(typeA) - this.getTestTypePriority(typeB);
    });
  }

  /**
   * Get estimated execution time for a test
   */
  private getTestExecutionTime(test: Test): number {
    const testPath = test.path;

    // Check if we have cached execution time
    if (this.testExecutionTimes.has(testPath)) {
      return this.testExecutionTimes.get(testPath)!;
    }

    // Estimate based on test file path and name
    let estimatedTime = this.defaultExecutionTime;

    // Unit tests are typically faster
    if (testPath.includes('unit') || testPath.includes('Unit')) {
      estimatedTime = 100;
    }
    // Controller tests are medium speed
    else if (
      testPath.includes('controller') ||
      testPath.includes('Controller')
    ) {
      estimatedTime = 500;
    }
    // Service tests might involve database operations
    else if (testPath.includes('service') || testPath.includes('Service')) {
      estimatedTime = 800;
    }
    // Integration tests are slower
    else if (
      testPath.includes('integration') ||
      testPath.includes('Integration')
    ) {
      estimatedTime = 2000;
    }
    // E2E tests are the slowest
    else if (testPath.includes('e2e') || testPath.includes('E2E')) {
      estimatedTime = 5000;
    }

    // Cache the estimated time
    this.testExecutionTimes.set(testPath, estimatedTime);

    return estimatedTime;
  }

  /**
   * Get test type based on file path
   */
  private getTestType(test: Test): string {
    const testPath = test.path.toLowerCase();

    if (testPath.includes('unit')) return 'unit';
    if (testPath.includes('integration')) return 'integration';
    if (testPath.includes('e2e')) return 'e2e';
    if (testPath.includes('controller')) return 'controller';
    if (testPath.includes('service')) return 'service';
    if (testPath.includes('middleware')) return 'middleware';

    return 'unknown';
  }

  /**
   * Get priority for test type (lower number = higher priority)
   */
  private getTestTypePriority(testType: string): number {
    const priorities: Record<string, number> = {
      unit: 1,
      controller: 2,
      service: 3,
      middleware: 4,
      integration: 5,
      e2e: 6,
      unknown: 7,
    };

    return priorities[testType] || priorities.unknown;
  }
}

export default CustomTestSequencer;
