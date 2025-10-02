import { defineConfig, type Options } from 'tsup';

const baseConfig: Options = {
  bundle: true,
  clean: true,
  format: ['esm'],
  outDir: 'build/',
  platform: 'node',
  target: 'node22',
  tsconfig: 'tsconfig.json',
};

export default defineConfig([
  {
    ...baseConfig,
    entry: ['source/main.ts'],
    external: [
      '@grpc/grpc-js',
      '@grpc/proto-loader',
      '@grpc/reflection',
    ],
    minify: true,
    skipNodeModulesBundle: true,
    sourcemap: true,
  },
  {
    ...baseConfig,
    dts: {
      entry: 'source/index.ts',
      resolve: true,
    },
    entry: ['source/index.ts'],
  },
]);
