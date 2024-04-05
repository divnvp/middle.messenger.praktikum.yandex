import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import changePasswordTemplate from '@/pages/change-password/template';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { Routes } from '@/shared/const/routes';
import { v4 as uuid } from 'uuid';

export class ChangePasswordPage extends Block {
  constructor() {
    super('form', {
      events: {
        submit: onValidateSubmit
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
          name: 'old_password',
          title: 'Старый пароль',
          id: uuid(),
          type: 'password'
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'new_password',
          title: 'Новый пароль',
          id: uuid(),
          type: 'password'
        }),
        new InputField('div', {
          events: {
            blur: { event: onValidate, querySelector: 'input' }
          },
          name: 'password_again',
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
