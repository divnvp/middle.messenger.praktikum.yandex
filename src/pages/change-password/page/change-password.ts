import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { ProfileDataPage } from '@/pages/profile-data';
import { render } from '@/shared/utils/render';
import { v4 as uuid } from 'uuid';

const profilePage = new ProfileDataPage('div', {
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
      name: 'oldPassword',
      title: 'Старый пароль',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'newPassword',
      title: 'Новый пароль',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      name: 'passwordAgain',
      title: 'Повторите пароль',
      id: uuid(),
      type: 'text'
    })
  ],
  link: new Link('div', { url: '/', text: 'Назад' }),
  button: new Button('div', { attr: { class: 'profile-page__button' }, text: 'Сохранить' })
});

render('#app', profilePage);
