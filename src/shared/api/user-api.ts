import { HTTPTransport } from '../services/http';
import { IPassword } from '../models/password.interafce';
import { IUser } from '../models/user.interface';
import { IUserApi } from '../models/api/user-api.interface';

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
