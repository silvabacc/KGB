import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import serviceAccount from './gcp-service-account.json';
import { ServiceAccount } from 'firebase-admin/app';
import { TimestampData } from './dto';

export class DatabaseService {
  private static databaseService: DatabaseService;
  db: Firestore;

  private constructor() {
    initializeApp({
      credential: cert(serviceAccount as ServiceAccount)
    });

    this.db = getFirestore();
  }

  addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status } = addNewTimestampData;
    this.db
      .collection('timestamps')
      .doc(username)
      .collection('timestamps')
      .add({ timestamp, status });
  }

  public static getDatabaseService() {
    if (!DatabaseService.databaseService) {
      DatabaseService.databaseService = new DatabaseService();
    }

    return this.databaseService;
  }
}
