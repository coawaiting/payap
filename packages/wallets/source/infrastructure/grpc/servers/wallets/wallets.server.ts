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
import type { FreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/freezeWallet.endpoint.ts';
import type { IncreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/increaseWalletBalance.endpoint.ts';
import type { ReassignWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/reassignWalletBalance.endpoint.ts';
import type { ShowWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/showWallet.endpoint.ts';
import type { UnfreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/unfreezeWallet.endpoint.ts';

export class WalletsServer {
  private readonly createWalletEndpoint: CreateWalletEndpoint;
  private readonly decreaseWalletBalanceEndpoint: DecreaseWalletBalanceEndpoint;
  private readonly deleteWalletEndpoint: DeleteWalletEndpoint;
  private readonly freezeWalletEndpoint: FreezeWalletEndpoint;
  private readonly increaseWalletBalanceEndpoint: IncreaseWalletBalanceEndpoint;
  private readonly reassignWalletBalanceEndpoint: ReassignWalletBalanceEndpoint;
  private readonly showWalletEndpoint: ShowWalletEndpoint;
  private readonly unfreezeWalletEndpoint: UnfreezeWalletEndpoint;

  private readonly server: Server;

  public constructor({
    createWalletEndpoint,
    decreaseWalletBalanceEndpoint,
    deleteWalletEndpoint,
    freezeWalletEndpoint,
    increaseWalletBalanceEndpoint,
    reassignWalletBalanceEndpoint,
    showWalletEndpoint,
    unfreezeWalletEndpoint,
  }: {
    createWalletEndpoint: CreateWalletEndpoint;
    decreaseWalletBalanceEndpoint: DecreaseWalletBalanceEndpoint;
    deleteWalletEndpoint: DeleteWalletEndpoint;
    freezeWalletEndpoint: FreezeWalletEndpoint;
    increaseWalletBalanceEndpoint: IncreaseWalletBalanceEndpoint;
    reassignWalletBalanceEndpoint: ReassignWalletBalanceEndpoint;
    showWalletEndpoint: ShowWalletEndpoint;
    unfreezeWalletEndpoint: UnfreezeWalletEndpoint;
  }) {
    this.createWalletEndpoint = createWalletEndpoint;
    this.decreaseWalletBalanceEndpoint =
      decreaseWalletBalanceEndpoint;
    this.deleteWalletEndpoint = deleteWalletEndpoint;
    this.freezeWalletEndpoint = freezeWalletEndpoint;
    this.increaseWalletBalanceEndpoint =
      increaseWalletBalanceEndpoint;
    this.reassignWalletBalanceEndpoint =
      reassignWalletBalanceEndpoint;
    this.showWalletEndpoint = showWalletEndpoint;
    this.unfreezeWalletEndpoint = unfreezeWalletEndpoint;

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
      freezeWallet: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.freezeWalletEndpoint.handle({
              freezeWalletRequestMessage: request,
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
      reassignWalletBalance: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.reassignWalletBalanceEndpoint.handle({
              reassignWalletBalanceRequestMessage: request,
            });

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
      showWallet: async (call, callback) => {
        try {
          const request = call.request;

          const response = await this.showWalletEndpoint.handle(
            {
              showWalletRequestMessage: request,
            },
          );

          callback(null, response);
        } catch (error) {
          callback(error as Error, null);
        }
      },
      unfreezeWallet: async (call, callback) => {
        try {
          const request = call.request;

          const response =
            await this.unfreezeWalletEndpoint.handle({
              unfreezeWalletRequestMessage: request,
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

  public async initialize({
    enableReflection,
  }: {
    enableReflection: boolean;
  }) {
    if (enableReflection) {
      await this.addReflection();
    }

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
