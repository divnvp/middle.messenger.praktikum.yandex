import { AuthController } from '@/shared/controllers/auth.controller';
import { AuthPage } from '@/pages/auth';
import { ChangePasswordPage } from '@/pages/change-password';
import { ChatPage } from '@/pages/chats';
import { Error4xxPage } from '@/pages/error-4xx';
import { Error500Page } from '@/pages/error-500';
import { ProfileDataPage } from '@/pages/profile-data';
import { ProfilePage } from '@/pages/profile';
import { RegistrationPage } from '@/pages/registration';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';

const router = new Router();
const authController = new AuthController();

router
  .use(Routes.Auth, AuthPage)
  .use(Routes.Registration, RegistrationPage)
  .use(Routes.Settings, ProfilePage)
  .use(Routes.ChangePassword, ChangePasswordPage)
  .use(Routes.ChangeUserData, ProfileDataPage)
  .use(Routes.Messenger, ChatPage)
  .use(Routes.Error400, Error4xxPage)
  .use(Routes.Error500, Error500Page)
  .start();

document.addEventListener('click', e => {
  const pageRouteName = (e.target as HTMLElement)?.getAttribute('page');
  if (pageRouteName) {
    if (pageRouteName === Routes.Back) {
      router.previous();
      return;
    }

    router.go(pageRouteName);
  }
});

document.addEventListener('DOMContentLoaded', () => authController.init());
