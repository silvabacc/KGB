export interface TimestampData {
  username: string;
  userId: string;
  timestamp: number;
  status: string;
}

export interface TimeSerie {
  name: string;
  data: number[];
}

export interface TimeSeriesResponse {
  name: string;
  data: number[][]
  monthly: number;
}