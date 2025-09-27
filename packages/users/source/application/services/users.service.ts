import { UserEntity } from '@payap/users/core/entities/user.entity.ts';
import type { AbstractUsersRepository } from '@payap/users/core/repositories/users.repository.ts';
import type { AbstractUsersService } from '@payap/users/core/services/users.service.ts';

export class UsersService implements AbstractUsersService {
  private readonly usersRepository: AbstractUsersRepository;

  public constructor({
    usersRepository,
  }: {
    usersRepository: AbstractUsersRepository;
  }) {
    this.usersRepository = usersRepository;
  }

  public async activateUser({ user }: { user: UserEntity }) {
    user.activate();

    await this.usersRepository.saveUser({ user });
  }

  public async blockUser({ user }: { user: UserEntity }) {
    user.block();

    await this.usersRepository.saveUser({ user });
  }

  public async createUser() {
    const user = new UserEntity();

    await this.usersRepository.saveUser({ user });

    return user;
  }

  public async deleteUser({ user }: { user: UserEntity }) {
    await this.usersRepository.deleteUser({ user });
  }
}
