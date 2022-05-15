import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
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
    this.db
      .collection('timestamps')
      .doc(username)
      .set({ 'Last Updated': new Date().toISOString() });

    return this.db
      .collection('timestamps')
      .doc(username)
      .collection('timestamps')
      .add({ timestamp, status, username });
  }

  async getTimestampData(epochStartValue: number, epochEndValue: number) {
    const documentData = await this.db
      .collectionGroup('timestamps')
      .orderBy('timestamp')
      .startAfter(epochStartValue)
      .endBefore(epochEndValue)
      .get();

    const test = documentData.docs.map((doc) => doc.data());
    return test;
  }

  public static getDatabaseService() {
    if (!DatabaseService.databaseService) {
      DatabaseService.databaseService = new DatabaseService();
    }

    return this.databaseService;
  }
}
