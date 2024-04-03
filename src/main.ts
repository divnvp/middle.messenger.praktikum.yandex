import { AuthPage } from '@/pages/auth';
import { ChatPage } from '@/pages/chats';
import { ProfileDataPage } from '@/pages/profile-data';
import { RegistrationPage } from '@/pages/registration';
import Router from '@/shared/utils/router/router';

const router = new Router();

router
  .use('/', AuthPage)
  .use('/sign-up', RegistrationPage)
  .use('/settings', ProfileDataPage)
  .use('/messenger', ChatPage);

document.addEventListener('click', e => {
  const pageAttr = (e.target as HTMLElement)?.getAttribute('page');
  if (pageAttr) {
    router.go(pageAttr);
  }
});

document.addEventListener('DOMContentLoaded', () => router.go('/'));
