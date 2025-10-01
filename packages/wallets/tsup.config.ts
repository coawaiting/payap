import { defineConfig } from 'tsup';

export default defineConfig([
  {
    bundle: true,
    clean: true,
    entry: ['source/main.ts'],
    external: [
      '@grpc/grpc-js',
      '@grpc/proto-loader',
      '@grpc/reflection',
    ],
    format: ['esm'],
    outDir: 'build/',
    platform: 'node',
    skipNodeModulesBundle: true,
    sourcemap: true,
    target: 'node22',
    tsconfig: 'tsconfig.json',
  },
  {
    bundle: true,
    dts: {
      entry: 'source/index.ts',
      resolve: true,
    },
    entry: ['source/index.ts'],
    format: ['esm'],
    outDir: 'build/',
    platform: 'node',
    target: 'node22',
    tsconfig: 'tsconfig.json',
  },
]);
