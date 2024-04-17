import AuthController from '../../shared/controllers/auth.controller';
import Block from '../../shared/utils/block';
import { ChangePasswordComponent } from '../../components/change-password';
import { Menu } from '../../components/menu';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';

interface IProps extends TProp {
  menu: Menu;
  changePassword: ChangePasswordComponent;
}

export default class ChangePasswordPage extends Block<IProps> {
  constructor() {
    super({
      menu: new Menu(),
      changePassword: new ChangePasswordComponent()
    });

    AuthController.start();
  }

  override render() {
    return this.compile(template, this.props);
  }
}
