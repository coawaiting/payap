import { globalContainer } from '@payap/wallets/infrastructure/containers/global/global.container.ts';

const start = async () => {
  const walletsServer =
    globalContainer.resolve('walletsServer');

  await walletsServer.initialize({
    enableReflection: true,
  });

  await walletsServer.run();
};

await start();
