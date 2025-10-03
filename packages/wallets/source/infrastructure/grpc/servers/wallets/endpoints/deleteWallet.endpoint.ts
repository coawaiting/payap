import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { DeleteWalletRequestMessage } from '@payap/wallets/generated/v1/messages/deleteWalletRequest.message.ts';
import type { DeleteWalletResponseMessage } from '@payap/wallets/generated/v1/messages/deleteWalletResponse.message.ts';

export class DeleteWalletEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    deleteWalletRequestMessage,
  }: {
    deleteWalletRequestMessage: DeleteWalletRequestMessage;
  }) {
    const wallet = await this.walletsService.showWallet({
      wallet: {
        uuid: deleteWalletRequestMessage.walletUuid,
      },
    });

    await this.walletsService.deleteWallet({
      wallet,
    });

    const response: DeleteWalletResponseMessage = {
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
