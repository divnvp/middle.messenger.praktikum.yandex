import { Block } from '@/shared/utils/block';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import profileTemplate from '@/pages/profile/template';
import { Routes } from '@/shared/const/routes';
import { v4 as uuid } from 'uuid';

export class ProfilePage extends Block {
  constructor() {
    super('div', {
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
          name: 'email',
          title: 'Почта',
          id: uuid(),
          type: 'text'
        }),
        new InputField('div', {
          name: 'login',
          title: 'Логин',
          id: uuid(),
          type: 'text'
        }),
        new InputField('div', {
          name: 'first_name',
          title: 'Имя',
          id: uuid(),
          type: 'text'
        }),
        new InputField('div', {
          name: 'second_name',
          title: 'Фамилия',
          id: uuid(),
          type: 'text'
        }),
        new InputField('div', {
          name: 'phone',
          title: 'Телефон',
          id: uuid(),
          type: 'text'
        })
      ],
      links: [
        new Link('div', { page: Routes.ChangeUserData, text: 'Изменить данные' }),
        new Link('div', { page: Routes.ChangePassword, text: 'Изменить пароль' }),
        new Link('div', { page: Routes.Messenger, text: 'Назад' })
      ]
    });
  }

  override render() {
    return this.compile(profileTemplate);
  }
}
