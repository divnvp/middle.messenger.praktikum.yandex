import AuthController from '@/shared/controllers/auth.controller';
import Block from '@/shared/utils/block';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { ProfileFields } from '@/components/profile-fields';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  menu: Menu;
  profileEdit: ProfileFields;
  links: Link;
}

export default class ProfileDataPage extends Block<IProps> {
  constructor() {
    super({
      menu: new Menu(),
      profileEdit: new ProfileFields(),
      links: new Link({
        text: 'Назад',
        onClick: () => {
          Router.go(Routes.Profile);
        }
      })
    });

    AuthController.init();
  }

  override render() {
    return this.compile(template, this.props);
  }
}
