import { defineConfig } from 'tsup';

export default defineConfig({
  clean: true,
  dts: true,
  entry: ['source/index.ts'],
  external: [
    '@grpc/grpc-js',
    '@grpc/proto-loader',
    '@grpc/reflection',
  ],
  format: ['esm'],
  outDir: 'build/',
  skipNodeModulesBundle: true,
  sourcemap: true,
  tsconfig: 'tsconfig.json',
});
