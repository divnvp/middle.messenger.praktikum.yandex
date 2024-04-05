import './auth.scss';
import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
// import { AuthAPI } from '@/shared/api/auth-api';
import { AuthController } from '@/shared/controllers/auth.controller';
import authTemplate from '@/pages/auth/template';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { InputWithIconField } from '@/components/input-field-with-icon';
import { Link } from '@/components/link';
// import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import { Text } from '@/components/text';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

export class AuthPage extends Block {
  // private readonly authAPI = new AuthAPI();
  // private readonly router = new Router();
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
    console.log('onAuth');
    const data = e.target as HTMLFormElement;
    await this.authController.login(data);
    console.log('end of onAuth');

    // try {
    //   const signed = await this.authAPI.signIn(getFormProps(data) as unknown as IAuth);
    //
    //   if (signed) {
    //     const user = (await this.getUser()) as unknown as IUser | XMLHttpRequest;
    //     if (user instanceof XMLHttpRequest) {
    //       if (!(user.status >= 200 || user.status <= 300)) {
    //         return;
    //       }
    //     } else {
    //       this.router.go(Routes.Messenger);
    //     }
    //   }
    // } catch (e) {
    //   throw new Error(String(e));
    // }
  }
  //
  // private async getUser() {
  //   try {
  //     return await this.authAPI.request();
  //   } catch (e) {
  //     throw new Error(String(e));
  //   }
  // }

  override render() {
    return this.compile(authTemplate);
  }
}
