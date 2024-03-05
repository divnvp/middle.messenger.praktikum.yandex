import * as Components from '../src/components/index.ts';
import * as Pages from '../src/pages/index.ts';
import Handlebars from 'handlebars';

const pages = {
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

function navigate(page) {
  const [name, args] = pages[page];
  const handlebarsCompile = Handlebars.compile(name);
  document.body.innerHTML = handlebarsCompile(args);
}

document.addEventListener('DOMContentLoaded', () => navigate('auth'));

document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
