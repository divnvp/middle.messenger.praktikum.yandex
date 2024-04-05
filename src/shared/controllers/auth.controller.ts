import { AuthAPI } from '@/shared/api/auth-api';
import { getFormProps } from '@/shared/utils/form-props';
import { IAuth } from '@/shared/models/auth.interface';
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
      this.onErrorPage(response);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  async login(data: HTMLFormElement) {
    try {
      console.log('login');
      const signed = await this.authAPI.signIn(getFormProps(data) as unknown as IAuth);
      console.log(signed);
      this.onErrorPage(signed);
      await this.init();
    } catch (e) {
      throw new Error(String(e));
    }
  }

  private async getUser() {
    const response = await this.authAPI.request();
    const user = response.response;

    store.set('user', user);

    this.onErrorPage(response);

    return user;
  }

  private onErrorPage(response: XMLHttpRequest) {
    if (response.status === 400) {
      this.onNotFoundPage();
    }

    if (response.status === 500) {
      this.onErrorServerPage();
    }

    console.log(response);
  }

  private onNotFoundPage() {
    const isPageExists = Object.values(Routes).find(v => v === this.router.getCurrentRoute());

    if (!isPageExists) {
      this.router.go(Routes.Error400);
    }
  }

  private onErrorServerPage() {
    this.router.go(Routes.Error500);
  }
}
