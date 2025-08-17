import '@testing-library/jest-dom/vitest';
import { afterEach, beforeEach } from 'vitest';

// Mock process.env for tests
const originalEnv = process.env;

beforeEach(() => {
  process.env = { ...originalEnv };
});

afterEach(() => {
  process.env = originalEnv;
});
// Global test utilities
// Define on globalThis without redeclaring types here (types live in global.d.ts)
(globalThis as any).mockEnvironment = (env: 'development' | 'production' | 'test') => {
  process.env.NODE_ENV = env;
};
