import HTTPTransport from '@/shared/services/http';
import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';
import { IUserApi } from '@/shared/models/api/user-api.interface';

const userAPIInstance = new HTTPTransport('/user');

export class UserAPI implements IUserApi {
  update(data: IUser) {
    return userAPIInstance.put('/profile', { data });
  }

  updateAvatar(avatar: string) {
    return userAPIInstance.put('/profile/avatar', { data: { avatar } });
  }

  updatePassword(passwords: IPassword) {
    return userAPIInstance.put('/password', {
      data: {
        ...passwords
      }
    });
  }
}
