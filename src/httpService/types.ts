import { Status } from '../types';

export interface TimestampBody {
  username: string;
  timestamp: number;
  userId: string;
  status: Status;
}
