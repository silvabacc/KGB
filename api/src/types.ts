export enum Status {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

export interface TimestampBody {
  username: string;
  timestamp: number;
  status: Status;
}
