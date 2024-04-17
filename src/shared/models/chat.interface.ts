import { IUser } from './user.interface';

export interface IChat {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: ILastMessage;
}

interface ILastMessage {
  user: IUser;
  time: string;
  content: string;
}
