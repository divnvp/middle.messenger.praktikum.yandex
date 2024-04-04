import { IAuth } from '@/shared/models/auth.interface';
import { IUser } from '@/shared/models/user.interface';

export interface IAuthApi {
  create: (data: IUser) => Promise<XMLHttpRequest>;
  request: () => Promise<XMLHttpRequest>;
  signIn: (data: IAuth) => Promise<XMLHttpRequest>;
  logout: () => Promise<XMLHttpRequest>;
}
