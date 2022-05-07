import { DatabaseService } from '../databaseService/database';
import { TimestampData } from '../databaseService/dto';
import { TimestampBody } from '../types';

class Controller {
  postTimestampRoute(body: TimestampBody) {
    const databaseService = DatabaseService.getDatabaseService();
    const { username, timestamp, status } = body;

    const timestampData: TimestampData = { username, timestamp, status };

    databaseService.addNewTimestamp(timestampData);
    return { message: 'POSTED' };
  }
}

export default Controller;
