import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import store, { StoreEvents } from '@/shared/storage/store';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import { getFormProps } from '@/shared/utils/form-props';
import { InputField } from '@/components/input-field';
import { IPassword } from '@/shared/models/password.interafce';
import { IUser } from '@/shared/models/user.interface';
import { Link } from '@/components/link';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import template from './template.hbs?raw';
import { TProp } from '@/shared/models/prop.type';
import UserController from '@/shared/controllers/user.controller';
import { UserPhoto } from '@/components/user-photo';
import { v4 as uuid } from 'uuid';

interface IProp extends TProp {
  user?: IUser;
  avatar?: UserPhoto;
  submit?: (e?: Event) => void;
  events: TProp;
}

export class ChangePasswordComponent extends Block<IProp> {
  constructor() {
    super({
      events: {
        submit: async (event?: Event) => {
          if (event) {
            event.preventDefault();
            const data = getFormProps(event.target as HTMLFormElement) as unknown as IPassword;

            if (onValidateSubmit(event)) {
              await UserController.changePassword(data);
            }
          }
        }
      },
      user: store.getState().user,
      avatar: new UserPhoto({
        update: false
      }),
      links: new Link({
        text: 'Назад',
        onClick: () => {
          Router.go(Routes.Profile);
        }
      })
    });

    store.on(StoreEvents.Updated, () => {
      this.setProps(store.getState() as unknown as Partial<IProp>);
    });
  }

  override init() {
    this.child['button'] = new Button({
      type: 'submit',
      text: 'Сохранить'
    });

    this.child['fields'] = [
      new InputField({
        name: 'oldPassword',
        title: 'Старый пароль',
        id: uuid(),
        type: 'password',
        onBlur: onValidate
      }),
      new InputField({
        name: 'newPassword',
        title: 'Новый пароль',
        id: uuid(),
        type: 'password',
        onBlur: onValidate
      }),
      new InputField({
        name: 'passwordAgain',
        title: 'Повторите пароль',
        id: uuid(),
        type: 'password',
        onBlur: onValidate
      })
    ];
  }

  override render() {
    return this.compile(template, this.props);
  }
}
