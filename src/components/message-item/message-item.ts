import './message-item.scss';
import Handlebars from 'handlebars';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export { default as MessageItem } from './message-item.hbs?raw';

Handlebars.registerHelper('ifEquals', (v1, v2, options) => {
  if (v1 === v2) {
    return options.fn(this);
  }
  return options.inverse(this);
});
