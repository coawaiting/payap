import { randomUUID } from 'node:crypto';
import { UserStatus } from '@payap/users/core/enums/userStatus.enum.ts';

export class UserEntity {
  private status: UserStatus;

  public readonly uuid: string;

  public constructor() {
    this.status = UserStatus.Active;

    this.uuid = randomUUID();
  }

  public activate() {
    this.status = UserStatus.Active;
  }

  public block() {
    this.status = UserStatus.Blocked;
  }

  public isActive() {
    return this.status === UserStatus.Active;
  }

  public isBlocked() {
    return this.status === UserStatus.Blocked;
  }
}
