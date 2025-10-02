import { UserEntity } from '@payap/users/core/entities/user.entity.ts';
import type { WalletEntity } from '@payap/users/core/entities/wallet.entity.ts';
import type { AbstractUsersRepository } from '@payap/users/core/repositories/users.repository.ts';

export abstract class AbstractUsersService {
  protected readonly usersRepository: AbstractUsersRepository;

  public constructor({
    usersRepository,
  }: {
    usersRepository: AbstractUsersRepository;
  }) {
    this.usersRepository = usersRepository;
  }

  abstract activateUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<UserEntity>;

  abstract blockUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<UserEntity>;

  public async createUser() {
    const user = new UserEntity();

    try {
      const wallet = await this.createUserWallet({
        user,
      });

      user.attachWallet({
        wallet,
      });

      await this.usersRepository.saveUser({
        user,
      });
    } catch (error) {
      if (user.wallet) {
        await this.deleteUserWallet({
          wallet: user.wallet,
        });
      }

      await this.usersRepository.deleteUser({
        user,
      });

      throw error;
    }

    return user;
  }

  protected abstract createUserWallet({
    user,
  }: {
    user: UserEntity;
  }): Promise<WalletEntity>;

  protected abstract deleteUserWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }): Promise<WalletEntity>;

  abstract deleteUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<UserEntity>;
}
