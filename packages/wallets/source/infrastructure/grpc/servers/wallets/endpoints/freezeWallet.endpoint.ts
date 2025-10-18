import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { FreezeWalletRequestMessage } from '@payap/wallets/generated/v1/messages/freezeWalletRequest.message.ts';
import type { FreezeWalletResponseMessage } from '@payap/wallets/generated/v1/messages/freezeWalletResponse.message.ts';

export class FreezeWalletEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    freezeWalletRequestMessage,
  }: {
    freezeWalletRequestMessage: FreezeWalletRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: freezeWalletRequestMessage.walletUuid,
      },
    });

    await this.walletsService.freezeWallet({
      wallet,
    });

    const response: FreezeWalletResponseMessage = {
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
