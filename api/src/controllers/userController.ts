import { SupabaseService } from '../databaseService/supabaseService';

import {
  UserData
} from '../databaseService/dto';
import { UserBody } from '../types';

class UserController {
  async getSearchUser(userId: string) {
    const supabaseService = SupabaseService.getService();
    return await supabaseService.searchUser(userId);
  }

  async postCreateUser(body: UserBody) {
    const supabaseService = SupabaseService.getService();
    const { userId, username } = body;

    const userData: UserData = { userId, username };

    try {
      await supabaseService.createUser(userData);
      return { message: `User ${username} is created with id ${userId}` };
    } catch (error) {
      return { message: error };
    }
  }
}

export default UserController;
