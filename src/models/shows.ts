import { User } from './user';

export interface Show {
  id: number;
  title: string;
  description: string;
  sequences: Array<any>;
  episodic: boolean;
  season: string;
  owner: User;
  trackingCode: string; // dev task to fix them
  hidden: boolean;
  aspect_ratio: string;
  created_date: Date;
  frame_rate: number;
  groups: Array<any>;
}
