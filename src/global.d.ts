declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV?: 'development' | 'production' | 'test';
    }
  }
  // Provided in test-setup.ts and configured via vitest.setupFiles
  // Declared here so editors/tsc know it's available in tests
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const mockEnvironment: (env: 'development' | 'production' | 'test') => void;
}

export {};
