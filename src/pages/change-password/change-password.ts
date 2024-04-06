import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import changePasswordTemplate from '@/pages/change-password/template';
import { getFormProps } from '@/shared/utils/form-props';
import { InputField } from '@/components/input-field';
import { IPassword } from '@/shared/models/password.interafce';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { Routes } from '@/shared/const/routes';
import { UserController } from '@/shared/controllers/user.controller';
import { v4 as uuid } from 'uuid';

const userController = new UserController();

export class ChangePasswordPage extends Block {
  constructor() {
    super('form', {
      events: {
        submit: (e: Event) => {
          if (onValidateSubmit(e)) {
            const data = e.target as HTMLFormElement;
            console.log(getFormProps(data));
            userController.changePassword({
              newPassword: (getFormProps(data) as unknown as IPassword).newPassword,
              oldPassword: (getFormProps(data) as unknown as IPassword).oldPassword
            });
          }
        }
      },
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
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'oldPassword',
          title: 'Старый пароль',
          id: uuid(),
          type: 'password'
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'newPassword',
          title: 'Новый пароль',
          id: uuid(),
          type: 'password'
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'passwordAgain',
          title: 'Повторите пароль',
          id: uuid(),
          type: 'password'
        })
      ],
      link: new Link('div', { page: Routes.Settings, text: 'Назад' }),
      button: new Button('div', {
        attr: { class: 'profile-page__button' },
        type: 'submit',
        text: 'Сохранить'
      })
    });
  }

  override render() {
    return this.compile(changePasswordTemplate);
  }
}
