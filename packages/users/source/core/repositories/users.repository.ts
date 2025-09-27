import type { UserEntity } from '@payap/users/core/entities/user.entity.ts';

export abstract class AbstractUsersRepository {
  abstract deleteUser({ user }: { user: UserEntity }): Promise<void>;

  abstract saveUser({ user }: { user: UserEntity }): Promise<void>;
}
