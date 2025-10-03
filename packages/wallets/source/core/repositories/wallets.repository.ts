import type { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';

export abstract class AbstractWalletsRepository {
  abstract deleteWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }): Promise<WalletEntity>;

  abstract findWallet({
    wallet,
  }: {
    wallet: Partial<WalletEntity>;
  }): Promise<WalletEntity | null>;

  abstract saveWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }): Promise<WalletEntity>;
}
