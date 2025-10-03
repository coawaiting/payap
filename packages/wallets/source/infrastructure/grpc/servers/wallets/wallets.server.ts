import * as path from 'node:path';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import {
  type WalletsServiceServer,
  WalletsServiceService,
} from '@payap/wallets/generated/v1/services/wallets.service.ts';
import type { CreateWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/createWallet.endpoint.ts';
import type { DeleteWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/deleteWallet.endpoint.ts';

export class WalletsServer {
  private readonly createWalletEndpoint: CreateWalletEndpoint;
  private readonly deleteWalletEndpoint: DeleteWalletEndpoint;

  private readonly server: Server;

  public constructor({
    createWalletEndpoint,
    deleteWalletEndpoint,
  }: {
    createWalletEndpoint: CreateWalletEndpoint;
    deleteWalletEndpoint: DeleteWalletEndpoint;
  }) {
    this.createWalletEndpoint = createWalletEndpoint;
    this.deleteWalletEndpoint = deleteWalletEndpoint;

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
