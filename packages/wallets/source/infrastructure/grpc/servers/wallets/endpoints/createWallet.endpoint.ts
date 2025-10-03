import { UserEntity } from '@payap/wallets/core/entities/user.entity.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { CreateWalletRequestMessage } from '@payap/wallets/generated/v1/messages/createWalletRequest.message.ts';
import type { CreateWalletResponseMessage } from '@payap/wallets/generated/v1/messages/createWalletResponse.message.ts';

export class CreateWalletEndpoint {
  private readonly walletsService: AbstractWalletsService;

  public constructor({
    walletsService,
  }: {
    walletsService: AbstractWalletsService;
  }) {
    this.walletsService = walletsService;
  }

  public async handle({
    createWalletRequestMessage,
  }: {
    createWalletRequestMessage: CreateWalletRequestMessage;
  }) {
    const user = new UserEntity({
      uuid: createWalletRequestMessage.userUuid,
    });

    const wallet = await this.walletsService.createWallet({
      user,
    });

    const response: CreateWalletResponseMessage = {
      walletUuid: wallet.uuid,
    };

    return response;
  }
}
