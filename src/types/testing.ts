export interface TestConfig {
  timeout: number;
  retries: number;
  parallel: boolean;
}

export interface TestResult {
  passed: boolean;
  duration: number;
  error?: string;
}

export interface TestSuite {
  name: string;
  tests: TestCase[];
}

export interface TestCase {
  name: string;
  fn: () => Promise<void> | void;
}
