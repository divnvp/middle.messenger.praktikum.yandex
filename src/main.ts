import { AuthPage } from '@/pages/auth';
import Block from '@/shared/utils/block';
import ChangePasswordPage from '@/pages/change-password/change-password';
import ChatPage from '@/pages/chats';
import ChatPanelPage from '@/pages/chat-panel-page';
import { Error4xxPage } from '@/pages/error-4xx';
import { Error500Page } from '@/pages/error-500';
import ProfileDataPage from '@/pages/profile-data';
import ProfilePage from '@/pages/profile';
import { RegistrationPage } from '@/pages/registration';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';

Router.use(Routes.Auth, AuthPage as typeof Block)
  .use(Routes.ChatPanel, ChatPanelPage as typeof Block)
  .use(Routes.Registration, RegistrationPage as typeof Block)
  .use(Routes.Profile, ProfilePage as typeof Block)
  .use(Routes.ChangeProfileData, ProfileDataPage as typeof Block)
  .use(Routes.ChangePassword, ChangePasswordPage as typeof Block)
  .use(Routes.Messenger, ChatPage as typeof Block)
  .use(Routes.Error400, Error4xxPage as typeof Block)
  .use(Routes.Error500, Error500Page as typeof Block)
  .start();
