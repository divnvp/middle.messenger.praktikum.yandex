import { ChatItem } from '@/components/chat-item';
import { IChat } from '@/shared/models/chat.interface';
import { IUser } from '@/shared/models/user.interface';

export interface IState {
  user?: IUser;
  chats?: IChat[] | ChatItem[];
  currentChat?: IChat;
}
