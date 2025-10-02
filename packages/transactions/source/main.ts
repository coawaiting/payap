import { globalContainer } from '@payap/transactions/infrastructure/containers/globa.container.ts';

const start = async () => {
  const transactionsServer = globalContainer.resolve(
    'transactionsServer',
  );

  await transactionsServer.initialize();

  await transactionsServer.run();
};

await start();
