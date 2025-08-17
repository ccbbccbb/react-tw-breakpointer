import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    client: 'src/client.tsx',
    noop: 'src/noop.ts',
  },
  format: ['esm', 'cjs'],
  bundle: false,
  dts: true,
  sourcemap: true,
  clean: true,
  external: ['react', 'react-dom'],
  minify: true,
  splitting: false,
  treeshake: true,
  target: 'es2020',
  platform: 'browser',
  esbuildOptions: (options) => {
    options.drop = ['console', 'debugger'];
  },
});
