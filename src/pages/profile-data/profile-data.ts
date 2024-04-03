import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Block } from '@/shared/utils/block';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import profileDataTemplate from '@/pages/profile-data/template';
import { v4 as uuid } from 'uuid';

export class ProfileDataPage extends Block {
  constructor() {
    super('form', {
      attr: {
        class: 'profile-page'
      },
      events: {
        submit: onValidateSubmit
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
          type: 'text'
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
        })
      ],
      link: new Link('div', { page: '/messenger', text: 'Назад' }),
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
