import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin/app';
import { TimestampData } from './dto';
import { getConfig } from '../getConfig';

const { GCP_PROJECT_ID, GCP_PRIVATE_KEY, GCP_CLIENT_EMAIL } = getConfig();

export class FirebaseDatabaseService {
  private static databaseService: FirebaseDatabaseService;
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
    const data = this.db
      .collectionGroup('timestamps')
      .orderBy('timestamp')
      .startAfter(epochStartValue)
      .endBefore(epochEndValue)
      .get();

    return data;
  }

  public static getDatabaseService() {
    if (!FirebaseDatabaseService.databaseService) {
      FirebaseDatabaseService.databaseService = new FirebaseDatabaseService();
    }

    return this.databaseService;
  }
}
