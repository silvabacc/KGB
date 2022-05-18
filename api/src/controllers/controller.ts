import { FirebaseError } from 'firebase-admin/app';
import { DatabaseService } from '../databaseService/database';
import { TimestampData } from '../databaseService/dto';
import { Frequency, Month, TimestampBody } from '../types';

class Controller {
  async postTimestampRoute(body: TimestampBody) {
    const databaseService = DatabaseService.getDatabaseService();
    const { username, timestamp, status } = body;

    const timestampData: TimestampData = { username, timestamp, status };

    try {
      await databaseService.addNewTimestamp(timestampData);
      return { message: 'POSTED' };
    } catch (error: FirebaseError | any) {
      return { message: error.message };
    }
  }

  async getFrequencyRoute(frequency: Frequency, freqValue: Month | number) {
    const databaseService = DatabaseService.getDatabaseService();

    if (frequency === Frequency.MONTHLY) {
      const epochStartValue = Date.UTC(
        2022,
        Object.values(Month).indexOf(freqValue as Month),
        1
      );
      const epochEndValue = Date.UTC(
        2022,
        Object.values(Month).indexOf(freqValue as Month),
        28
      );

      const data = await databaseService.getTimestampData(
        epochStartValue,
        epochEndValue
      );
      return { data };
    }
  }
}

export default Controller;
