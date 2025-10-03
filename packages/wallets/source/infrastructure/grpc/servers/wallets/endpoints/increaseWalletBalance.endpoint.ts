import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { IncreaseWalletBalanceRequestMessage } from '@payap/wallets/generated/v1/messages/increaseWalletBalanceRequest.message.ts';
import type { IncreaseWalletBalanceResponseMessage } from '@payap/wallets/generated/v1/messages/increaseWalletBalanceResponse.message.ts';
import { BigNumber } from 'bignumber.js';

export class IncreaseWalletBalanceEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    increaseWalletBalanceRequestMessage,
  }: {
    increaseWalletBalanceRequestMessage: IncreaseWalletBalanceRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: increaseWalletBalanceRequestMessage.walletUuid,
      },
    });

    await this.walletsService.increaseWalletBalance({
      value: BigNumber(
        increaseWalletBalanceRequestMessage.value,
      ),
      wallet,
    });

    const response: IncreaseWalletBalanceResponseMessage = {
      balance: wallet.showBalance().toString(),
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
