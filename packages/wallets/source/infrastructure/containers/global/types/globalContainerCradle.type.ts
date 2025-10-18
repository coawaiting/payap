import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { CreateWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/createWallet.endpoint.ts';
import type { DecreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/decreaseWalletBalance.endpoint.ts';
import type { DeleteWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/deleteWallet.endpoint.ts';
import type { FreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/freezeWallet.endpoint.ts';
import type { IncreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/increaseWalletBalance.endpoint.ts';
import type { ReassignWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/reassignWalletBalance.endpoint.ts';
import type { ShowWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/showWallet.endpoint.ts';
import type { UnfreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/unfreezeWallet.endpoint.ts';
import type { WalletsServer } from '@payap/wallets/infrastructure/grpc/servers/wallets/wallets.server.ts';

export type Cradle = {
  createWalletEndpoint: CreateWalletEndpoint;
  decreaseWalletBalanceEndpoint: DecreaseWalletBalanceEndpoint;
  deleteWalletEndpoint: DeleteWalletEndpoint;
  freezeWalletEndpoint: FreezeWalletEndpoint;
  increaseWalletBalanceEndpoint: IncreaseWalletBalanceEndpoint;
  reassignWalletBalanceEndpoint: ReassignWalletBalanceEndpoint;
  showWalletEndpoint: ShowWalletEndpoint;
  unfreezeWalletEndpoint: UnfreezeWalletEndpoint;

  walletsRepository: AbstractWalletsRepository;

  walletsServer: WalletsServer;

  walletsService: AbstractWalletsService;
};
