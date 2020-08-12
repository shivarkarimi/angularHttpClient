import { User } from '../models/user';

/**
 * The model represents a group of users.
 */
export class UserGroup {
  public id?: number;
  public title: string;
  public members?: User[] = [];
}
