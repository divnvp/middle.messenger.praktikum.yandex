import Block from '@/shared/utils/block';
import { Menu } from '@/components/menu';
import Profile from '@/components/profile';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';

interface IProps extends TProp {
  menu: Menu;
  profile: Profile;
}

export default class ProfilePage extends Block<IProps> {
  constructor() {
    super({
      menu: new Menu(),
      profile: new Profile()
    });
  }

  override render() {
    return this.compile(template, this.props);
  }
}
