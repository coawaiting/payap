import type { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';
import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';

export class WalletsRepository
  implements AbstractWalletsRepository
{
  private readonly wallets: Map<string, WalletEntity>;

  public constructor() {
    this.wallets = new Map<string, WalletEntity>();
  }

  public async saveWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }) {
    this.wallets.set(wallet.uuid, wallet);
  }
}
