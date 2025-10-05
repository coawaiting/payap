import type { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import { WalletEntity } from '@payap/wallets/core/entities/wallet.entity.ts';
import { WalletNotFoundException } from '@payap/wallets/core/exceptions/walletNotFound.exception.ts';
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
    const wallet = new WalletEntity({
      user,
    });

    await this.walletsRepository.saveWallet({
      wallet,
    });

    return wallet;
  }

  public async decreaseWalletBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }) {
    wallet.decreaseBalance({
      value,
    });

    await this.walletsRepository.saveWallet({
      wallet,
    });

    return wallet;
  }

  public async deleteWallet({
    wallet,
  }: {
    wallet: WalletEntity;
  }) {
    await this.walletsRepository.deleteWallet({
      wallet,
    });

    return wallet;
  }

  public async increaseWalletBalance({
    value,
    wallet,
  }: {
    value: BigNumber;
    wallet: WalletEntity;
  }) {
    wallet.increaseBalance({
      value,
    });

    await this.walletsRepository.saveWallet({
      wallet,
    });

    return wallet;
  }

  public async reassignWalletBalance({
    fromWallet,
    toWallet,
    value,
  }: {
    fromWallet: WalletEntity;
    toWallet: WalletEntity;
    value: BigNumber;
  }) {
    fromWallet.reassignBalance({
      toWallet,
      value,
    });

    await this.walletsRepository.saveWallet({
      wallet: fromWallet,
    });

    await this.walletsRepository.saveWallet({
      wallet: toWallet,
    });

    return {
      fromWallet,
      toWallet,
    };
  }

  public async showWallet({
    wallet: { uuid },
  }: {
    wallet: {
      uuid: string;
    };
  }) {
    const wallet = await this.walletsRepository.findWallet({
      wallet: {
        uuid,
      },
    });

    if (wallet === null) {
      throw new WalletNotFoundException();
    }

    return wallet;
  }
}
