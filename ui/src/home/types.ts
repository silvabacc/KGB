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

export interface TimestampsResponse {
  data: Serie[]
}

export interface Serie {
  name: string;
  date: number;
  hours: number
}
