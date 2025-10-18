import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { ShowWalletRequestMessage } from '@payap/wallets/generated/v1/messages/showWalletRequest.message.ts';
import type { ShowWalletResponseMessage } from '@payap/wallets/generated/v1/messages/showWalletResponse.message.ts';

export class ShowWalletEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    showWalletRequestMessage,
  }: {
    showWalletRequestMessage: ShowWalletRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: showWalletRequestMessage.walletUuid,
      },
    });

    const response: ShowWalletResponseMessage = {
      balance: wallet.showBalance().toString(),
      isFrozen: wallet.isActive(),
      userUuid: wallet.user.uuid,
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
