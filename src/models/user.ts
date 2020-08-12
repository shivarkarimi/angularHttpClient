import { UserGroup } from '../view-models/user-group.vm';

export class User {
  public id?: number;
  public username: string;
  public password?: string;
  public created_date: Date;
  public email: string;
  public is_admin: boolean;
  public owner_id: number;
  public type: string;
  public thirdParty: boolean;
  public groups: Array<UserGroup>;
  public displayName: string;
  public deleted: boolean;

}
