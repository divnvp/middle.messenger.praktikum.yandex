import { Button } from '@/components/button';
import { ChangePasswordPage } from '@/pages/change-password';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { render } from '@/shared/utils/render';
import { v4 as uuid } from 'uuid';

const changePasswordPage = new ChangePasswordPage('div', {
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
      name: 'old_password',
      title: 'Старый пароль',
      id: uuid(),
      type: 'password'
    }),
    new InputField('div', {
      name: 'new_password',
      title: 'Новый пароль',
      id: uuid(),
      type: 'password'
    }),
    new InputField('div', {
      name: 'password_again',
      title: 'Повторите пароль',
      id: uuid(),
      type: 'password'
    })
  ],
  link: new Link('div', { url: '/', text: 'Назад' }),
  button: new Button('div', {
    attr: { class: 'profile-page__button' },
    type: 'submit',
    text: 'Сохранить'
  })
});

render('#app', changePasswordPage);
