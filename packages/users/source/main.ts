import { globalContainer } from '@payap/users/infrastructure/containers/global.container.ts';

const start = async () => {
  const usersServer = globalContainer.resolve('usersServer');

  await usersServer.initialize();

  await usersServer.run();
};

await start();
