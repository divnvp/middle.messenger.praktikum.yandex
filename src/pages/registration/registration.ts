import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { AuthAPI } from '@/shared/api/auth-api';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { getFormProps } from '@/shared/utils/form-props';
import { InputField } from '@/components/input-field';
import { IUser } from '@/shared/models/user.interface';
import { Link } from '@/components/link';
import registrationTemplate from '@/pages/registration/template';
// import Router from '@/shared/router/router';
import { Title } from '@/components/title';
import { v4 as uuid } from 'uuid';

export class RegistrationPage extends Block {
  private readonly authAPI = new AuthAPI();
  // private readonly router = new Router();

  constructor() {
    super('form', {
      events: {
        submit: async (e: Event) => {
          console.log(onValidateSubmit(e));
          if (onValidateSubmit(e)) {
            await this.onRegistration(e);
          }
        }
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

  private async onRegistration(e: Event) {
    const data = e.target as HTMLFormElement;

    try {
      const registered = await this.authAPI.create(getFormProps(data) as unknown as IUser);

      console.log(!(registered.status >= 200 || registered.status <= 300));
      if (!(registered.status >= 200 || registered.status <= 300)) {
        return;
      }
      // else {
      //   this.router.go(Routes.Auth);
      // }
    } catch (e) {
      throw new Error(String(e));
    }
  }

  override render() {
    return this.compile(registrationTemplate);
  }
}
