import './chat.scss';
import Handlebars from 'handlebars';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
export { default as ChatPage } from './chat.hbs?raw';

Handlebars.registerHelper('chat-page-list', () => [
    { name: 'Андрей', message: 'Изображение', unread: '2' },
    { name: 'Киноклуб', message: 'Go на свалку!' },
    { name: 'Илья', message: 'А у кого ключи от сарая?', unread: '4' },
    { name: 'Вадим', message: 'А у кого ключи от сарая?', unread: '3' },
    { name: 'тет-а-теты', message: 'А у кого ключи от сарая?' }
]);
