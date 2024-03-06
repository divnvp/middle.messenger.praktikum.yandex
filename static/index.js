'use strict';

import * as Components from '../src/components/index.js';
import * as Pages from '../src/pages/index.js';
import Handlebars from 'handlebars';

const pages = {
  chat: [Pages.ChatPage],
  auth: [Pages.AuthPage],
  registration: [Pages.RegistrationPage],
  profile: [Pages.Profile],
  'profile-data': [Pages.ProfileData],
  'change-password': [Pages.ChangePassword],
  'error-500': [Pages.Error500],
  'error-4xx': [Pages.Error4xx]
};

Object.entries(Components).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

function navigate(page) {
  const [name, args] = pages[page];
  const handlebarsCompile = Handlebars.compile(name);
  document.body.innerHTML = handlebarsCompile(args);
}

document.addEventListener('DOMContentLoaded', () => {
  if (localStorage.getItem('page').length) {
    const currentPage = JSON.stringify(localStorage.getItem('page'));
    const parsedPage = Object.keys(pages).find(v => `"${v}"` === currentPage);
    history.pushState('', '', parsedPage);
    navigate(parsedPage);
  }
});

document.addEventListener('click', e => {
  const page = e.target.getAttribute('page');
  if (page) {
    navigate(page);
    history.pushState('', '', e.target.getAttribute('page'));
    localStorage.setItem('page', e.target.getAttribute('page'));

    e.preventDefault();
    e.stopImmediatePropagation();
  }
});
