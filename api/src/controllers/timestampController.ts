import { SupabaseService } from '../databaseService/supabaseService';

import {
  TimeSerie,
  TimeSeriesResponse,
  TimestampData,
  UserData
} from '../databaseService/dto';
import { Frequency, Month, Status, TimestampBody, UserBody } from '../types';

class TimestampController {
  async postTimestampRoute(body: TimestampBody) {
    const supabaseService = SupabaseService.getService();

    const { username, timestamp, status, userId } = body;

    const timestampData: TimestampData = {
      username,
      timestamp,
      userId,
      status
    };

    try {
      await supabaseService.addNewTimestamp(timestampData);
      return { message: 'POSTED' };
    } catch (error) {
      return { message: error };
    }
  }

  async getFrequencyRoute(frequency: Frequency, freqValue: Month | number) {
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

    //Gather all the User IDs
    const userIds = new Set<string>();
    timestampResponse.data.map((data) => {
      userIds.add(data.userId);
    });

    //Search for the user based on ID and return User Data
    let users: UserData[] = [];
    for (const id of userIds) {
      const user = await supabaseService.searchUser(id);
      if (user.data.length === 0) {
        continue
      } else {
        users = [
          ...users,
          {
            username: user.data[0].username,
            userId: user.data[0].userId
          }
        ];
      }
    }

    let series: TimeSerie[] = [];
    let response: TimeSeriesResponse[] = [];

    users.forEach((user) => {
      const usersData = timestampResponse.data.filter((data) => {
        return data.userId === user.userId;
      });

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

        series = [
          ...series,
          {
            name: user.username,
            userId: user.userId,
            data: [currentLabel, hours]
          }
        ];
      }
    });

    users.forEach((user) => {
      const userBlock = {
        name: user.username,
        data: [] as number[][],
        monthly: 0
      };

      const usersData = series.filter(
        (timeseries) => timeseries.userId === user.userId
      );

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

  async getSearchUser(userId: string) {
    const supabaseService = SupabaseService.getService();
    return await supabaseService.searchUser(userId);
  }

  async postCreateUser(body: UserBody) {
    const supabaseService = SupabaseService.getService();
    const { userId, username } = body;

    const userData: UserData = { userId, username };

    try {
      await supabaseService.createUser(userData);
      return { message: `User ${username} is created with id ${userId}` };
    } catch (error) {
      return { message: error };
    }
  }
}

export default TimestampController;
