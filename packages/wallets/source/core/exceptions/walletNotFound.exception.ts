export class WalletNotFoundException extends Error {
  public constructor() {
    super('Wallet not found');

    this.name = WalletNotFoundException.name;
  }
}
