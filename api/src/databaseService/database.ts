import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import serviceAccount from './gcp-service-account.json';
import { ServiceAccount } from 'firebase-admin/app';
import { TimestampData } from './dto';
import { getConfig } from '../getConfig';

const { GCP_PROJECT_ID, GCP_PRIVATE_KEY, GCP_CLIENT_EMAIL } = getConfig();

export class DatabaseService {
  private static databaseService: DatabaseService;
  db: Firestore;

  private constructor() {
    initializeApp({
      credential: cert({
        projectId: GCP_PROJECT_ID,
        privateKey: GCP_PRIVATE_KEY,
        clientEmail: GCP_CLIENT_EMAIL
      } as ServiceAccount)
    });

    this.db = getFirestore();
  }

  addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status } = addNewTimestampData;
    return this.db
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
