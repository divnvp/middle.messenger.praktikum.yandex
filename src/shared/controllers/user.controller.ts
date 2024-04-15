import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import store from '@/shared/storage/store';
import { UserAPI } from '@/shared/api/user-api';

class UserController {
  private readonly userInstanceAPI = new UserAPI();

  async update(userForm: Partial<IUser>) {
    try {
      const response = await this.userInstanceAPI.update(userForm);

      if (response.response) {
        store.set('user', response.response);
        Router.go(Routes.Profile);
      }
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async changePassword(data: IPassword) {
    try {
      const response = await this.userInstanceAPI.updatePassword(data);

      if (response) {
        Router.go(Routes.Profile);
      }
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async changeAvatar(form: FormData) {
    try {
      const response = await this.userInstanceAPI.updateAvatar(form);

      store.set('user', response.response);
    } catch (e) {
      throw new Error(String(e));
    }
  }
}

export default new UserController();
