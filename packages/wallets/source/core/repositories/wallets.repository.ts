import type { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';

export abstract class AbstractWalletsRepository {
  abstract saveWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }): Promise<WalletEntity>;
}
