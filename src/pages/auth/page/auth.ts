import { AuthPage } from '@/pages/auth';
import { Button } from '@/components/button';
import { InputWithIconField } from '@/components/input-field-with-icon';
import { Link } from '@/components/link';
import { render } from '@/shared/utils/render';
import { Text } from '@/components/text';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

const authPage = new AuthPage('div', {
  title: new Title('div', { attr: { class: 'page-title' }, title: 'Добро пожаловать!' }),
  text: new Text('div', { text: 'Пожалуйста, введите ваши данные' }),
  fields: [
    new InputWithIconField('div', {
      name: 'login',
      title: 'Логин',
      id: uuid(),
      type: 'text',
      icon: '../../icons/mail-icon.png'
    }),
    new InputWithIconField('div', {
      name: 'password',
      title: 'Пароль',
      id: uuid(),
      type: 'password',
      icon: '../../icons/eye-icon.png'
    })
  ],
  button: new Button('div', {
    type: 'submit',
    text: 'Войти'
  }),
  link: new Link('a', {
    url: '/',
    text: 'Зарегистрироваться'
  })
});

render('#app', authPage);
