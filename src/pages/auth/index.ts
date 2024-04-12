import './auth.scss';
import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import AuthController from '@/shared/controllers/auth.controller';
import Block from '@/shared/utils/block';
import { Button } from '@/components/button';
import { getFormProps } from '@/shared/utils/form-props';
import { IAuth } from '@/shared/models/auth.interface';
import { InputWithIconField } from '@/components/input-field-with-icon';
import { Link } from '@/components/link';
import Router from '@/shared/router/router';
import { Routes } from '@/shared/const/routes';
import template from './template.hbs?raw';
import { Text } from '@/components/text';
import { Title } from '@/components/title';
import { TProp } from '@/shared/models/prop.type';
import { v4 as uuid } from 'uuid';

interface IProps extends TProp {
  title: Title;
  text: Text;
  button: Button;
  link?: Link;
  inputs?: InputWithIconField[];
  events: IEvents | Record<string, () => void>;
}

interface IEvents {
  submit: (e: Event) => void;
  back: () => void;
  blur: (e?: Event) => void;
}

export class AuthPage extends Block<IProps> {
  constructor() {
    super({
      events: {
        submit: (event?: Event) => {
          if (event) {
            const data = getFormProps(event.target as HTMLFormElement) as unknown as IAuth;

            if (onValidateSubmit(event)) {
              AuthController.auth(data);
              AuthController.getUser();
            }
          }
        },
        back: () => {
          Router.go(Routes.Registration);
        },
        blur: (e?: Event) => {
          if (e) {
            onValidate(e);
          }
        }
      },
      title: new Title({
        title: 'Добро пожаловать!'
      }),
      text: new Text({
        text: 'Пожалуйста, введите ваши данные'
      }),
      button: new Button({
        type: 'submit',
        text: 'Войти'
      })
    });

    AuthController.logout();
  }

  override init() {
    this.child['link'] = new Link({
      text: 'Зарегистрироваться',
      onClick: this.props.events['back']
    });
    this.child['fields'] = [
      new InputWithIconField({
        name: 'login',
        title: 'Логин',
        id: uuid(),
        type: 'text',
        icon: '../../icons/mail-icon.png',
        onBlur: this.props.events['blur']
      }),
      new InputWithIconField({
        name: 'password',
        title: 'Пароль',
        id: uuid(),
        type: 'password',
        icon: '../../icons/eye-icon.png',
        onBlur: this.props.events['blur']
      })
    ];
  }

  override render() {
    return this.compile(template, this.props);
  }
}
