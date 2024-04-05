import { IAuth } from '@/shared/models/auth.interface';
import { IChat } from '@/shared/models/chat.interface';
import { IUser } from '@/shared/models/user.interface';

export interface IState {
  user?: IUser | IAuth;
  chats?: IChat[];
}
