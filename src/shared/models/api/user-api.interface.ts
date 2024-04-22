import { IPassword } from '../password.interafce';
import { IUser } from '../user.interface';

export interface IUserApi {
  update: (data: IUser) => Promise<XMLHttpRequest>;
  updateAvatar: (data: FormData) => Promise<XMLHttpRequest>;
  updatePassword: (passwords: IPassword) => Promise<XMLHttpRequest>;
}
