import { PayoutEntity } from '@payap/transactions/core/entities/payout.entity.ts';
import { TopupEntity } from '@payap/transactions/core/entities/topup.entity.ts';
import type { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';
import { TransferEntity } from '@payap/transactions/core/entities/transfer.entity.ts';
import { TransactionTypeEnum } from '@payap/transactions/core/enums/transactionType.enum.ts';
import type { AbstractTransactionsRepository } from '@payap/transactions/core/repositories/transactions.repository.ts';
import type { AbstractTransactionsService } from '@payap/transactions/core/services/transactions.service.ts';

export class TransactionsService
  implements AbstractTransactionsService
{
  private readonly transactionsRepository: AbstractTransactionsRepository;

  public constructor({
    transactionsRepository,
  }: {
    transactionsRepository: AbstractTransactionsRepository;
  }) {
    this.transactionsRepository = transactionsRepository;
  }

  public async createTransaction({
    amount,
    transactionType,
  }: {
    amount: BigNumber;
    transactionType: TransactionTypeEnum;
  }) {
    let transaction: TransactionEntity;

    switch (transactionType) {
      case TransactionTypeEnum.Payout: {
        transaction = new PayoutEntity({
          amount,
          provider: 'local',
          wallet: 'local',
        });

        break;
      }
      case TransactionTypeEnum.Topup: {
        transaction = new TopupEntity({
          amount,
          provider: 'local',
          wallet: 'local',
        });

        break;
      }
      case TransactionTypeEnum.Transfer: {
        transaction = new TransferEntity({
          amount,
          walletFrom: 'local',
          walletTo: 'local',
        });

        break;
      }
    }

    await this.transactionsRepository.saveTransaction({
      transaction,
    });

    return transaction;
  }
}
