import { randomUUID } from 'node:crypto';
import { credentials } from '@grpc/grpc-js';
import type { CreateWalletResponseMessage } from '@payap/wallets/generated/v1/messages/createWalletResponse.message.ts';
import type { ShowWalletResponseMessage } from '@payap/wallets/generated/v1/messages/showWalletResponse.message.ts';
import { WalletsServiceClient } from '@payap/wallets/generated/v1/services/wallets.service.ts';
import { globalContainer } from '@payap/wallets/infrastructure/containers/global/global.container.ts';
import type { WalletsServer } from '@payap/wallets/infrastructure/grpc/servers/wallets/wallets.server.ts';
import { beforeAll, describe, expect, it } from 'vitest';

describe('Wallets service tests', async () => {
  let walletsServer: WalletsServer;
  let walletsServiceClient: WalletsServiceClient;

  beforeAll(async () => {
    walletsServer = globalContainer.resolve('walletsServer');

    await walletsServer.initialize({
      enableReflection: false,
    });

    await walletsServer.run();

    walletsServiceClient = new WalletsServiceClient(
      'localhost:59874',
      credentials.createInsecure(),
    );
  });

  it('Should create a wallet', async () => {
    const userUuid = randomUUID();

    const createWalletResponseMessage =
      await new Promise<CreateWalletResponseMessage>(
        (resolve, reject) =>
          walletsServiceClient.createWallet(
            {
              userUuid: userUuid,
            },
            (error, response) =>
              error ? reject(error) : resolve(response),
          ),
      );

    const showWalletResponseMessage =
      await new Promise<ShowWalletResponseMessage>(
        (resolve, reject) =>
          walletsServiceClient.showWallet(
            {
              walletUuid:
                createWalletResponseMessage.walletUuid,
            },
            (error, response) =>
              error ? reject(error) : resolve(response),
          ),
      );

    const expectedShowWalletResponseMessage: ShowWalletResponseMessage =
      {
        balance: '0',
        isFrozen: false,
        userUuid: userUuid,
        walletUuid: createWalletResponseMessage.walletUuid,
      };

    expect(showWalletResponseMessage).toEqual(
      expectedShowWalletResponseMessage,
    );
  });
});
