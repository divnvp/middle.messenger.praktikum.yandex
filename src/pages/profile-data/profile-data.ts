import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { AuthController } from '@/shared/controllers/auth.controller';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { getFormProps } from '@/shared/utils/form-props';
import { InputField } from '@/components/input-field';
import { IUser } from '@/shared/models/user.interface';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import profileDataTemplate from '@/pages/profile-data/template';
import { Routes } from '@/shared/const/routes';
import { UserController } from '@/shared/controllers/user.controller';
import { v4 as uuid } from 'uuid';

const authController = new AuthController();
const userController = new UserController();
await authController.init();

export class ProfileDataPage extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'profile-page'
      },
      events: {
        submit: (e: Event) => {
          if (onValidateSubmit(e)) {
            const data = e.target as HTMLFormElement;
            userController.updateData(getFormProps(data) as unknown as IUser);
          }
        }
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
          name: 'email',
          title: 'Почта',
          id: uuid(),
          type: 'text',
          value: authController.getUserFromStorage()?.email
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'login',
          title: 'Логин',
          id: uuid(),
          type: 'text',
          value: authController.getUserFromStorage()?.login
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'first_name',
          title: 'Имя',
          id: uuid(),
          type: 'text',
          value: authController.getUserFromStorage()?.first_name
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'second_name',
          title: 'Фамилия',
          id: uuid(),
          type: 'text',
          value: authController.getUserFromStorage()?.second_name
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'phone',
          title: 'Телефон',
          id: uuid(),
          type: 'text',
          value: authController.getUserFromStorage()?.phone
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
    return this.compile(profileDataTemplate);
  }
}
