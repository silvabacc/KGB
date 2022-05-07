import { FirebaseError } from 'firebase-admin/app';
import { DatabaseService } from '../databaseService/database';
import { TimestampData } from '../databaseService/dto';
import { TimestampBody } from '../types';

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
}

export default Controller;
