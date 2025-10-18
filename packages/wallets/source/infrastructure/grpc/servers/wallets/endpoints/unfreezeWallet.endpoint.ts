import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { UnfreezeWalletRequestMessage } from '@payap/wallets/generated/v1/messages/unfreezeWalletRequest.message.ts';
import type { UnfreezeWalletResponseMessage } from '@payap/wallets/generated/v1/messages/unfreezeWalletResponse.message.ts';

export class UnfreezeWalletEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    unfreezeWalletRequestMessage,
  }: {
    unfreezeWalletRequestMessage: UnfreezeWalletRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: unfreezeWalletRequestMessage.walletUuid,
      },
    });

    await this.walletsService.unfreezeWallet({
      wallet,
    });

    const response: UnfreezeWalletResponseMessage = {
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
