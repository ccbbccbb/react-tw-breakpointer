import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  platform: 'browser',
  // Remove globalName to avoid UMD build overhead
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger'];
  },
});
