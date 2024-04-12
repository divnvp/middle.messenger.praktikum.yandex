import { v4 as uuid } from 'uuid';

export const profileFields = [
  {
    name: 'email',
    title: 'Почта',
    id: uuid(),
    type: 'text'
  },
  {
    name: 'login',
    title: 'Логин',
    id: uuid(),
    type: 'text'
  },
  {
    name: 'first_name',
    title: 'Имя',
    id: uuid(),
    type: 'text'
  },
  {
    name: 'second_name',
    title: 'Фамилия',
    id: uuid(),
    type: 'text'
  },
  {
    name: 'phone',
    title: 'Телефон',
    id: uuid(),
    type: 'text'
  }
];
