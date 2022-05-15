export enum Status {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

export enum Frequency {
  MONTHLY = 'monthly',
  WEEKLY = 'weekly'

}

export enum Month {
  Jan = 'Jan',
  Feb = 'Feb',
  Mar = 'Mar',
  Apr = 'Apr',
  May = 'May',
  Jun = 'Jun',
  Jul = 'Jul',
  Aug = 'Aug',
  Sept = 'Sept',
  Oct = 'Oct',
  Nov = 'Nov',
  Dev = 'Dev',
}

export interface TimestampBody {
  username: string;
  timestamp: number;
  status: Status;
}
