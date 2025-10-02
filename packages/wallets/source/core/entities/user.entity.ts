export class UserEntity {
  public readonly uuid: string;

  public constructor({
    uuid,
  }: {
    uuid: string;
  }) {
    this.uuid = uuid;
  }
}
