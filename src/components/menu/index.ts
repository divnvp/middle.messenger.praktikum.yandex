import './menu.scss';
import Block from '@/shared/utils/block';
import { MenuButton } from '@/components/menu-item';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';
import { UserPhoto } from '@/components/user-photo';

interface IProps extends TProp {
  userPhoto: UserPhoto;
  items: MenuButton[];
}

export class Menu extends Block<IProps> {
  constructor() {
    super({
      userPhoto: new UserPhoto({
        update: false
      }),
      items: [
        new MenuButton({
          name: 'Меню',
          icon: '../../icons/menu-icon.png'
        }),
        new MenuButton({
          name: 'Все',
          icon: '../../icons/chat-icon.png',
          onClick: (e: Event) => {
            if (e) {
              Router.go(Routes.ChatPanel);
            }
          }
        }),
        new MenuButton({
          name: 'Профиль',
          icon: '../../icons/profile-icon.png',
          onClick: (e: Event) => {
            if (e) {
              Router.go(Routes.Profile);
            }
          }
        })
      ]
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
