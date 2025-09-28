import type { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';
import type { AbstractTransactionsRepository } from '@payap/transactions/core/repositories/transactions.repository.ts';

export class TransactionsRepository
  implements AbstractTransactionsRepository
{
  private transactions = new Map<string, TransactionEntity>();

  public async saveTransaction({
    transaction,
  }: {
    transaction: TransactionEntity;
  }) {
    this.transactions.set(transaction.uuid, transaction);
  }
}
