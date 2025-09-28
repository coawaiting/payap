import { WalletsService } from '@payap/wallets/application/services/wallets.service.ts';
import type { AbstractWalletsRepository } from '@payap/wallets/core/repositories/wallets.repository.ts';
import type { AbstractWalletsService } from '@payap/wallets/core/services/wallets.service.ts';
import { WalletsRepository } from '@payap/wallets/infrastructure/repositories/wallets.repository.ts';
import { asClass, createContainer } from 'awilix';

type Cradle = {
  walletsRepository: AbstractWalletsRepository;
  walletsService: AbstractWalletsService;
};

export const globalContainer = createContainer<Cradle>();

globalContainer.register({
  walletsRepository: asClass(WalletsRepository).singleton(),
  walletsService: asClass(WalletsService).singleton(),
});
