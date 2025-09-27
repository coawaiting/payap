import type { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';
import type { TransactionTypeEnum } from '@payap/transactions/core/enums/transactionType.enum.ts';

export abstract class AbstractTransactionsService {
  abstract createTransaction({
    amount,
    transactionType,
  }: {
    amount: BigNumber;
    transactionType: TransactionTypeEnum;
  }): Promise<TransactionEntity>;
}
