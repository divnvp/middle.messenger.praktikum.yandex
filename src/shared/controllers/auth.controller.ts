import { AuthAPI } from '@/shared/api/auth-api';
import { getFormProps } from '@/shared/utils/form-props';
import { IAuth } from '@/shared/models/auth.interface';
import { onErrorPage } from '@/shared/utils/on-error-page';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import store from '@/shared/storage/store';

export class AuthController {
  private authAPI = new AuthAPI();
  private router = new Router();

  async init() {
    this.getUser().then(() => {
      const user = this.getUserFromStorage();

      if (user) {
        if (
          this.router.getCurrentRoute() === Routes.Auth ||
          this.router.getCurrentRoute() === Routes.Registration
        ) {
          this.router.go(Routes.Messenger);
        }
      } else {
        this.router.go(Routes.Auth);
      }
    });
  }

  getUserFromStorage() {
    return store.getState().user;
  }

  async logout() {
    try {
      const response = await this.authAPI.logout();
      onErrorPage(response);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async login(data: HTMLFormElement) {
    try {
      const signed = await this.authAPI.signIn(getFormProps(data) as unknown as IAuth);
      onErrorPage(signed);
      await this.init();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  private async getUser() {
    const response = await this.authAPI.request();
    const user = response.response;

    store.set('user', JSON.parse(user));

    onErrorPage(response);

    return user;
  }
}
