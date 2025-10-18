import { WalletsService } from '@payap/wallets/application/services/wallets.service.ts';
import type { Cradle as GlobalContainerCradleType } from '@payap/wallets/infrastructure/containers/global/types/globalContainerCradle.type.ts';
import { CreateWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/createWallet.endpoint.ts';
import { DecreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/decreaseWalletBalance.endpoint.ts';
import { DeleteWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/deleteWallet.endpoint.ts';
import { FreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/freezeWallet.endpoint.ts';
import { IncreaseWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/increaseWalletBalance.endpoint.ts';
import { ReassignWalletBalanceEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/reassignWalletBalance.endpoint.ts';
import { ShowWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/showWallet.endpoint.ts';
import { UnfreezeWalletEndpoint } from '@payap/wallets/infrastructure/grpc/servers/wallets/endpoints/unfreezeWallet.endpoint.ts';
import { WalletsServer } from '@payap/wallets/infrastructure/grpc/servers/wallets/wallets.server.ts';
import { WalletsRepository } from '@payap/wallets/infrastructure/repositories/wallets.repository.ts';
import { asClass, createContainer } from 'awilix';

export const globalContainer =
  createContainer<GlobalContainerCradleType>();

globalContainer.register({
  createWalletEndpoint: asClass(
    CreateWalletEndpoint,
  ).singleton(),
  decreaseWalletBalanceEndpoint: asClass(
    DecreaseWalletBalanceEndpoint,
  ).singleton(),
  deleteWalletEndpoint: asClass(
    DeleteWalletEndpoint,
  ).singleton(),
  freezeWalletEndpoint: asClass(
    FreezeWalletEndpoint,
  ).singleton(),
  increaseWalletBalanceEndpoint: asClass(
    IncreaseWalletBalanceEndpoint,
  ).singleton(),
  reassignWalletBalanceEndpoint: asClass(
    ReassignWalletBalanceEndpoint,
  ).singleton(),
  showWalletEndpoint: asClass(ShowWalletEndpoint).singleton(),
  unfreezeWalletEndpoint: asClass(
    UnfreezeWalletEndpoint,
  ).singleton(),

  walletsRepository: asClass(WalletsRepository).singleton(),

  walletsServer: asClass(WalletsServer).singleton(),

  walletsService: asClass(WalletsService).singleton(),
});
