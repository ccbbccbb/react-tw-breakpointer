import '@testing-library/jest-dom';
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
declare global {
  const mockEnvironment: (env: 'development' | 'production' | 'test') => void;
}

(globalThis as any).mockEnvironment = (env: 'development' | 'production' | 'test') => {
  process.env.NODE_ENV = env;
};
