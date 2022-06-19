import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { getConfig } from '../getConfig';
import { TimestampData, UserData } from './dto';

const { SUPABASE_KEY, SUPABASE_URL } = getConfig();

export class SupabaseService {
  private static supabaseService: SupabaseService;
  private client: SupabaseClient;

  private constructor() {
    this.client = createClient(SUPABASE_URL, SUPABASE_KEY);
  }

  async addNewTimestamp(addNewTimestampData: TimestampData) {
    const { username, timestamp, status, userId } = addNewTimestampData;
    await this.client
      .from('timestamps')
      .insert([{ timestamp, username, status, userId }]);
  }

  async getTimestampData(epochStartValue: number, epochEndValue: number) {
    return await this.client
      .from<TimestampData>('timestamps')
      .select('*')
      .gte('timestamp', epochStartValue)
      .lte('timestamp', epochEndValue)
      .order('timestamp', { ascending: true });
  }

  async searchUser(userId: string) {
    const response = await this.client
      .from<UserData>('users')
      .select('userId,username')
      .eq('userId', userId);
    if (response.data?.length === 0) {
      return { message: 'User not found', data: [] };
    }
    return { data: response.data || [] };
  }

  async createUser(userData: UserData) {
    const { userId, username } = userData;
    await this.client.from('users').insert([{ userId, username }]);
  }

  public static getService() {
    if (!SupabaseService.supabaseService) {
      SupabaseService.supabaseService = new SupabaseService();
    }

    return this.supabaseService;
  }
}
