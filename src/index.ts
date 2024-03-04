import * as Components from './components/index';
import * as Pages from './pages';
import Handlebars from 'handlebars';

interface IPage {
  [key: string]: unknown[];
}

const pages: IPage = {
  chat: [Pages.ChatPage],
  auth: [Pages.AuthPage],
  registration: [Pages.RegistrationPage],
  profile: [Pages.Profile],
  'profile-data': [Pages.ProfileData],
  'change-password': [Pages.ChangePassword]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page: string) {
  const [source, args] = pages[page];
  const handlebarsFunct = Handlebars.compile(source);
  document.body.innerHTML = handlebarsFunct(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('auth'));

document.addEventListener('click', e => {
  const page = e.target?.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
