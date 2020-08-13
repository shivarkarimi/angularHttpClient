import { User } from '../models/user';

export interface Token {
  id: string;
  secret_access_key: string;
  created_date: Date;
  expiry_date: Date;
  owner: User
}
