import * as path from 'node:path';
import { Server } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { CreateWalletRequestMessage } from '@payap/wallets/generated/v1/messages/createWalletRequest.message.ts';
import type { CreateWalletResponseMessage } from '@payap/wallets/generated/v1/messages/createWalletResponse.message.ts';
import {
  type WalletsServiceServer,
  WalletsServiceService,
} from '@payap/wallets/generated/v1/services/wallets.service.ts';

export const createWalletsServer = async ({
  walletsService,
}: {
  walletsService: AbstractWalletsService;
}) => {
  const implementation: WalletsServiceServer = {
    createWallet: async (call, callback) => {
      try {
        const input: CreateWalletRequestMessage = call.request;

        const wallet = await walletsService.createWallet({
          user: new UserEntity({ uuid: input.userUuid }),
        });

        const output: CreateWalletResponseMessage = {
          walletUuid: wallet.uuid,
        };

        callback(null, output);
      } catch (error) {
        callback(error as Error, null as unknown);
      }
    },
  };

  const server = new Server();

  server.addService(WalletsServiceService, implementation);

  const packageDefinition = await load(
    path.resolve(
      import.meta.dirname,
      '../proto/v1/services/wallets.service.proto',
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
