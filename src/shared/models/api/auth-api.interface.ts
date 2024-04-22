import { IAuth } from '../auth.interface';
import { IUser } from '../user.interface';

export interface IAuthApi {
  create: (data: IUser) => Promise<XMLHttpRequest>;
  request: () => Promise<XMLHttpRequest>;
  signIn: (data: IAuth) => Promise<XMLHttpRequest>;
  logout: () => Promise<XMLHttpRequest>;
}
