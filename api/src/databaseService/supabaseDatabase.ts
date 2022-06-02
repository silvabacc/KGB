import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getConfig } from '../getConfig';
import { TimestampData } from './dto';

const { SUPABASE_KEY, SUPABASE_URL } = getConfig();

export class SupabaseService {
  private static supabaseService: SupabaseService;
  private client: SupabaseClient;

  private constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status } = addNewTimestampData;
    await this.client
      .from('timestamps')
      .insert([{ timestamp, username, status }]);
  }

  async getTimestampData(epochStartValue: number, epochEndValue: number) {
    return await this.client
      .from<TimestampData>('transfer_timestamps')
      .select('*')
      .gte('timestamp', epochStartValue)
      .lte('timestamp', epochEndValue)
      .order('timestamp', { ascending: true });
  }

  public static getService() {
    if (!SupabaseService.supabaseService) {
      SupabaseService.supabaseService = new SupabaseService();
    }

    return this.supabaseService;
  }
}
