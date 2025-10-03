import * as path from 'node:path';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import {
  type WalletsServiceServer,
  WalletsServiceService,
} from '@payap/wallets/generated/v1/services/wallets.service.ts';
import type { CreateWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/createWallet.endpoint.ts';
import type { DecreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/decreaseWalletBalance.endpoint.ts';
import type { DeleteWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/deleteWallet.endpoint.ts';
import type { IncreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/increaseWalletBalance.endpoint.ts';

export class WalletsServer {
  private readonly createWalletEndpoint: CreateWalletEndpoint;
  private readonly decreaseWalletBalanceEndpoint: DecreaseWalletBalanceEndpoint;
  private readonly deleteWalletEndpoint: DeleteWalletEndpoint;
  private readonly increaseWalletBalanceEndpoint: IncreaseWalletBalanceEndpoint;

  private readonly server: Server;

  public constructor({
    createWalletEndpoint,
    decreaseWalletBalanceEndpoint,
    deleteWalletEndpoint,
    increaseWalletBalanceEndpoint,
  }: {
    createWalletEndpoint: CreateWalletEndpoint;
    decreaseWalletBalanceEndpoint: DecreaseWalletBalanceEndpoint;
    deleteWalletEndpoint: DeleteWalletEndpoint;
    increaseWalletBalanceEndpoint: IncreaseWalletBalanceEndpoint;
  }) {
    this.createWalletEndpoint = createWalletEndpoint;
    this.decreaseWalletBalanceEndpoint =
      decreaseWalletBalanceEndpoint;
    this.deleteWalletEndpoint = deleteWalletEndpoint;
    this.increaseWalletBalanceEndpoint =
      increaseWalletBalanceEndpoint;

    this.server = new Server();
  }

  private async addReflection() {
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

    reflection.addToServer(this.server);
  }

  private async addServices() {
    const implementation: WalletsServiceServer = {
      createWallet: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.createWalletEndpoint.handle({
              createWalletRequestMessage: request,
            });

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
      decreaseWalletBalance: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.decreaseWalletBalanceEndpoint.handle({
              decreaseWalletBalanceRequestMessage: request,
            });

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
      deleteWallet: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.deleteWalletEndpoint.handle({
              deleteWalletRequestMessage: request,
            });

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
      increaseWalletBalance: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.increaseWalletBalanceEndpoint.handle({
              increaseWalletBalanceRequestMessage: request,
            });

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
    };

    this.server.addService(
      WalletsServiceService,
      implementation,
    );
  }

  public async initialize() {
    await this.addReflection();
    await this.addServices();
  }

  public run() {
    return new Promise<void>((resolve, reject) => {
      this.server.bindAsync(
        '0.0.0.0:59874',
        ServerCredentials.createInsecure(),
        (error) => {
          if (error) {
            reject(error);

            return;
          }

          resolve();
        },
      );
    });
  }
}
