import * as storage from './storage.js';
import Handlebars from 'handlebars';
import { pages } from '../consts/pages.js';

function navigate(pages, page) {
  const [name, args] = pages[page];

  const handlebarsCompile = Handlebars.compile(name);
  document.body.innerHTML = handlebarsCompile(args);
  history.pushState('', '', page);
}

export function onClick() {
  document.addEventListener('click', e => {
    e.preventDefault();
    const page = e.target.getAttribute('page');
    if (page) {
      navigate(pages, page);
      storage.setLocalStorageItem('page', page);

      e.stopImmediatePropagation();
    }
  });
}

export function onContentLoaded() {
  document.addEventListener('DOMContentLoaded', () => {
    const windowLocationName = window.location.pathname.replace('/', '');
    const currentLocalName = JSON.stringify(storage.getLocalStorageItem('page'));

    if (!windowLocationName.length) {
      storage.setLocalStorageItem('page', 'auth');
      navigate(pages, 'auth');
    }

    if (currentLocalName.length && windowLocationName !== 'index.html') {
      const parsedPage = Object.keys(pages).find(v => `"${v}"` === currentLocalName);

      if (parsedPage === windowLocationName) {
        navigate(pages, parsedPage);
      } else {
        storage.setLocalStorageItem('page', windowLocationName);
        navigate(pages, windowLocationName);
      }
    } else {
      storage.setLocalStorageItem('page', 'auth');
      navigate(pages, 'auth');
    }
  });
}
