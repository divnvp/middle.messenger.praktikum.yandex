import './auth.scss';
import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import authTemplate from '@/pages/auth/template';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { InputWithIconField } from '@/components/input-field-with-icon';
import { Link } from '@/components/link';
import { Text } from '@/components/text';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

export class AuthPage extends Block {
  constructor() {
    super('form', {
      events: {
        submit: onValidateSubmit
      },
      title: new Title('div', { attr: { class: 'page-title' }, title: 'Добро пожаловать!' }),
      text: new Text('div', { text: 'Пожалуйста, введите ваши данные' }),
      fields: [
        new InputWithIconField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'login',
          title: 'Логин',
          id: uuid(),
          type: 'text',
          icon: '../../icons/mail-icon.png'
        }),
        new InputWithIconField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'password',
          title: 'Пароль',
          id: uuid(),
          type: 'password',
          icon: '../../icons/eye-icon.png'
        })
      ],
      button: new Button('div', {
        type: 'submit',
        text: 'Войти',
        page: '/messenger'
      }),
      link: new Link('div', {
        page: '/sign-up',
        text: 'Зарегистрироваться'
      })
    });
  }

  override render() {
    return this.compile(authTemplate);
  }
}