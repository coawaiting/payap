import { TransactionEntity } from '@payap/transactions/core/entities/transaction.entity.ts';

export class PayoutEntity extends TransactionEntity {
  public readonly provider: 'test';
  public readonly wallet: 'test';

  public constructor({
    amount,
    provider,
    wallet,
  }: {
    amount: BigNumber;
    provider: 'test';
    wallet: 'test';
  }) {
    super({ amount });

    this.provider = provider;
    this.wallet = wallet;
  }
}
