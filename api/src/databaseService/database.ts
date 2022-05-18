import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, Firestore } from 'firebase-admin/firestore';
import { ServiceAccount } from 'firebase-admin/app';
import { TimeSeries, TimeSeriesResponse, TimestampData } from './dto';
import { getConfig } from '../getConfig';
import { Status } from '../types';

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

    const users = new Set<string>();
    documentData.docs.map((doc) => {
      users.add(doc.data().username);
    });

    let series: TimeSeries[] = [];
    let response: TimeSeriesResponse[] = [];

    users.forEach((name) => {
      const usersData = documentData.docs.filter(
        (doc) => doc.data().username === name
      );

      let foundConnected = false;
      const timestamps = usersData.reduce((previous, next) => {
        const { status, timestamp } = next.data();

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

        const hours = (timestamps[i + 1] - timestamps[i]) / 3.6e6;

        series = [...series, { name, data: [currentLabel, hours] }];
      }
    });

    users.forEach((name) => {
      const userBlock = { name, data: [] as number[][] };

      const usersData = series.filter(
        (timeseries) => timeseries.name === name
      );

      usersData.map((serie) => {
        userBlock.data = [...userBlock.data, serie.data]
      })


      response = [...response, userBlock]
    });

    return response.filter((series) => series.name !== undefined);
  }

  public static getDatabaseService() {
    if (!DatabaseService.databaseService) {
      DatabaseService.databaseService = new DatabaseService();
    }

    return this.databaseService;
  }
}
