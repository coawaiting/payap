import { credentials } from '@grpc/grpc-js';
import type { UserEntity } from '@payap/users/core/entities/user.entity.ts';
import { WalletEntity } from '@payap/users/core/entities/wallet.entity.ts';
import type { AbstractUsersRepository } from '@payap/users/core/repositories/users.repository.ts';
import { AbstractUsersService } from '@payap/users/core/services/users.service.ts';
import { WalletsServiceClient } from '@payap/wallets';

export class UsersService extends AbstractUsersService {
  private readonly walletsServiceClient: WalletsServiceClient;

  public constructor({
    usersRepository,
  }: {
    usersRepository: AbstractUsersRepository;
  }) {
    super({
      usersRepository,
    });

    this.walletsServiceClient = new WalletsServiceClient(
      'localhost:59874',
      credentials.createInsecure(),
    );
  }

  public async activateUser({ user }: { user: UserEntity }) {
    user.activate();

    await this.usersRepository.saveUser({
      user,
    });

    return user;
  }

  public async blockUser({ user }: { user: UserEntity }) {
    user.block();

    await this.usersRepository.saveUser({
      user,
    });

    return user;
  }

  protected createUserWallet({ user }: { user: UserEntity }) {
    return new Promise<WalletEntity>((resolve, reject) => {
      this.walletsServiceClient.createWallet(
        {
          userUuid: user.uuid,
        },
        (error, response) => {
          if (error) {
            reject(error);

            return;
          }

          const wallet = new WalletEntity({
            user,
            uuid: response.walletUuid,
          });

          resolve(wallet);
        },
      );
    });
  }

  protected async deleteUserWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }) {
    return wallet;
  }

  public async deleteUser({ user }: { user: UserEntity }) {
    await this.usersRepository.deleteUser({
      user,
    });

    return user;
  }
}
