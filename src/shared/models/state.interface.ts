import { IChat } from './chat.interface';
import { IMessage } from './message.interface';
import { IUser } from './user.interface';

export interface IState {
  user: IUser;
  chats: IChat[];
  currentChat: IChat;
  currentChatUsers: IUser[];
  dialogs?: Record<number, IMessage[]>;
}
