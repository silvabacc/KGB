import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin/app';
import { TimestampData } from './dto';

export class PostgresDatabaseService {
  private static databaseService: PostgresDatabaseService;

  private constructor() {}

  addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status } = addNewTimestampData;
  }

  async getTimestampData(epochStartValue: number, epochEndValue: number) {}

  public static getDatabaseService() {
    if (!PostgresDatabaseService.databaseService) {
      PostgresDatabaseService.databaseService = new PostgresDatabaseService();
    }

    return this.databaseService;
  }
}
