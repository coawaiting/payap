import type { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';
import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';

export class WalletsService implements AbstractWalletsService {
  private readonly walletsRepository: AbstractWalletsRepository;

  public constructor({
    walletsRepository,
  }: {
    walletsRepository: AbstractWalletsRepository;
  }) {
    this.walletsRepository = walletsRepository;
  }

  public async createWallet({ user }: { user: UserEntity }) {
    const wallet = new WalletEntity({ user });

    await this.walletsRepository.saveWallet({ wallet });

    return wallet;
  }

  public async decreaseBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }) {
    wallet.decreaseBalance({ value });

    await this.walletsRepository.saveWallet({ wallet });

    return wallet;
  }

  public async increaseBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }) {
    wallet.increaseBalance({ value });

    await this.walletsRepository.saveWallet({ wallet });

    return wallet;
  }
}
