import { onValidate, onValidateSubmit } from '@/shared/utils/validators/validate';
import { Button } from '@/components/button';
import { InputField } from '@/components/input-field';
import { Link } from '@/components/link';
import { Menu } from '@/components/menu';
import { ProfileDataPage } from '@/pages/profile-data';
import { render } from '@/shared/utils/render';
import { v4 as uuid } from 'uuid';

const profilePage = new ProfileDataPage('form', {
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
  link: new Link('div', { url: '/', text: 'Назад' }),
  button: new Button('div', {
    attr: { class: 'profile-page__button' },
    type: 'submit',
    text: 'Сохранить'
  })
});

render('#app', profilePage);
