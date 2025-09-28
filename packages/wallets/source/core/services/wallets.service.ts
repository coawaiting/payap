import type { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import type { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';
import type BigNumber from 'bignumber.js';

export abstract class AbstractWalletsService {
  abstract createWallet({
    user,
  }: {
    user: UserEntity;
  }): Promise<WalletEntity>;

  abstract decreaseBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }): Promise<WalletEntity>;

  abstract increaseBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }): Promise<WalletEntity>;
}
