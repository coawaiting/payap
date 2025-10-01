import type { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';

export abstract class AbstractTransactionsRepository {
  abstract saveTransaction({
    transaction,
  }: {
    transaction: TransactionEntity;
  }): Promise<TransactionEntity>;
}
