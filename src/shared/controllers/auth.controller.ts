import { AuthAPI } from '@/shared/api/auth-api';
import { IAuth } from '@/shared/models/auth.interface';
import { isUserInSystemOrError } from '@/shared/utils/is-user-in-system-or-error';
import { IUser } from '@/shared/models/user.interface';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import SocketController from '@/shared/controllers/socket.controller';
import store from '@/shared/storage/store';

class AuthController {
  private readonly authInstanceAPI = new AuthAPI();

  get isUserNotAuthorize(): boolean {
    return Router.currentRoute === Routes.Auth || Router.currentRoute === Routes.Registration;
  }

  get isPageError(): boolean {
    return Router.currentRoute === Routes.Error400 || Router.currentRoute === Routes.Error500;
  }

  get isUserExists() {
    return Object.values(store.getState().user).length;
  }

  async init() {
    const currentUser = store.getState().user;
    const isUserExists = Object.values(currentUser).length;

    try {
      if (!isUserExists) {
        const response = await this.getUser();

        if (response) {
          const user = store.getState().user;
          if (!user.reason) {
            if (this.isPageError || this.isUserNotAuthorize) {
              Router.go(Routes.ChatPanel);
            }
          } else {
            Router.go(Routes.Auth);
          }
        }
      }
    } catch (e) {
      Router.go(Routes.Auth);
    }
  }

  async auth(data: IAuth) {
    try {
      const response = await this.authInstanceAPI.signIn(data);

      if (this.isStatusSuccess(response)) {
        Router.go(Routes.ChatPanel);
      } else {
        Router.go(Routes.Auth);
      }

      return response;
    } catch (e) {
      isUserInSystemOrError(e);
    }

    return null;
  }

  async getUser() {
    try {
      const response = await this.authInstanceAPI.request();
      const user = response.response;
      store.set('user', user);

      return user;
    } catch (e) {
      throw new Error(e as string);
    }
  }

  async onRegistration(data: IUser) {
    try {
      const response = await this.authInstanceAPI.create(data);
      if (this.isStatusSuccess(response)) {
        Router.go(Routes.ChatPanel);
      } else {
        Router.go(Routes.Registration);
      }
    } catch (e) {
      isUserInSystemOrError(e);
    }
  }

  async logout() {
    try {
      SocketController.socketRemove();
      await this.authInstanceAPI.logout();
      Router.go(Routes.Auth);
    } catch (e) {
      throw new Error(String(e));
    }
  }

  private isStatusSuccess(response: XMLHttpRequest) {
    return response.status >= 200 || response.status <= 300;
  }
}

export default new AuthController();
