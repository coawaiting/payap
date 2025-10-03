import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import type { CreateWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/createWallet.endpoint.ts';
import type { DeleteWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/deleteWallet.endpoint.ts';
import type { WalletsServer } from '@payap/wallets/infrastructure/grpc/servers/wallets/wallets.server.ts';

export type Cradle = {
  createWalletEndpoint: CreateWalletEndpoint;
  deleteWalletEndpoint: DeleteWalletEndpoint;

  walletsRepository: AbstractWalletsRepository;

  walletsServer: WalletsServer;

  walletsService: AbstractWalletsService;
};
