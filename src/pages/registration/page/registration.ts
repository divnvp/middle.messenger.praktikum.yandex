import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { RegistrationPage } from '@/pages/registration';
import { render } from '@/shared/utils/render';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

const registrationPage = new RegistrationPage('div', {
  title: new Title('div', { attr: { class: 'page-title' }, title: 'Регистрация' }),
  fields: [
    new InputField('div', {
      name: 'email',
      title: 'Почта',
      id: uuid(),
      type: 'email'
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
    }),
    new InputField('div', {
      name: 'password',
      title: 'Пароль',
      id: uuid(),
      type: 'password'
    }),
    new InputField('div', {
      name: 'password_again',
      title: 'Пароль еще раз',
      id: uuid(),
      type: 'password'
    })
  ],
  button: new Button('div', { type: 'submit', text: 'Зарегистрироваться' }),
  link: new Link('a', {
    url: '/',
    text: 'Назад'
  })
});

render('#app', registrationPage);
