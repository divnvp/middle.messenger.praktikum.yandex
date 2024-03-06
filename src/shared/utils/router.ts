import Handlebars from 'handlebars';
import { pages } from '../consts/pages';

function navigate(page: string) {
  const [name, args] = pages[page];

  const handlebarsCompile = Handlebars.compile(name);
  document.body.innerHTML = handlebarsCompile(args);
  // history.pushState('', '', page);
}

export function onClick() {
  document.addEventListener('click', (e: MouseEvent) => {
    const page = (e.target as Element)?.getAttribute('page');
    if (page) {
      navigate(page);
      e.preventDefault();
      e.stopImmediatePropagation();
    }
  });
}

export function onContentLoaded() {
  document.addEventListener('DOMContentLoaded', () => {
    navigate('auth');
  });
}
