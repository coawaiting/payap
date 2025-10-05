import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { ReassignWalletBalanceRequestMessage } from '@payap/wallets/generated/v1/messages/reassignWalletBalanceRequest.message.ts';
import type { ReassignWalletBalanceResponseMessage } from '@payap/wallets/generated/v1/messages/reassignWalletBalanceResponse.message.ts';
import { BigNumber } from 'bignumber.js';

export class ReassignWalletBalanceEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    reassignWalletBalanceRequestMessage,
  }: {
    reassignWalletBalanceRequestMessage: ReassignWalletBalanceRequestMessage;
  }) {
    const fromWallet = await this.walletsService.showWallet({
      wallet: {
        uuid: reassignWalletBalanceRequestMessage.fromWalletUuid,
      },
    });

    const toWallet = await this.walletsService.showWallet({
      wallet: {
        uuid: reassignWalletBalanceRequestMessage.toWalletUuid,
      },
    });

    await this.walletsService.reassignWalletBalance({
      fromWallet,
      toWallet,
      value: BigNumber(
        reassignWalletBalanceRequestMessage.value,
      ),
    });

    const response: ReassignWalletBalanceResponseMessage = {
      fromWalletBalance: fromWallet.showBalance().toString(),
      fromWalletUuid: fromWallet.uuid,
      toWalletBalance: fromWallet.showBalance().toString(),
      toWalletUuid: toWallet.uuid,
    };

    return response;
  }
}
