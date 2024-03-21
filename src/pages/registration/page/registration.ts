import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { RegistrationPage } from '@/pages/registration';
import { render } from '@/shared/utils/render';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

const registrationPage = new RegistrationPage('form', {
  events: {
    submit: onValidateSubmit
  },
  title: new Title('div', { attr: { class: 'page-title' }, title: 'Регистрация' }),
  fields: [
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'email',
      title: 'Почта',
      id: uuid(),
      type: 'email'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'login',
      title: 'Логин',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'first_name',
      title: 'Имя',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'second_name',
      title: 'Фамилия',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'phone',
      title: 'Телефон',
      id: uuid(),
      type: 'text'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
      name: 'password',
      title: 'Пароль',
      id: uuid(),
      type: 'password'
    }),
    new InputField('div', {
      events: {
        blur: { event: onValidate, querySelector: 'input' }
      },
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
