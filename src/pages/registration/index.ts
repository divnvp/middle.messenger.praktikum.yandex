import './registration.scss';
import { onValidate, onValidateSubmit } from '../../shared/utils/validators/validate';
import AuthController from '../../shared/controllers/auth.controller';
import Block from '../../shared/utils/block';
import { Button } from '../../components/button';
import { EventOrRecord } from '../../shared/models/types';
import { getFormProps } from '../../shared/utils/form-props';
import { InputField } from '../../components/input-field';
import { IUser } from '../../shared/models/user.interface';
import { Link } from '../../components/link';
import Router from '../../shared/router/router';
import { Routes } from '../../shared/const/routes';
import template from './template.hbs?raw';
import { Title } from '../../components/title';
import { TProp } from '../../shared/models/prop.type';
import { v4 as uuid } from 'uuid';

interface IProp extends TProp {
  title: Title;
  button: Button;
  link?: Link;
  fields?: InputField[];
  events: EventOrRecord<IEvents>;
}

interface IEvents {
  submit: (e: Event) => void;
  back: () => void;
  blur: (e?: Event) => void;
}

const fields = [
  {
    name: 'email',
    title: 'Почта',
    type: 'email'
  },
  {
    name: 'login',
    title: 'Логин',
    type: 'text'
  },
  {
    name: 'first_name',
    title: 'Имя',
    type: 'text'
  },
  {
    name: 'second_name',
    title: 'Фамилия',
    type: 'text'
  },
  {
    name: 'phone',
    title: 'Телефон',
    type: 'text'
  },
  {
    name: 'password',
    title: 'Пароль',
    type: 'password'
  },
  {
    name: 'passwordAgain',
    title: 'Пароль еще раз',
    type: 'password'
  }
];

export class RegistrationPage extends Block<IProp> {
  constructor() {
    super({
      events: {
        submit: (event: Event) => {
          if (event) {
            const data = getFormProps(event.target as HTMLFormElement) as unknown as IUser;

            if (onValidateSubmit(event)) {
              AuthController.register(data);
            }
          }
        },
        back: () => {
          Router.go(Routes.Auth);
        },
        blur: (e?: Event) => {
          if (e) {
            onValidate(e);
          }
        }
      },
      title: new Title({
        title: 'Регистрация'
      }),
      button: new Button({
        className: 'fluid',
        type: 'submit',
        text: 'Зарегистрироваться'
      })
    });
  }

  override init() {
    this.child['link'] = new Link({
      text: 'Назад',
      onClick: this.props.events.back
    });
    this.child['fields'] = fields.map(
      value => new InputField({ ...value, id: uuid(), onBlur: this.props.events.blur })
    );
  }

  override render() {
    return this.compile(template, this.props);
  }
}
