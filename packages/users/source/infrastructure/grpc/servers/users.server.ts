import * as path from 'node:path';
import { Server } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import type { AbstractUsersService } from '@payap/users/core/services/users.service.ts';
import type { CreateUserResponseMessage } from '@payap/users/generated/v1/messages/createUserResponse.message.ts';
import {
  type UsersServiceServer,
  UsersServiceService,
} from '@payap/users/generated/v1/services/users.service.ts';
import { createWallet } from '@payap/users/infrastructure/grpc/clients/wallets.client.ts';

export const createUsersServer = async ({
  usersService,
}: {
  usersService: AbstractUsersService;
}) => {
  const implementation: UsersServiceServer = {
    createUser: async (_, callback) => {
      try {
        const user = await usersService.createUser();

        await createWallet({
          user: {
            uuid: user.uuid,
          },
        });

        const output: CreateUserResponseMessage = {
          userUuid: user.uuid,
        };

        callback(null, output);
      } catch (error) {
        callback(error as Error, null);
      }
    },
  };

  const server = new Server();

  server.addService(UsersServiceService, implementation);

  const packageDefinition = await load(
    path.resolve(
      import.meta.dirname,
      '../proto/v1/services/users.service.proto',
    ),
    {
      includeDirs: [
        path.resolve(import.meta.dirname, '../proto/'),
      ],
    },
  );

  const reflection = new ReflectionService(packageDefinition);

  reflection.addToServer(server);

  return server;
};
