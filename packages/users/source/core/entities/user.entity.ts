import { randomUUID } from 'node:crypto';
import type { WalletEntity } from '@payap/users/core/entities/wallet.entity.ts';
import { UserStatus } from '@payap/users/core/enums/userStatus.enum.ts';

export class UserEntity {
  private status: UserStatus;

  public readonly uuid: string;

  public wallet: WalletEntity | null;

  public constructor() {
    this.status = UserStatus.Active;

    this.uuid = randomUUID();

    this.wallet = null;
  }

  public activate() {
    this.status = UserStatus.Active;

    return this;
  }

  public attachWallet({ wallet }: { wallet: WalletEntity }) {
    this.wallet = wallet;

    return this;
  }

  public block() {
    this.status = UserStatus.Blocked;

    return this;
  }

  public isActive() {
    return this.status === UserStatus.Active;
  }

  public isBlocked() {
    return this.status === UserStatus.Blocked;
  }
}
