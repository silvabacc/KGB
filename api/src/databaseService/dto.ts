export interface TimestampData {
  username: string;
  userId: string;
  timestamp: number;
  status: string;
  dateText: string;
}

export interface UserData {
  username: string;
  userId: string;
}

export interface TimeSerie {
  name: string;
  userId: string;
  data: number[];
}

export interface TimeSeriesResponse {
  name: string;
  data: number[][];
  monthly: number;
}
