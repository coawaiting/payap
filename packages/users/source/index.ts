import { globalContainer } from '@payap/users/infrastructure/containers/global.container.ts';

const start = async () => {
  const usersService = globalContainer.resolve('usersService');

  const user = await usersService.createUser();

  console.log(user);
};

await start();
