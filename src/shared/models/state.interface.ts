import { IAuth } from '@/shared/models/auth.interface';
import { IUser } from '@/shared/models/user.interface';

export interface IState {
  currentRoute?: string;
  user?: IUser | IAuth;
}
