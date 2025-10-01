import type { UserEntity } from '@payap/users/core/entities/user.entity.ts';
import type { AbstractUsersRepository } from '@payap/users/core/repositories/users.repository.ts';

export class UsersRepository
  implements AbstractUsersRepository
{
  private users = new Map<string, UserEntity>();

  public async deleteUser({ user }: { user: UserEntity }) {
    this.users.delete(user.uuid);

    return user;
  }

  public async saveUser({ user }: { user: UserEntity }) {
    this.users.set(user.uuid, user);

    return user;
  }
}
