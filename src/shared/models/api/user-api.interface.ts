import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';

export interface IUserApi {
  update: (data: IUser) => Promise<XMLHttpRequest>;
  updateAvatar: (avatar: string) => Promise<XMLHttpRequest>;
  updatePassword: (passwords: IPassword) => Promise<XMLHttpRequest>;
}
