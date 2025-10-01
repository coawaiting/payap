import { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';

export class TransferEntity extends TransactionEntity {
  public readonly walletFrom: 'test';
  public readonly walletTo: 'test';

  public constructor({
    amount,
    walletFrom,
    walletTo,
  }: {
    amount: BigNumber;
    walletFrom: 'test';
    walletTo: 'test';
  }) {
    super({ amount });

    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
  }
}
