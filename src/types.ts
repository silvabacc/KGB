export enum Status {
  CONNECTED = 'CONNECTED',
  DISCONNECTED = 'DISCONNECTED'
}

export interface UserData {
  userId: string;
  username: string;
}

export interface SearchUserResponse {
  message: string;
  data: UserData[]
}