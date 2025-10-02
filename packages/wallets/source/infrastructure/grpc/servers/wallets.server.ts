import * as path from 'node:path';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { CreateWalletResponseMessage } from '@payap/wallets/generated/v1/messages/createWalletResponse.message.ts';
import {
  type WalletsServiceServer,
  WalletsServiceService,
} from '@payap/wallets/generated/v1/services/wallets.service.ts';

export class WalletsServer {
  private readonly server: Server;

  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.server = new Server();

    this.walletsService = walletsService;
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
          const input = call.request;

          const user = new UserEntity({
            uuid: input.userUuid,
          });

          const wallet = await this.walletsService.createWallet(
            {
              user,
            },
          );

          const output: CreateWalletResponseMessage = {
            walletUuid: wallet.uuid,
          };

          callback(null, output);
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
