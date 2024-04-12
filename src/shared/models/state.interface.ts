import { IChat } from '@/shared/models/chat.interface';
import { IMessage } from '@/shared/models/message.interface';
import { IUser } from '@/shared/models/user.interface';

export interface IState {
  user: IUser;
  chats: IChat[];
  currentChat: IChat;
  dialogs?: Record<number, IMessage[]>;
}
