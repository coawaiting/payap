import { TransactionsService } from '@payap/transactions/application/services/transactions.service.ts';
import type { AbstractTransactionsRepository } from '@payap/transactions/core/repositories/transactions.repository.ts';
import type { AbstractTransactionsService } from '@payap/transactions/core/services/transactions.service.ts';
import { TransactionsServer } from '@payap/transactions/infrastructure/grpc/servers/transactions.server.ts';
import { TransactionsRepository } from '@payap/transactions/infrastructure/repositories/transactions.repository.ts';
import { asClass, createContainer } from 'awilix';

type Cradle = {
  transactionsRepository: AbstractTransactionsRepository;
  transactionsServer: TransactionsServer;
  transactionsService: AbstractTransactionsService;
};

export const globalContainer = createContainer<Cradle>();

globalContainer.register({
  transactionsRepository: asClass(
    TransactionsRepository,
  ).singleton(),
  transactionsServer: asClass(TransactionsServer).singleton(),
  transactionsService: asClass(TransactionsService).singleton(),
});
