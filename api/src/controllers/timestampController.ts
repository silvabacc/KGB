import { SupabaseService } from '../databaseService/supabaseService';

import {
  TimeSerie,
  TimeSeriesResponse,
  TimestampData
} from '../databaseService/dto';
import { Frequency, Month, Status, TimestampBody } from '../types';

class TimestampController {
  async postTimestampRoute(body: TimestampBody) {
    const supabaseService = SupabaseService.getService();

    const { username, timestamp, status } = body;

    const timestampData: TimestampData = { username, timestamp, status };

    try {
      await supabaseService.addNewTimestamp(timestampData);
      return { message: 'POSTED' };
    } catch (error: any) {
      return { message: error };
    }
  }

  async getFrequencyRoute(
    frequency: Frequency,
    freqValue: Month | number,
  ) {
    const epochStartValue = Date.UTC(
      2022,
      Object.values(Month).indexOf(freqValue as Month),
      1
    );
    const epochEndValue = Date.UTC(
      2022,
      Object.values(Month).indexOf(freqValue as Month) + 1,
      0
    );

    return this.monthlyData(epochStartValue, epochEndValue);
  }

  async monthlyData(epochStartValue: number, epochEndValue: number) {
    const supabaseService = SupabaseService.getService();

    const timestampResponse = await supabaseService.getTimestampData(
      epochStartValue,
      epochEndValue
    );

    if (timestampResponse.error) {
      return timestampResponse.error;
    }

    const users = new Set<string>();
    timestampResponse.data.map((data) => {
      users.add(data.username);
    });

    let series: TimeSerie[] = [];
    let response: TimeSeriesResponse[] = [];

    users.forEach((name) => {
      const usersData = timestampResponse.data.filter(
        (data) => data.username === name
      );

      let foundConnected = false;
      const timestamps = usersData.reduce((previous, next) => {
        const { status, timestamp } = next;

        if (status === Status.CONNECTED && foundConnected === false) {
          foundConnected = true;
          previous = [...previous, timestamp];
        } else if (status === Status.DISCONNECTED) {
          foundConnected = false;
          previous = [...previous, timestamp];
        }

        return previous;
      }, [] as number[]);

      for (let i = 0; i < timestamps.length; i += 2) {
        if (i === timestamps.length) {
          return;
        }

        const currentDateObj = new Date(timestamps[i]);

        const currentLabel = Date.UTC(
          currentDateObj.getUTCFullYear(),
          currentDateObj.getMonth(),
          currentDateObj.getDate()
        );

        const hours = (timestamps[i + 1] - timestamps[i]) / (1000 * 60 * 60);

        series = [...series, { name, data: [currentLabel, hours] }];
      }
    });

    users.forEach((name) => {
      const userBlock = { name, data: [] as number[][], monthly: 0 };

      const usersData = series.filter((timeseries) => timeseries.name === name);

      usersData.map((serie) => {
        if (!isNaN(serie.data[1])) {
          userBlock.data = [...userBlock.data, serie.data];
          userBlock.monthly += serie.data[1];
        }
      });

      response = [...response, userBlock];
    });

    return response.filter((series) => series.name !== undefined);
  }
}

export default TimestampController;
