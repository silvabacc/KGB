export interface TimestampData {
  username: string;
  timestamp: number;
  status: string;
}

export interface TimeSeries {
  name: string;
  data: number[];
}

export interface TimeSeriesResponse {
  name: string;
  data: number[][]
  monthly: number;
}