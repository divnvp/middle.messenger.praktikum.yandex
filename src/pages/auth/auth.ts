import './auth.scss';
import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { AuthController } from '@/shared/controllers/auth.controller';
import authTemplate from '@/pages/auth/template';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { InputWithIconField } from '@/components/input-field-with-icon';
import { Link } from '@/components/link';
import { Routes } from '@/shared/const/routes';
import { Text } from '@/components/text';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

export class AuthPage extends Block {
  private readonly authController = new AuthController();

  constructor() {
    super('form', {
      events: {
        submit: async (e: Event) => {
          if (onValidateSubmit(e)) {
            await this.onAuth(e);
          }
        }
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
        text: 'Войти'
      }),
      link: new Link('div', {
        page: Routes.Registration,
        text: 'Зарегистрироваться'
      })
    });

    this.onInit();
  }

  private onInit() {
    const user = this.authController.getUserFromStorage();
    if (user) {
      this.authController.logout();
    }
  }

  private async onAuth(e: Event) {
    const data = e.target as HTMLFormElement;
    await this.authController.login(data);
  }

  override render() {
    return this.compile(authTemplate);
  }
}
