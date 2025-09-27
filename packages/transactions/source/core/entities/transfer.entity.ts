import { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';

export class TransferEntity extends TransactionEntity {
  public readonly walletFrom: string;
  public readonly walletTo: string;

  public constructor({
    amount,
    walletFrom,
    walletTo,
  }: {
    amount: BigNumber;
    walletFrom: string;
    walletTo: string;
  }) {
    super({ amount });

    this.walletFrom = walletFrom;
    this.walletTo = walletTo;
  }
}
