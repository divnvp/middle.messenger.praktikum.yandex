import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { ProfilePage } from '@/pages/profile';
import { render } from '@/shared/utils/render';
import { v4 as uuid } from 'uuid';

const profilePage = new ProfilePage('div', {
  attr: {
    class: 'profile-page'
  },
  menu: new Menu('div', {
    attr: {
      class: 'col menu'
    }
  }),
  fields: [
    new InputField('div', {
      name: 'email',
      title: 'Почта',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'login',
      title: 'Логин',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'first_name',
      title: 'Имя',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'second_name',
      title: 'Фамилия',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'phone',
      title: 'Телефон',
      id: uuid(),
      type: 'text'
    })
  ],
  links: [
    new Link('div', { url: '/', text: 'Изменить данные' }),
    new Link('div', { url: '/', text: 'Изменить пароль' }),
    new Link('div', { url: '/', text: 'Назад' })
  ]
});

render('#app', profilePage);
