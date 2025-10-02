import type { UserEntity } from '@payap/users/core/entities/user.entity.ts';

export class WalletEntity {
  public readonly user: UserEntity;
  public readonly uuid: string;

  public constructor({
    user,
    uuid,
  }: {
    user: UserEntity;
    uuid: string;
  }) {
    this.user = user;
    this.uuid = uuid;
  }
}
