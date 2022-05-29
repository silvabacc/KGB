import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getConfig } from '../getConfig';
import { TimestampData } from './dto';

const { SUPABASE_KEY, SUPABASE_URL } = getConfig();

export class SupabaseService {
  private static supabaseService: SupabaseService;
  private client: SupabaseClient;

  private constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
    console.log(SUPABASE_KEY, SUPABASE_URL);
  }

  async addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status } = addNewTimestampData;
    const { data, error } = await this.client
      .from('timestamps')
      .insert([{ timestamp, username, status }]);
    console.log(data);
    console.log(error);
  }

  async getTimestampData(epochStartValue: number, epochEndValue: number) {}

  public static getService() {
    if (!SupabaseService.supabaseService) {
      SupabaseService.supabaseService = new SupabaseService();
    }

    return this.supabaseService;
  }
}
