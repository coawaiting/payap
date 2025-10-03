import { randomUUID } from 'node:crypto';
import type { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import { NotEnoughBalanceOnWalletException } from '@payap/wallets/core/exceptions/notEnoughBalanceOnWallet.exception.ts';
import BigNumber from 'bignumber.js';

export class WalletEntity {
  private balance: BigNumber;

  public readonly user: UserEntity;
  public readonly uuid: string;

  public constructor({
    user,
  }: {
    user: UserEntity;
  }) {
    this.balance = new BigNumber(0);

    this.user = user;
    this.uuid = randomUUID();
  }

  public decreaseBalance({ value }: { value: BigNumber }) {
    const newBalance = this.balance.minus(value);

    if (newBalance.isLessThan(0)) {
      throw new NotEnoughBalanceOnWalletException();
    }

    this.balance = newBalance;

    return this;
  }

  public increaseBalance({ value }: { value: BigNumber }) {
    this.balance = this.balance.plus(value);

    return this;
  }

  public showBalance() {
    return this.balance;
  }
}
