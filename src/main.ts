import { AuthPage } from '@/pages/auth';
import { ChatPage } from '@/pages/chats';
import { ProfileDataPage } from '@/pages/profile-data';
import { RegistrationPage } from '@/pages/registration';
import Router from '@/shared/router/router';

const CURRENT_PAGE = 'current-page';

const router = new Router();

router
  .use('/', AuthPage)
  .use('/sign-up', RegistrationPage)
  .use('/settings', ProfileDataPage)
  .use('/messenger', ChatPage);

document.addEventListener('click', e => {
  const pageRouteName = (e.target as HTMLElement)?.getAttribute('page');
  if (pageRouteName) {
    router.go(pageRouteName);
    localStorage.setItem(CURRENT_PAGE, pageRouteName);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const item = localStorage.getItem(CURRENT_PAGE);
  if (item && window.location.pathname === item) {
    router.go(item);
  } else if (window.location.pathname !== item) {
    router.go(window.location.pathname);
  } else {
    router.go('/');
  }
});
