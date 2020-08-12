import { User } from '../models/user';

export interface Token {
  secret_access_key: string;
  id: string;
  created_date: Date;
  expiry_date: Date;
}
