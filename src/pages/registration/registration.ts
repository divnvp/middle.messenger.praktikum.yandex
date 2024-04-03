import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

import { Block } from '@/shared/utils/block';
import registrationTemplate from '@/pages/registration/template';

export class RegistrationPage extends Block {
  constructor() {
    super('form', {
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
      button: new Button('div', { type: 'submit', text: 'Зарегистрироваться', page: '' }),
      link: new Link('div', {
        page: '/',
        text: 'Назад'
      })
    });
  }

  override render() {
    return this.compile(registrationTemplate);
  }
}