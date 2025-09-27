import { TransactionsService } from '@payap/transactions/application/transactions.service.ts';
import type { AbstractTransactionsRepository } from '@payap/transactions/core/repositories/transactions.repository.ts';
import type { AbstractTransactionsService } from '@payap/transactions/core/services/transactions.service.ts';
import { TransactionsRepository } from '@payap/transactions/infrastructure/repositories/transactions.repository.ts';
import { asClass, createContainer } from 'awilix';

type Cradle = {
  transactionsRepository: AbstractTransactionsRepository;
  transactionsService: AbstractTransactionsService;
};

export const globalContainer = createContainer<Cradle>();

globalContainer.register({
  transactionsRepository: asClass(TransactionsRepository).singleton(),
  transactionsService: asClass(TransactionsService).singleton(),
});
