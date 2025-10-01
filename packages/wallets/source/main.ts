import { ServerCredentials } from '@grpc/grpc-js';
import { globalContainer } from '@payap/wallets/infrastructure/containers/global.container.ts';
import { createWalletsServer } from '@payap/wallets/infrastructure/grpc/servers/wallets.server.ts';

const start = async () => {
  const walletsService =
    globalContainer.resolve('walletsService');

  const server = await createWalletsServer({
    walletsService,
  });

  server.bindAsync(
    '0.0.0.0:59874',
    ServerCredentials.createInsecure(),
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
};

await start();
