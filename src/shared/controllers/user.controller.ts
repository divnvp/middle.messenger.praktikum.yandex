import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';
import { onErrorPage } from '@/shared/utils/on-error-page';
import store from '@/shared/storage/store';
import { UserAPI } from '@/shared/api/user-api';

export class UserController {
  private userAPI = new UserAPI();

  async updateData(data: IUser) {
    try {
      const response = await this.userAPI.update(data);
      onErrorPage(response);
      store.set('user', JSON.parse(response.response));
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async changePassword(data: IPassword) {
    try {
      console.log(data);
      const response = await this.userAPI.updatePassword(data);
      onErrorPage(response);
    } catch (e) {
      throw new Error(String(e));
    }
  }
}
