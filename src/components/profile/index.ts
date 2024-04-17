import store, { StoreEvents } from '../../shared/storage/store';
import AuthController from '../../shared/controllers/auth.controller';
import Block from '../../shared/utils/block';
import { InputField } from '../input-field';
import { IState } from '../../shared/models/state.interface';
import { IUser } from '../../shared/models/user.interface';
import { Link } from '../link';
import { profileFields } from '../../shared/const/page-data';
import Router from '../../shared/router/router';
import { Routes } from '../../shared/const/routes';
import { setValuesFields } from '../../shared/utils/set-values-fields';
import template from './template.hbs?raw';
import { TProp } from '../../shared/models/prop.type';
import { UserPhoto } from '../user-photo';

interface IProp extends TProp, Partial<IState> {
  events?: IEvents;
  user: IUser;
  avatar: UserPhoto;
}

interface IEvents {
  back: () => void;
  onData: () => void;
  onPassword: () => void;
}

export default class Profile extends Block<IProp> {
  constructor() {
    super({
      user: store.getState().user,
      avatar: new UserPhoto({
        update: false
      }),
      links: [
        new Link({
          text: 'Изменить данные',
          onClick: () => {
            Router.go(Routes.ChangeProfileData);
          }
        }),
        new Link({
          text: 'Изменить пароль',
          onClick: () => {
            Router.go(Routes.ChangePassword);
          }
        }),
        new Link({
          text: 'Выйти',
          onClick: () => {
            AuthController.logout();
            Router.go(Routes.Auth);
          }
        })
      ]
    });

    AuthController.getUser();

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as Partial<IProp>);
    });
  }

  override init() {
    this.child['fields'] = profileFields.map(
      values =>
        new InputField({
          ...values,
          value: (this.props as unknown as { user: { name: string } }).user.name ?? ''
        })
    );
  }

  protected override componentDidUpdate(oldProps: IProp, newProps: IProp): boolean {
    setValuesFields(this.child, oldProps, newProps);

    return true;
  }

  override render() {
    return this.compile(template, this.props);
  }
}
