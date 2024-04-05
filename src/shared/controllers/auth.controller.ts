import { AuthAPI } from '@/shared/api/auth-api';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import store from '@/shared/storage/store';

export class AuthController {
  private authAPI = new AuthAPI();
  private router = new Router();

  async init() {
    const userFromState = store.getState().user;

    if (!userFromState) {
      this.getUser().then(() => {
        const user = store.getState().user;

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
  }

  async getUser() {
    const response = await this.authAPI.request();
    const user = response.response;

    store.set('user', user);

    if (response.status === 400) {
      this.onNotFoundPage();
    }

    if (response.status === 500) {
      this.onErrorServerPage();
    }

    return user;
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
