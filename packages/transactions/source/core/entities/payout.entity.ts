import { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';

export class PayoutEntity extends TransactionEntity {
  public readonly provider: string;
  public readonly wallet: string;

  public constructor({
    amount,
    provider,
    wallet,
  }: {
    amount: BigNumber;
    provider: string;
    wallet: string;
  }) {
    super({ amount });

    this.provider = provider;
    this.wallet = wallet;
  }
}
