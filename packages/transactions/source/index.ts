import { ServerCredentials } from '@grpc/grpc-js';
import { globalContainer } from '@payap/transactions/infrastructure/containers/globa.container.ts';
import { createTransactionsServer } from '@payap/transactions/infrastructure/grpc/servers/transactions.server.ts';

const start = async () => {
  const transactionsService = globalContainer.resolve('transactionsService');

  const server = await createTransactionsServer({
    transactionsService,
  });

  server.bindAsync(
    '0.0.0.0:59876',
    ServerCredentials.createInsecure(),
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
};

await start();
