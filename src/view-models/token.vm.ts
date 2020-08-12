import { User } from '../models/user';

export class TokenViewModel {
  public id: string;
  public secretAccessKey: string;
  public createdDate: Date;
  public expiryDate: Date;
  public owner: User;

  isExpired(): boolean {
    const now = new Date();
    return this.expiryDate < now;
  }
}
