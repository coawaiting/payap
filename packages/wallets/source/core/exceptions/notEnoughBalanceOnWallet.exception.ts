export class NotEnoughBalanceOnWalletException extends Error {
  public constructor() {
    super('Not enough balance on wallet');

    this.name = NotEnoughBalanceOnWalletException.name;
  }
}
