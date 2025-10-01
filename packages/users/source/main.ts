import { ServerCredentials } from '@grpc/grpc-js';
import { globalContainer } from '@payap/users/infrastructure/containers/global.container.ts';
import { createUsersServer } from '@payap/users/infrastructure/grpc/servers/users.server.ts';

const start = async () => {
  const usersService = globalContainer.resolve('usersService');

  const server = await createUsersServer({
    usersService,
  });

  server.bindAsync(
    '0.0.0.0:59875',
    ServerCredentials.createInsecure(),
    (error) => {
      if (error) {
        throw error;
      }
    },
  );
};

await start();
