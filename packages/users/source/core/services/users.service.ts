import type { UserEntity } from '@payap/users/core/entities/user.entity.ts';

export abstract class AbstractUsersService {
  abstract activateUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<void>;

  abstract blockUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<void>;

  abstract createUser(): Promise<UserEntity>;

  abstract deleteUser({
    user,
  }: {
    user: UserEntity;
  }): Promise<void>;
}
