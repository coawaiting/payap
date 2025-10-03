import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { DecreaseWalletBalanceRequestMessage } from '@payap/wallets/generated/v1/messages/decreaseWalletBalanceRequest.message.ts';
import type { DecreaseWalletBalanceResponseMessage } from '@payap/wallets/generated/v1/messages/decreaseWalletBalanceResponse.message.ts';
import { BigNumber } from 'bignumber.js';

export class DecreaseWalletBalanceEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    decreaseWalletBalanceRequestMessage,
  }: {
    decreaseWalletBalanceRequestMessage: DecreaseWalletBalanceRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: decreaseWalletBalanceRequestMessage.walletUuid,
      },
    });

    await this.walletsService.decreaseWalletBalance({
      value: BigNumber(
        decreaseWalletBalanceRequestMessage.value,
      ),
      wallet,
    });

    const response: DecreaseWalletBalanceResponseMessage = {
      balance: wallet.showBalance().toString(),
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
