import type { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';
import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';

export class WalletsRepository
  implements AbstractWalletsRepository
{
  private readonly wallets: Map<string, WalletEntity>;

  public constructor() {
    this.wallets = new Map<string, WalletEntity>();
  }

  public async deleteWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }) {
    this.wallets.delete(wallet.uuid);

    return wallet;
  }

  public async findWallet({
    wallet: { uuid },
  }: {
    wallet: Partial<WalletEntity>;
  }) {
    let wallet: WalletEntity | null = null;

    if (uuid) {
      wallet = this.wallets.get(uuid) ?? null;
    }

    return wallet;
  }

  public async saveWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }) {
    this.wallets.set(wallet.uuid, wallet);

    return wallet;
  }
}
