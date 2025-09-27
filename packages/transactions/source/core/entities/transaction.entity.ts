import { randomUUID } from 'node:crypto';
import type BigNumber from 'bignumber.js';

export abstract class TransactionEntity {
  public readonly amount: BigNumber;

  public readonly uuid: string;

  public constructor({
    amount,
  }: {
    amount: BigNumber;
  }) {
    this.amount = amount;

    this.uuid = randomUUID();
  }
}
