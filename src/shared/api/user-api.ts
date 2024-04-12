import { HTTPTransport } from '@/shared/services/http';
import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';
import { IUserApi } from '@/shared/models/api/user-api.interface';

export class UserAPI implements IUserApi {
  private chatAPIInstance = new HTTPTransport('/user');

  update(data: Partial<IUser>): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.put('/profile', data);
  }

  updateAvatar(data: FormData): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.put('/profile/avatar', data);
  }

  updatePassword(data: Partial<IPassword>): Promise<XMLHttpRequest> {
    return this.chatAPIInstance.put('/password', data);
  }
}

export default new UserAPI();
