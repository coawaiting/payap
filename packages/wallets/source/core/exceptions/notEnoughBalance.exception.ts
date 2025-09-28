export class NotEnoughBalanceException extends Error {
  public constructor() {
    super('Not enough balance');

    this.name = NotEnoughBalanceException.name;
  }
}
