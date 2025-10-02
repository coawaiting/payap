import * as path from 'node:path';
import { Server, ServerCredentials } from '@grpc/grpc-js';
import { load } from '@grpc/proto-loader';
import { ReflectionService } from '@grpc/reflection';
import type { AbstractUsersService } from '@payap/users/core/services/users.service.ts';
import type { CreateUserResponseMessage } from '@payap/users/generated/v1/messages/createUserResponse.message.ts';
import {
  type UsersServiceServer,
  UsersServiceService,
} from '@payap/users/generated/v1/services/users.service.ts';

export class UsersServer {
  private readonly server: Server;
  private readonly usersService: AbstractUsersService;

  public constructor({
    usersService,
  }: {
    usersService: AbstractUsersService;
  }) {
    this.server = new Server();
    this.usersService = usersService;
  }

  public async addReflection() {
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

    reflection.addToServer(this.server);
  }

  public async addServices() {
    const implementation: UsersServiceServer = {
      createUser: async (_, callback) => {
        try {
          const user = await this.usersService.createUser();

          const output: CreateUserResponseMessage = {
            userUuid: user.uuid,
          };

          callback(null, output);
        } catch (error) {
          callback(error as Error, null);
        }
      },
    };

    this.server.addService(UsersServiceService, implementation);
  }

  public async initialize() {
    await this.addReflection();
    await this.addServices();
  }

  public run() {
    return new Promise<void>((resolve, reject) => {
      this.server.bindAsync(
        '0.0.0.0:59875',
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
